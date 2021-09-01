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
    NavLink,
    ListGroup,
    ListGroupItem
 } from "reactstrap";
 import axios from "axios";
import ModeloGrafico from "../services/modelo-grafico";

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
    let baseUrl = "api/v1/public/estatisticas/obras";
    let modelos = this.state.modelos;
    let modeloGrafico = new ModeloGrafico();

    let res = await axios.get(`${baseUrl}/balanco`);
    this.setState({qntObras: res.data.quantObras});
    this.setState({gastoTotal: res.data.gastoTotal});

    res = await axios.get(`${baseUrl}/situacao`);
    modelos.push(modeloGrafico.obrasPorSituacao(res.data));
    res = await axios.get(`${baseUrl}/categoria`);
    modelos.push(modeloGrafico.obrasPorCategoria(res.data));
    res = await axios.get(`${baseUrl}/ano`);
    modelos.push(modeloGrafico.obrasPorAno(res.data));
    res = await axios.get(`${baseUrl}/gasto`);
    modelos.push(modeloGrafico.gastoObrasPorAno(res.data));

    this.setState({modelos: modelos});
  }

  render() {
    return (
      <Card className="mt-3" style={{ margin: "auto", minHeight: "50vh" }}>
        <CardHeader className="text-center">
          <h4>Dados do Observatório</h4>
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-around">
          <p>Total de obras: <span class="badge bg-secondary">{this.state.qntObras}</span></p>
          <p>Total Gasto: <span class="badge bg-secondary"> R$ {this.state.gastoTotal}</span></p>
          </div>
          <div className="slide-container text-center mt-3" style={{ paddingTop: "60px" }}>
            <Slide indicators={true}>
              {this.state.modelos.map((modelo, x)=>
                <div className="each-slide" key={x}>
                <h5>Situação das obras</h5>
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
      <Card className="text-center mt-3" style={{ margin: "auto", minHeight: "50vh" }}>
        <CardHeader>
          <h4>Selecione Categoria</h4>
        </CardHeader>
        <div style={{marginTop: "auto", marginBottom: "auto"}}>
          <ListGroup>
            {this.state.categorias.map((categoria, x)=>
            <ListGroupItem onClick={()=>window.location.href= categoria.url} className="d-flex justify-content-between" key={x}>
              <label>{categoria.nome}</label>
              <img src={categoria.icone} width="50" height="50"></img>
            </ListGroupItem>
            )}
          </ListGroup>
        </div>
      </Card>
    )
  }
}

class Avaliacao extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      backgroundColor: "#fbb034",
      backgroundImage: "linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)"
    };

    return (
      <div style={styles} className="text-center">
        <NavLink href="#" style={{ color: "white" }}>Avalie o observatório!!</NavLink>
      </div>
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
      <div className="slide-container text-center mt-3">
        <Slide indicators={true}>
          {this.state.noticias.map((noticia, x) =>
            <div className="each-slide" key={x}>
              <p>{noticia.titulo}</p>
              <img src={noticia.imagemUrl} onClick={() => { window.location.href = noticia.link }} />
            </div>
          )}
        </Slide>
      </div>
    )
  }
}
export default class paginainicial extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Avaliacao />
        <Noticias />
        <Container >
          <Row>
            <Col sm="6">
              <Categorias />
            </Col>
            <Col sm="6">
              <Graficos />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
