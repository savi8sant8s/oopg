import { Component } from "react";
import { Slide } from 'react-slideshow-image';
import { Chart } from "react-google-charts";

import { 
    Card, 
    CardHeader, 
    CardBody, 
    Row, 
    Col,
    Container,
    ListGroup,
    Button
 } from "reactstrap";
 import axios from "axios";
import ModeloGrafico from "../services/modelo-grafico";

const styles = {
  cardHeader: { background: "#ff2b32c4", color: "white" }
}
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
  }

  render() {
    return (
      <Card style={{minHeight: "50vh"}}>
        <CardHeader style={styles.cardHeader}>
          <h4>Dados do Observatório</h4>
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-around">
          <p>Total de obras: <span className="badge bg-warning">{this.state.qntObras}</span></p>
          <p>Total investido: <span className="badge bg-warning"> {this.state.gastoTotal}</span></p>
          </div>
          <div className="slide-container mt-3" style={{ paddingTop: "60px" }}>
            <Slide indicators={true}>
              {this.state.modelos.map((modelo, x)=>
                <div className="each-slide" key={x}>
                <h5>{modelo.titulo}</h5>
                <Chart
                  chartType={modelo.tipo}
                  data={modelo.data}
                  options={modelo.options}
                />
              </div>
              )}
            </Slide>
          </div>
        </CardBody>
      </Card>
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
      <Card style={{ minHeight: "50vh" }}>
        <CardHeader style={{background: "#ff2b32c4", color: "white", color: "white"}}>
          <h4>Selecione Categoria</h4>
        </CardHeader>
        <CardBody>
          <ListGroup>
            {this.state.categorias.map((categoria, x)=>
            <Button onClick={()=>window.location.href= categoria.url} className="d-flex justify-content-between bg-white text-dark" key={x}>
              <label>{categoria.nome}</label>
              <img src={categoria.icone} width="50" height="50"></img>
            </Button>
            )}
          </ListGroup>
        </CardBody>
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
    let { data } = await axios.get("api/v1/public/noticias?quant=3");
    this.setState({ noticias: data.noticias });
  }

  render() {
    return (
      <Card style={{ minHeight: "50vh" }}>
        <CardHeader style={styles.cardHeader}>
          <h4>Últimas notícias</h4>
        </CardHeader>
        <CardBody>
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
        </CardBody>
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
      <div className="container-fluid d-flex justify-content-center text-center">
        <div className="row col-sm-8">
          <Container className="pt-5">
              <Graficos />
            <Row>
              <Col md="6" className="pt-5">
                <Categorias />
              </Col>
              <Col md="6" className="pt-5">
                <Noticias />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}
