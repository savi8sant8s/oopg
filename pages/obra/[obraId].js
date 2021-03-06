import { Component } from "react";
import {
  Container,
  Card,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  ButtonGroup,
  Button,
  FormControl
} from "react-bootstrap";
import { GoogleLogin } from 'react-google-login';
import axios from "axios";
import moment from 'moment';
import { schema } from "../../services/schemas";
import { STATUS } from "../../services/codigo-status";
import { mostraCarregamento, mostrarAlerta } from "../../services/alerta-padrao";
import { formVazio } from "../../services/form-vazio";
import Swal from "sweetalert2";

class LoginGoogle extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

        return (
            <div>
                <GoogleLogin
                    clientId={CLIENT_ID}
                    buttonText={this.props.text}
                    onSuccess={this.props.onHandle}
                    cookiePolicy={'single_host_origin'}
                    disabled={this.props.disabled}
                />
            </div>
        )
    }
}
  
class Interacao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: "",
            mensagem: "",
            nota: ""
        };
        this.onVotar = this.onVotar.bind(this);
        this.onComentar = this.onComentar.bind(this);
        this.manipularMudanca = this.manipularMudanca.bind(this);
    }

    manipularMudanca(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onIndicarPreenchimentoCorretoNota(erro, corpo) {
        if (formVazio(corpo)) {
            mostrarAlerta('Formulário não preenchido','Selecione uma nota.');
        }
        else if (erro.path == "email") {
            mostrarAlerta('Email inválido','Ex.: fulano@email.com.');
        }
        else if (erro.path == "nota") {
            mostrarAlerta('Nota inválida','Selecione uma da opções.');
        }
    }

    onIndicarPreenchimentoCorretoComentario(erro, corpo) {
        if (formVazio(corpo)) {
            mostrarAlerta('Formulário não preenchido','Digite título e mensagem.');
        }
        else if (erro.path == "titulo") {
            mostrarAlerta('Título inválido','O título deve possuir entre 5 e 20 caracteres.');
        }
        else if (erro.path == "mensagem") {
            mostrarAlerta('Mensagem inválida','A mensagem deve possuir entre 5 e 50 caracteres.');
        }
        else if (erro.path == "email") {
            mostrarAlerta('Email inválido','Ex.: fulano@email.com.');
        }
        else if (erro.path == "nomeUsuario") {
            mostrarAlerta('Nome de usuário inválido','O nome de usuário deve possuir entre 5 e 50 caracteres.');
        }
        else if (erro.path == "imagemUrl") {
            mostrarAlerta('URL da imagem do usuario inválida','A URL da imagem deve possuir entre 80 e 100 caracteres.');
        }
    }

    onVotar(resposta) {
        let corpo = {
            nota: this.state.nota,
            email: resposta.profileObj.email
        };
        let headers = { 
            headers: {Authorization: `Bearer ${resposta.tokenId}`}
        };
        schema.nota.validate(corpo).then(() => {
            axios.put(`/api/v1/public/nota/${this.props.obraId}`, corpo, headers).then((res) => {
                let resposta = res.data;
                switch (resposta.status) {
                    case STATUS.NOTA.CRIADA_SUCESSO:
                        mostrarAlerta("Obrigado por votar", "Nota criada com sucesso.");
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                        break;
                    case STATUS.SESSAO.TOKEN_INVALIDO:
                        mostrarAlerta('Credenciais Google inválidas', 'Tente votar novamente.');
                        break;
                    case STATUS.NOTA.ATUALIZADA_SUCESSO:
                        mostrarAlerta('Obrigado por atualizar sua nota', 'Nota atualizada com sucesso.');
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
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
            this.onIndicarPreenchimentoCorretoNota(erro, corpo);
        });
    }

    onComentar(resposta) {
        let corpo = {
            titulo: this.state.titulo,
            mensagem: this.state.mensagem,
            nomeUsuario: resposta.profileObj.name,
            imagemUrl: resposta.profileObj.imageUrl,
            email: resposta.profileObj.email
        };
        let headers = { 
            headers: {Authorization: `Bearer ${resposta.tokenId}`}
        };
        schema.comentario.validate(corpo).then(() => {
            axios.post(`/api/v1/public/comentario/${this.props.obraId}`, corpo, headers).then((res) => {
                let resposta = res.data;
                switch (resposta.status) {
                    case STATUS.COMENTARIO.CRIADO_SUCESSO:
                        mostrarAlerta("Obrigado por comentar", "Comentário criado com sucesso.");
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                        break;
                    case STATUS.SESSAO.TOKEN_INVALIDO:
                        mostrarAlerta('Credenciais Google inválidas', 'Tente comentar novamente.');
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
            this.onIndicarPreenchimentoCorretoComentario(erro, corpo);
        });
    }

    render() {
        return (
            <div className="mt-3">
                <h3>
                    <span className="badge bg-danger">Comentário</span>
                </h3>
                <Card className="p-3">
                    <div className="text-center">
                        <h5>O que você achou?</h5>
                        <InputGroup>
                        <InputGroup.Text>Nota:</InputGroup.Text>
                            <FormControl as="select" onChange={this.manipularMudanca} value={this.state.nota} name="nota">
                                <option value={0}>Selecione:</option>
                                <option value={1}>👍</option>
                                <option value={2}>😐</option>
                                <option value={3}>👎</option>
                            </FormControl>
                            <div className="input-group-append">
                                <LoginGoogle disabled={this.state.nota == ""} onHandle={this.onVotar} text="Votar" />
                            </div>
                        </InputGroup>
                    </div>
                    <p className="text-center mt-2">ou</p>
                    <InputGroup>
                        <InputGroup.Text>Título:</InputGroup.Text>
                        <FormControl type="text" name="titulo" value={this.state.titulo} onChange={this.manipularMudanca} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Mensagem:</InputGroup.Text>
                        <FormControl type="text" name="mensagem" value={this.state.mensagem} onChange={this.manipularMudanca} />
                    </InputGroup>
                    <div className="mt-3 container row col text-center">
                        <LoginGoogle text="Comentar" disabled={this.state.titulo == "" && this.state.mensagem == ""} onHandle={this.onComentar} />
                    </div>
                </Card>
            </div>
        )
    }
}

class Comentarios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comentarios: {
                itens: [],
                quant: 0
              }
        }
        this.onPegarComentarios = this.onPegarComentarios.bind(this);
    }

    componentDidMount(){
        this.onPegarComentarios();
    }

    async onPegarComentarios() {
        mostraCarregamento();
        let { data } = await axios.get(`/api/v1/public/comentarios/${this.props.obraId}`);
        let comentarios = {
            itens: data.comentarios,
            quant: data.quantComentarios
        }
        Swal.close();
        this.setState({ comentarios: comentarios });
    }

    render() {
        return (
            <div className="mt-3">
                <h3>
                    <span className="badge bg-danger">Total de comentários: {this.state.comentarios.quant}</span>
                </h3>
                <ListGroup>
                    {this.state.comentarios.itens.map((comentario, x) =>
                        <ListGroupItem key={x}>
                            <Row>
                                <Col xs="4">
                                    <img className="rounded-circle" style={{ width: "70px" }} src={comentario.imagemUrl} />
                                    <br></br><label>{comentario.nomeUsuario}</label>
                                </Col>
                                <Col xs="8">
                                    <h5>{comentario.titulo}</h5>
                                    <p>{comentario.mensagem}</p>
                                    <p className="text-right">Data: {moment(comentario.dataCriacao).format("LL")}</p>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    )}
                </ListGroup>
            </div>
        )
    }
}

class Informacoes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obra: {
                aditivoPrazoAditado: "",
                aditivoValorAditado: "",
                categoria: "",
                contratadoCpfCnpj: "",
                contratadoRazaoSocial: "",
                contratoDataConclusao: "",
                contratoDataInicio: "",
                contratoNumeroAno: "",
                contratoPrazo: "",
                contratoValorContratado: "",
                convenioConcedente: "",
                convenioContrapartida: "",
                convenioNumeroAno: "",
                convenioRepasse: "",
                dataAtualizacao: "",
                dataCriacao: "",
                descricao: "",
                execucaoNaturezaDespesa: "",
                execucaoReajuste: "",
                execucaoValorMedidoAcumulado: "",
                execucaoValorPagoAcumuladoExercicio: "",
                execucaoValorPagoAcumuladoPeriodo: "",
                id: "",
                numeroLicitacao: "",
                situacao: "",
                valorPagoAcumulado: ""
            }
        };
        this.onPegarInformacoes = this.onPegarInformacoes.bind(this);
    }

    componentDidMount(){
        this.onPegarInformacoes();
    }

    async onPegarInformacoes() {
        mostraCarregamento();
        let { data } = await axios.get(`/api/v1/public/obra/${this.props.obraId}`);
        Swal.close();
        this.setState({ obra: data.obra });
    }

    render() {
        return (
            <>
                <h3 className="text-center">Obra {this.state.obra.numeroLicitacao}</h3>
                <Card className="mt-5 p-3">
                    <Row>
                        <h4 className="text-center"><strong><u>Informações gerais</u></strong></h4>
                        <Col>
                            <p><strong>Categoria:</strong> {this.state.obra.categoria}</p>
                            <p><strong>Descrição:</strong> {this.state.obra.descricao}</p>
                        </Col>
                        <Col>
                            <p><strong>Situação:</strong> {this.state.obra.situacao}</p>
                            <p><strong>Valor pago acumulado:</strong> {this.state.obra.valorPagoAcumulado?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                        </Col>
                    </Row>
                    <Row>
                        <h4 className="text-center"><strong>Contratado</strong></h4>
                        <Col>
                            <p><strong>CPF/CNPJ:</strong> {this.state.obra.contratadoCpfCnpj}</p>
                        </Col>
                        <Col>
                            <p><strong>Razão social:</strong> {this.state.obra.contratadoRazaoSocial}</p>
                        </Col>
                    </Row>
                    <Row>
                        <h4 className="text-center"><strong>Contrato</strong></h4>
                        <Col>
                            <p><strong>Prazo para conclusão:</strong> {moment(this.state.obra.contratoPrazo).format('LL')}</p>
                            <p><strong>Data de início:</strong> {moment(this.state.obra.contratoDataInicio).format('LL')}</p>
                            <p><strong>Data de conclusão:</strong> {moment(this.state.obra.contratoDataConclusao).format('LL')}</p>
                        </Col>
                        <Col>
                            <p><strong>Número do ano:</strong> {this.state.obra.contratoNumeroAno}</p>
                            <p><strong>Valor contratado:</strong> {this.state.obra.contratoValorContratado.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                        </Col>
                    </Row>
                    <Row>
                        <h4 className="text-center"><strong>Execução</strong></h4>
                        <Col>
                            <p><strong>Natureza da despesa:</strong> {this.state.obra.execucaoNaturezaDespesa}</p>
                            <p><strong>Reajuste:</strong> {this.state.obra.execucaoReajuste?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                        </Col>
                        <Col>
                            <p><strong>Valor medido acumulado:</strong> {this.state.obra.execucaoValorMedidoAcumulado?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                            <p><strong>Valor pago acumulado no exercício:</strong> {this.state.obra.execucaoValorPagoAcumuladoExercicio?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                            <p><strong>Valor pago acumulado no período:</strong> {this.state.obra.execucaoValorPagoAcumuladoPeriodo?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                        </Col>
                    </Row>
                    <Row>
                        <h4 className="text-center"><strong>Convênio</strong></h4>
                        <Col>
                            <p><strong>Concedente:</strong> {this.state.obra.convenioConcedente}</p>
                            <p><strong>Número do ano:</strong> {this.state.obra.convenioNumeroAno}</p>
                        </Col>
                        <Col>
                            <p><strong>Contrapartida:</strong> {this.state.obra.convenioContrapartida?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                            <p><strong>Repasse:</strong> {this.state.obra.convenioRepasse?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                        </Col>
                    </Row>
                    <Row>
                        <h4 className="text-center"><strong>Aditivo</strong></h4>
                        <Col>
                            <p><strong>Prazo aditado:</strong> {this.state.obra.aditivoPrazoAditado}</p>
                        </Col>
                        <Col>
                            <p><strong>Valor aditado:</strong> {this.state.obra.aditivoValorAditado}</p>
                        </Col>
                    </Row>
                </Card>
            </>
        )
    }
}

class Notas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notas: {
                gostou: null,
                indiferente: null,
                naogostou: null
            }
        }
        this.onPegarNotas = this.onPegarNotas.bind(this);
    }

    componentDidMount(){
        this.onPegarNotas();
    }

    async onPegarNotas() {
        mostraCarregamento();
        let { data } = await axios.get(`/api/v1/public/notas/${this.props.obraId}`);
        Swal.close();
        let notas = {
            gostou: data.gostou,
            indiferente: data.indiferente,
            naogostou: data.naogostou
        }
        this.setState({ notas: notas });
    }

    render() {
        return (
            <div class="d-flex justify-content-center row">
                <ButtonGroup size="lg" className="mt-3 col-sm-6">
                    <Button className="bg-light text-dark border-danger">👍 {this.state.notas.gostou}</Button>
                    <Button className="bg-light text-dark border-danger">😐 {this.state.notas.indiferente}</Button>
                    <Button className="bg-light text-dark border-danger">👎 {this.state.notas.naogostou}</Button>
                </ButtonGroup>
            </div>
        )
    }
}

export default class Obra extends Component {

    static getInitialProps({ query }) {
        return { query }
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid="sm" className="p-5">
                <Informacoes obraId={this.props.query.obraId} />
                <Notas obraId={this.props.query.obraId} />
                <Interacao obraId={this.props.query.obraId} />
                <Comentarios obraId={this.props.query.obraId} />
            </Container>
        )
    }
}