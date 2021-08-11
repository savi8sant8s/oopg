import { Component } from "react";
import {
  Card,
  FormGroup,
  Label,
  Input,
  CardBody,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  CardHeader
} from "reactstrap";
import { GoogleLogin } from 'react-google-login';
import axios from "axios";
import moment from "moment";
import { withRouter } from "next/router";

const styles = {
  obraInfoBox: {
    border: "solid 2px",
    borderRadius: "2px",
    margin: "2px 2px 2px 2px",
    borderColor: "gray"
  }
}

function LoginGoogle(props) {
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

  return (
    <div>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText={props.text}
        onSuccess={props.onHandle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        disabled={props.disabled}
      />
    </div>
  )
}

class NotaOuComentario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {
        title: "",
        msg: "",
        username: "",
        imageUrl: "",
        email: ""
      },
      note: {
        email: "",
        vote: 0
      }
    };
    this.onNewComment = this.onNewComment.bind(this);
    this.onNewVote = this.onNewVote.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onNewVote() {

  }

  onNewComment() {

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
            <div className="input-group">
              <select onChange={this.handleChange} value={this.state.note.vote} name="note" className="form-control custom-select">
                <option value={0}>Selecione:</option>
                <option value={1}>👍</option>
                <option value={2}>😐</option>
                <option value={3}>👎</option>
              </select>
              <div className="input-group-append">
                <LoginGoogle disabled={this.state.note.vote == 0} onHandle={this.onNewVote} text="Votar" />
              </div>
            </div>
          </div>
          <p className="text-center mt-2">ou</p>
          <FormGroup>
            <Label>Título:</Label>
            <Input type="text" name="title" />
          </FormGroup>
          <FormGroup>
            <Label>Mensagem:</Label>
            <Input type="text" name="email" />
          </FormGroup>
          <div className="mt-3 container row col text-center">
            <LoginGoogle text="Comentar" disabled={this.state.comment.title == "" && this.state.comment.msg == ""} onHandle={this.onNewComment} />
          </div>
        </Card>
      </div>
    )
  }

}

function Comentarios(props) {
  return (
    <div className="mt-3">
      <h3>
        <span className="badge bg-danger">Total de comentários: {props.comentarios.quant}</span>
      </h3>
      <ListGroup>
        {props.comentarios.itens.map((comment, x) =>
          <ListGroupItem key={x}>
            <Row>
              <Col xs="4">
                <img className="rounded-circle" style={{ width: "70px" }} src={comment.imagemUrl} />
                <br></br><label>{comment.nomeUsuario}</label>
              </Col>
              <Col xs="8">
                <h5>{comment.titulo}</h5>
                <p>{comment.mensagem}</p>
                <p className="text-right">Data: {moment(comment.dataCriacao).format("LL")}</p>
              </Col>
            </Row>
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  )
}

function ObraInfo(props) {
  return (
    <div>
      <Card className="mt-3">
        <CardHeader>
          <h3 className="text-center">Obra/Serviço {props.obra.numeroLicitacao}</h3>
        </CardHeader>
        <CardBody>
          <Row className="justify-content-center">
            <Col style={styles.obraInfoBox}>
              <p><strong>Categoria:</strong> {props.obra.categoria}</p>
            </Col>
            <Col style={styles.obraInfoBox}>
              <p><strong>Situação:</strong> {props.obra.situacao}</p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col style={styles.obraInfoBox}>
              <p><strong>Descrição:</strong>{props.obra.descricao}</p>
            </Col>
            <Col style={styles.obraInfoBox}>
              <p><strong>Valor contratado:</strong> R$ {props.obra.contratoValorContratado}</p>
              <p><strong>Valor pago acumulado:</strong> R$ {props.obra.valorPagoAcumulado}</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default withRouter(class Obra extends Component {

  constructor(props) {
    super(props);
    this.state = {
      obra: {
        aditivoPrazoAditado: "",
        aditivoValorAditado: "",
        categoria: "",
        contratadoCpfCcnpj: "",
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
      },
      comentarios: {
        itens: [],
        quant: 0
      }
    };
    this.getObra = this.getObra.bind(this);
    this.getComentarios = this.getComentarios.bind(this);
  }

  routeChangeComplete = () => {
    let id = this.props.router.query.id;
    this.getObra(id);
    this.getComentarios(id);
  }

  componentDidMount() {
    this.props.router.events.on("routeChangeComplete", this.routeChangeComplete);
  }


  async getComentarios() {
    let id = await this.props.router.query.id;
    let { data } = await axios.get(`/api/v1/public/comentarios?obraId=${id}`);
    let comentarios = {
      itens: data.comments,
      quant: data.countComments
    }
    this.setState({ comentarios: comentarios });
  }

  async getObra() {
    let id = await this.props.router.query.id;
    let { data } = await axios.get(`/api/v1/public/obra?id=${id}`);
    this.setState({ obra: data.construction });
  }

  render() {
    return (
      <div className="container-fluid row d-flex justify-content-center">
        <div className="row col-sm-8">
          <ObraInfo obra={this.state.obra} />
          <NotaOuComentario />
          <Comentarios comentarios={this.state.comentarios} />
        </div>
      </div>
    )
  }
})