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


class Graficos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      qntObras:0,
      gastoTotal:0,
      modelos: []
    };
  }

  async componentDidMount(){
    mostraCarregamento();
    let modelos = this.state.modelos;
    let modeloGrafico = new ModeloGrafico();
    let res = await axios.get("api/v1/public/estatisticas");
    this.setState({qntObras: res.data.quantObras});
    let gastoTotal = res.data.gastoTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    this.setState({gastoTotal: gastoTotal});
    modelos.push(modeloGrafico.obrasPorSituacao(res.data));
    modelos.push(modeloGrafico.obrasPorCategoria(res.data));
    modelos.push(modeloGrafico.obrasPorAno(res.data));
    modelos.push(modeloGrafico.gastoObrasPorAno(res.data));
    this.setState({modelos: modelos});
    Swal.close();
  }

  render() {
    return (
      <>
        <h3>Observatório de Obras Públicas de Garanhuns</h3>
        <div className="d-flex justify-content-around mt-5">
          <h5>Total de obras: <span className="badge bg-warning">{this.state.qntObras}</span></h5>
          <h5>Total investido: <span className="badge bg-warning"> {this.state.gastoTotal}</span></h5>
        </div>
        <Card className="slide-container">
          <Slide indicators={true}>
            {this.state.modelos.map((modelo, x) =>
              <div className="each-slide" key={x}>
                <h4><u>{modelo.titulo}</u></h4>
                <Chart
                  chartType={modelo.tipo}
                  data={modelo.data}
                  options={modelo.options}
                />
              </div>
            )}
          </Slide>
        </Card>
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
      <Card className="p-2">
        <h4><u>Selecione Categoria</u></h4>
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
      </Card>
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
      <Card className="p-2">
        <h4><u>Últimas notícias</u></h4>
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
      </Card>
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
        <Row>
        <Graficos className="pt-5" />
        </Row>
        <Row>
          <Col sm="6" className="pt-5">
            <Categorias />
          </Col>
          <Col sm="6" className="pt-5">
            <Noticias />
          </Col>
        </Row>
      </Container>
    )
  }
}
