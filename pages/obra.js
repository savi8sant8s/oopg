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
  Button,
  ButtonGroup,
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

class LoginCliente extends Component {

  constructor(props) {
    super(props);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.logoutGoogle = this.logoutGoogle.bind(this);
  }

  loginGoogle(response) {
    console.log(response);
  }

  logoutGoogle(response) {
    console.log(response);
  }

  render() {
    return (
      <div>
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Comentar"
          onSuccess={this.loginGoogle}
          onFailure={this.loginGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </div>
    )
  }
}

class FormComentario extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      msg: "",
      username: "",
      imageUrl: "",
      email: ""
    };
    this.onNewComment = this.onNewComment.bind(this);
  }

  onNewComment(){

  }
  
  render(){
    return (
      <div>
        <h3>
          <span className="badge bg-danger">Comentário</span>
        </h3>
        <Card className="p-3">
          <CardBody>
            <FormGroup className="mt-3">
              <Label>Título:</Label>
              <Input type="text" name="title" />
            </FormGroup>
            <FormGroup className="mt-3">
              <Label>Mensagem:</Label>
              <Input type="text" name="email" />
            </FormGroup>
            <div className="mt-3 container row col text-center">
              <LoginCliente />
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }
  
}

class Nota extends Component {
  render(){
    return (
      <div className="text-center">
        <h5>O que achou?</h5>
        <ButtonGroup>
          <Button className="bg-warning">Gostei</Button>
          <Button className="bg-warning">Não sei</Button>
          <Button className="bg-warning">Não gostei</Button>
        </ButtonGroup>
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
        <h3 className="text-center">
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
          <Nota />
          <FormComentario />
          <ListaComentarios />
        </div>
      </div>
    )
  }
}