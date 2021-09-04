import { Component } from "react";
import {
    Card,
    Container,
    Button,
    InputGroup,
    FormControl,
    FormGroup
} from 'react-bootstrap';
import axios from "axios";
import { formVazio } from "../../services/form-vazio";
import { mostraCarregamento, mostrarAlerta } from "../../services/alerta-padrao";
import { STATUS } from "../../services/codigo-status";
import { schema } from "../../services/schemas";
import Swal from "sweetalert2";

export default class AdminLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            senha: ""
        };
        this.onLogin = this.onLogin.bind(this);
        this.onIndicarPreenchimentoCorreto = this.onIndicarPreenchimentoCorreto.bind(this);
        this.onManipularMudanca = this.onManipularMudanca.bind(this);
    }

    onManipularMudanca(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onIndicarPreenchimentoCorreto(erro, corpo) {
        if (formVazio(corpo)) {
            mostrarAlerta('Formulário não preenchido', 'Digite email e senha.');
        }
        else if (erro.path == "email") {
            mostrarAlerta('Email inválido', 'Ex.: fulano@email.com.');
        }
        else if (erro.path == "senha") {
            mostrarAlerta('Senha inválida', 'A senha deve possuir entre 8 e 32 caracteres.');
        }
    }

    onLogin() {
        schema.login.validate(this.state).then(() => {
            mostraCarregamento();
            axios.post("/api/v1/private/login", this.state).then((res) => {
                Swal.close();
                let resposta = res.data;
                switch (resposta.status) {
                    case STATUS.ADMIN.LOGIN_SUCESSO:
                        sessionStorage.setItem("oopgV1Token", resposta.token);
                        window.location.href = "/admin/home";
                        break;
                    case STATUS.ADMIN.LOGIN_PRIMEIRO_ACESSO:
                        mostrarAlerta('Primeiro acesso', 'Defina uma nova senha por questçoes de segurança.');
                        break;
                    case STATUS.ADMIN.LOGIN_CREDENCIAIS_INVALIDAS:
                        mostrarAlerta('Credenciais inválidas', 'Verifique o preenchimento do formulário.');
                        break;
                    case STATUS.CORPO.CAMPOS_INCORRETOS:
                        mostrarAlerta('Campos incorretos', 'Verifique o preenchimento do formulário.');
                        break;
                    default:
                        mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
                }
            }).catch(() => {
                mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
            });
        }).catch((erro) => {
            this.onIndicarPreenchimentoCorreto(erro, this.state);
        });
    }

    render() {
        return (
            <Container fluid="sm" className="text-center p-5 d-flex justify-content-center">
                <Card className="mt-5 p-3 row col-sm-6">
                    <h3 className="text-center"><u>Login</u></h3>
                    <FormGroup>
                        <InputGroup className="mb-3">
                            <FormControl placeholder="Email" onChange={this.onManipularMudanca} value={this.state.email} type="email" name="email" />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <FormControl placeholder="Senha" onChange={this.onManipularMudanca} value={this.state.senha} type="password" name="senha" />
                        </InputGroup>
                        <Button disabled={this.state.spinner} onClick={this.onLogin} className="mb-3 row col-sm-12 bg-danger border-light">
                            {this.state.spinner ? <div className="spinner-border text-light"></div> : <label>Fazer login</label>}
                        </Button>
                    </FormGroup>
                </Card>
            </Container>
        )
    }
}
