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
  NavLink
} from "reactstrap";
import axios from "axios";

class Graficos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      qntObras: 0,
      gastoTotal: 0
    };
  }
  async componentDidMount() {
    let { data } = await axios.get("api/v1/public/estatisticas/obras/balanco")
    this.setState({ qntObras: data.quantObras });
    this.setState({ gastoTotal: data.gastoTotal });
  }

  render() {
    return (
      <Card className="mt-3" style={{ margin: "auto", minHeight: "85vh" }}>
        <CardHeader className="text-center">
          <h4>Dados do Observatório</h4>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <h5>Total de obras: <span class="badge bg-secondary">{this.state.qntObras}</span></h5>
              <h5>Total Gasto: <span class="badge bg-secondary"> R$ {this.state.gastoTotal}</span></h5>
            </Col>
          </Row>
          <div className="slide-container text-center mt-3" style={{paddingTop:"60px"}}>
            <Slide indicators={true}>
              <div className="each-slide">
                <h5>Situação das obras</h5>
                <Chart
                  chartType="PieChart"
                  data={[
                    ['Situação', 'Total de obras'],
                    ['Concluídas', 11],
                    ['Andamento', 29],
                    ['Paralizadas', 2]
                  ]}
                  options={{
                    is3D: true,
                  }}
                />
              </div>
              <div className="each-slide">
                <h5>Total de obras por ano</h5>
                <Chart
                  chartType="Bar"
                  data={[
                    ['Ano', 'Total'],
                    ['2014', 100],
                    ['2015', 117],
                    ['2016', 66],
                    ['2017', 103],
                  ]}
                />
              </div>
              <div className="each-slide">
                <h5>Total de obras por categoria</h5>
                <Chart
                  chartType="PieChart"
                  data={[
                    ['Categoria', 'Total'],
                    ['Saúde', 11],
                    ['Educação', 2],
                    ['Ass. social', 2],
                    ['Urbanismo', 2],
                    ['Administ.', 7],
                  ]}
                  options={{
                    pieHole: 0.4,
                  }}

                />
              </div>
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
  }

  render() {
    return (
      <Card className="text-center mt-3" style={{ margin: "auto", minHeight: "85vh" }}>
        <CardHeader>
          <h4>Selecione Categoria</h4>
        </CardHeader>
        <div style={{ margin: "auto"}}>
          <Row>
            <Col className="m-1">
              <div>
              <img src="./saude.png" style={{ width: "50px", margin: "10px" }} />
              </div>
              <a href={"/obras?categoria=saude&ordenar=recente"} style={{ textDecoration: "none", color: "black" }}>Saúde</a>
            </Col>
            <Col className="m-1">
              <div>
              <img src="./educacao.png" style={{ width: "50px", margin: "10px" }} />
              </div>
              <a href={"/obras?categoria=educacao&ordenar=recente"} style={{ textDecoration: "none", color: "black" }}>Educação</a>
            </Col>
          </Row>
          <Row>
            <Col className="m-1">
              <div>
              <img src="./assistenciasocial.png" style={{ width: "50px", margin: "10px" }} />
              </div>
              <a href={"/obras?categoria=assistenciasocial&ordenar=recente"} style={{ textDecoration: "none", color: "black" }}>A. Social</a>
            </Col>
            <Col className="m-1">
              <div>
              <img src="./administracao.png" style={{ width: "50px", margin: "10px" }} />
              </div>
              <a href={"/obras?categoria=administracao&ordenar=recente"} style={{ textDecoration: "none", color: "black" }}>Administração</a>
            </Col>
          </Row>
          <Row>
            <Col className="m-1">
              <div>
              <img src="./urbanismo.png" style={{ width: "50px", margin: "10px" }} />
              </div>
              <a href={"/obras?categoria=urbanismo&ordenar=recente"} style={{ textDecoration: "none", color: "black" }}>Urbanismo</a>
            </Col>
            <Col className="m-1">
              <div>
              <img src="./todas.png" style={{ width: "50px", margin: "10px" }} />
              </div>
              <a href={"/obras?ordenar=recente"} style={{ textDecoration: "none", color: "black"}}>Todas</a>
            </Col>
          </Row>
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
