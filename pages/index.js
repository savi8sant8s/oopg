import { Component } from "react";
import { Slide } from 'react-slideshow-image';
import { Chart } from "react-google-charts";
import {
  Card,
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import axios from "axios";
import ModeloGrafico from "../services/modelo-grafico";
import Swal from "sweetalert2";
import { mostraCarregamento } from "../services/alerta-padrao";

const stylebackground = {
  backgroundColor: "#fbb034",
  backgroundImage: "linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)"
};

class Graficos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      qntObras: 0,
      gastoTotal: 0,
      modelos: []
    };
  }

  async componentDidMount() {
    mostraCarregamento();
    let modelos = this.state.modelos;
    let modeloGrafico = new ModeloGrafico();
    let res = await axios.get("api/v1/public/estatisticas");
    this.setState({ qntObras: res.data.quantObras });
    let gastoTotal = res.data.gastoTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    this.setState({ gastoTotal: gastoTotal });
    modelos.push(modeloGrafico.obrasPorSituacao(res.data));
    modelos.push(modeloGrafico.obrasPorCategoria(res.data));
    modelos.push(modeloGrafico.obrasPorAno(res.data));
    modelos.push(modeloGrafico.gastoObrasPorAno(res.data));
    this.setState({ modelos: modelos });
    Swal.close();
  }

  render() {
    return (
      <>
        <Row className="d-flex justify-content-around" style={{padding:"0px", border:"1px solid #DCDCDC", background:"white"}}>
          <div style={stylebackground} className="d-flex justify-content-around">
          <h5>Total de obras: <span className="badge bg-light mt-2 text-dark">{this.state.qntObras}</span></h5>
          <h5>Total investido: <span className="badge bg-light mt-2 text-dark"> {this.state.gastoTotal}</span></h5>
          </div>
          
          <Card className="slide-container">
          <Slide indicators={true}>
            {this.state.modelos.map((modelo, x) =>
              <div className="each-slide mt-2" key={x}>
                
                <Chart
                  chartType={modelo.tipo}
                  data={modelo.data}
                  options={modelo.options}
                />
                <h4>{modelo.titulo}</h4>
              </div>
            )}
          </Slide>
        </Card>
        </Row>
      </>
    )
  }
}

class Categorias extends Component {

  constructor(props) {
    super(props);
    this.baseUrl = "/obras?categoria=";
    this.recente = "&ordenar=recente";
    this.state = {
      categorias: [
        {
          nome: "Administração",
          url: `${this.baseUrl}administracao${this.recente}`,
          icone: "./administracao.png"
        },
        {
          nome: "Assistência social",
          url: `${this.baseUrl}assistenciasocial${this.recente}`,
          icone: "./assistenciasocial.png"
        },
        {
          nome: "Educação",
          url: `${this.baseUrl}educacao${this.recente}`,
          icone: "./educacao.png"
        },
        {
          nome: "Saúde",
          url: `${this.baseUrl}saude${this.recente}`,
          icone: "./saude.png"
        },
        {
          nome: "Urbanismo",
          url: `${this.baseUrl}urbanismo${this.recente}`,
          icone: "./urbanismo.png"
        },
        {
          nome: "Todas",
          url: `/obras?ordenar=recente`,
          icone: "./todas.png"
        }
      ]
    }
  }

  render() {
    return (
      <Row className="justify-content-center" style={{border:"1px solid #DCDCDC", background:"white"}}>
        <Row style={stylebackground}>
        <h5>Selecione uma categoria</h5>
        </Row>
        <Row style={{minHeight:"65vh"}}>
        <ListGroup variant="flush">
          {this.state.categorias.map((categoria, x) =>
            <ListGroupItem action href={categoria.url} key={x}>
              <div className="container-fluid d-flex justify-content-between">
                <label>{categoria.nome}</label>
                <img src={categoria.icone} width="50" height="50"></img>
              </div>
            </ListGroupItem>
          )}
        </ListGroup>
        </Row>
      </Row>
    )
  }
}

class Noticias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticias: []
    }
  }
  async componentDidMount() {
    mostraCarregamento();
    let { data } = await axios.get("api/v1/public/noticias?quant=3");
    this.setState({ noticias: data.noticias });
    Swal.close();
  }

  render() {
    return (
      <Row className="justify-content-center" style={{border:"1px solid #DCDCDC", background:"white"}}>
        <Row style={stylebackground}>
        <h5>Últimas notícias</h5>
        </Row>
        <Row style={{minHeight:"65vh"}}>
        <div className="slide-container mt-3">
          <Slide indicators={true}>
            {this.state.noticias.map((noticia, x) =>
              <div className="each-slide" key={x}>
                <p>{noticia.titulo}</p>
                <img src={noticia.imagemUrl} height="300px" width="300px" onClick={() => { window.location.href = noticia.link }} />
              </div>
            )}
          </Slide>
        </div>
        </Row>
      </Row>
    )
  }
}

export default class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid="sm" className="text-center p-5">
        <Row className="justify-content-center" >
          <Col sm="11">
          <div className="jumbotron">
            <Row>
              <Col className="m-auto">
              <h5 className="mb-4 text-left"><b>Observatório de Obras Públicas de Garanhuns</b></h5>
              <p className="text-justify">O objetivo do projeto é desenvolver um observatório para monitorar as obras públicas. Além disso, dar transparência e informações úteis à população de Garanhuns-PE sobre as obras da cidade e engajá-los a serem fiscalizadores ativos das mesmas, visando melhorar o desenvolvimento econômico da cidade e gerar uma base de conhecimento para realização de obras futuras.</p>
              </Col>
              <Col >
              <img src="/logo3.png" alt="" width="300" />
              </Col>
            </Row>
            <hr className="my-4"/>
            <p className="lead">
            <a className="btn btn-danger btn-lg" href="#grafico" role="button">Começar</a>
            </p>
          </div>
          </Col>  
        </Row>
        <Row id="grafico" className="justify-content-center pt-5">
          <Col sm="11" >
          <Graficos className="pt-5" />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm="5" className="pt-5 ">
            <Categorias />
          </Col>
          <Col sm="1">
          </Col>
          <Col sm="5"  className="pt-5 ">
            <Noticias />
          </Col>
        </Row>
      </Container>
    )
  }
}
