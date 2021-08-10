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

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const styles = {
  obraInfoBox: {
    border: "solid 2px", 
    borderRadius: "2px",
    margin: "2px 2px 2px 2px",
    borderColor: "gray"
  }
}

class LoginGoogle extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText={this.props.text}
          onSuccess={this.props.onHandle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
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

  onNewVote(resp) {
    console.log(resp);
    console.log(this.state.note.vote);
  }

  onNewComment() {

  }
  
  render(){
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


class ListaComentarios extends Component {
  constructor(props){
    super(props);
    this.state = {
      countComments: 0,
      comments: []
    };
    this.onGetComments = this.onGetComments.bind(this);
  }

  componentDidMount() {
    moment().locale("pt-br");
    this.onGetComments();
  }

  async onGetComments(){
    let { data } = await axios.get("/api/v1/public/comentarios?obraId=11");
    this.setState({comments: data.comments});
    this.setState({countComments: data.countComments});
  }

  render(){
    return (
      <div className="mt-3">
        <h3>
          <span className="badge bg-danger">Total de comentários: {this.state.countComments}</span>
        </h3>
        <ListGroup>
          {this.state.comments.map((comment, x) => 
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
}

class ObraInfo extends Component {
  render(){
    return (
      <div>
        <Card className="mt-3">
          <CardHeader>
            <h3 className="text-center">Obra TP Nº 003/2019</h3>
          </CardHeader>
          <CardBody>
            <Row className="justify-content-center">
              <Col xs="3" style={styles.obraInfoBox}>
                <p><strong>Valor Contratado:</strong></p>
                <p>R$ 1.123,12</p>
              </Col>
              <Col xs="3" style={styles.obraInfoBox}>
                <p><strong>Valor Contratado:</strong></p>
                <p>R$ 1.123,12</p>
              </Col>
              <Col xs="3" style={styles.obraInfoBox}>
                <p><strong>Valor Contratado:</strong></p>
                <p>R$ 1.123,12</p>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="3" style={styles.obraInfoBox}>
                <p><strong>Valor Contratado:</strong></p>
                <p>R$ 1.123,12</p>
              </Col>
              <Col xs="3" style={styles.obraInfoBox}>
                <p><strong>Valor Contratado:</strong></p>
                <p>R$ 1.123,12</p>
              </Col>
              <Col xs="3" style={styles.obraInfoBox}>
                <p><strong>Valor Contratado:</strong></p>
                <p>R$ 1.123,12</p>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="3" style={styles.obraInfoBox}>
                <p><strong>Valor Contratado:</strong></p>
                <p>R$ 1.123,12</p>
              </Col>
              <Col xs="3" style={styles.obraInfoBox}>
                <p><strong>Valor Contratado:</strong></p>
                <p>R$ 1.123,12</p>
              </Col>
              <Col xs="3" style={styles.obraInfoBox}>
                <p><strong>Valor Contratado:</strong></p>
                <p>R$ 1.123,12</p>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="6" style={styles.obraInfoBox}>
                <p className="text-center">Clique aqui para baixar o documento</p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  } 
}

export default class Obra extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid row d-flex justify-content-center">
        <div className="row col-sm-6">
          <ObraInfo />
          <NotaOuComentario />
          <ListaComentarios />
        </div>
      </div>
    )
  }
}