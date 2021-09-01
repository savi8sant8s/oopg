import { Component } from "react";
import {
    Card,
    CardTitle,
    CardBody,
    Button,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import axios from "axios";
import { formVazio } from "../../services/form-vazio";
import { mostrarAlerta } from "../../services/alerta-padrao";
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
            mostrarAlerta('Formulário não preenchido','Digite email e senha.');
        }
        else if (erro.path == "email") {
            mostrarAlerta('Email inválido','Ex.: fulano@email.com.');
        }
        else if (erro.path == "senha") {
            mostrarAlerta('Senha inválida','A senha deve possuir entre 8 e 32 caracteres.');
        }
    }

    onLogin() {
        schema.login.validate(this.state).then(() => {
            Swal.showLoading();
            axios.post("/api/v1/private/login", this.state).then((res) => {
                Swal.hideLoading();
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
            <div className="container-fluid row d-flex justify-content-center">
                <Card className="row col-sm-6 p-3" style={{marginTop: "10rem"}}>
                    <CardTitle className="h3 text-center">Login</CardTitle>
                    <CardBody>
                        <FormGroup className="mt-3">
                            <Label>Email:</Label>
                            <Input onChange={this.onManipularMudanca} value={this.state.email} type="email" name="email" />
                        </FormGroup>
                        <FormGroup className="mt-3">
                            <Label>Senha:</Label>
                            <Input onChange={this.onManipularMudanca} value={this.state.senha} type="password" name="senha" />
                        </FormGroup>
                        <Button disabled={this.state.spinner} onClick={this.onLogin} className="mt-3 col-12" color="danger">
                            {this.state.spinner ? <div className="spinner-border text-light"></div> : <label>Fazer login</label>}
                        </Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
