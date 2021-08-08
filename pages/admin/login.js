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
import { loginSchema } from "../../services/schemas";
import formEmpty from "../../services/form-empty";
import axios from "axios";
import { CODE_STATUS } from "../../services/code-status";
import presentAlert from "../../services/custom-alert";
import { useRouter } from 'next/router'

export default class AdminLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.spinner = false;
        this.onLogin = this.onLogin.bind(this);
        this.onIndicarPreenchimentoCorreto = this.onIndicarPreenchimentoCorreto.bind(this);
        this.onManipularMudanca = this.onManipularMudanca.bind(this);
    }

    onManipularMudanca(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onIndicarPreenchimentoCorreto(error) {
        if (formEmpty(this.state)) {
            presentAlert('Formulário não preenchido','Digite email e senha.');
        }
        else if (error.path == "email") {
            presentAlert('Email inválido','Ex.: fulano@email.com.');
        }
        else if (error.path == "password") {
            presentAlert('Senha inválida','A senha deve possuir entre 8 e 32 caracteres.');
        }
    }

    onLogin() {
        loginSchema.validate(this.state).then(() => {
            this.setState({ spinner: true });
            let body = {
                email: this.state.email,
                password: this.state.password
            };
            axios.post("/api/v1/admin/login", body).then((res) => {
                this.setState({ spinner: false });
                let response = res.data;
                switch (response.codeStatus) {
                    case CODE_STATUS.ADMIN.LOGIN_SUCCESS:
                        open("../home");
                        break;
                    case CODE_STATUS.ADMIN.LOGIN_USER_NOT_EXISTS:
                        presentAlert('Usuário não existe', 'Verifique o preenchimento do formulário.');
                        break;
                    case CODE_STATUS.ADMIN.LOGIN_INVALID_CREDENTIALS:
                        presentAlert('Credenciais inválidas', 'Verifique o preenchimento do formulário.');
                        break;
                    default:
                        presentAlert('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
                }
            }).catch(() => {
                presentAlert('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
            });
        }).catch((error) => {
            this.onIndicarPreenchimentoCorreto(error);
        });
    }

    render() {
        return (
            <div className="container-fluid row d-flex justify-content-center center">
                <Card className="row col-sm-6 p-3">
                    <CardTitle className="h3 text-center">Login</CardTitle>
                    <CardBody>
                        <FormGroup className="mt-3">
                            <Label>Email:</Label>
                            <Input onChange={this.onManipularMudanca} value={this.state.email} type="email" name="email" />
                        </FormGroup>
                        <FormGroup className="mt-3">
                            <Label>Senha:</Label>
                            <Input onChange={this.onManipularMudanca} value={this.state.password} type="password" name="password" />
                        </FormGroup>
                        <Button disabled={this.spinner} onClick={this.onLogin} className="mt-3 col-12" color="danger">
                            {this.spinner ? <div className="spinner-border text-light"></div> : <label>Fazer login</label>}
                        </Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
