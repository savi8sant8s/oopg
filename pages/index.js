import { Component } from "react";
import { Slide } from 'react-slideshow-image';
import { Chart } from "react-google-charts";

import { 
    Card, 
    CardHeader, 
    CardBody, 
    Row, 
    CardTitle,
    Col,
    Container,
    NavLink
 } from "reactstrap";
 import axios from "axios";

class Graficos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      qntObras:0,
      gastoTotal:0};
  }
  async componentDidMount(){
    let {data} = await axios.get("api/v1/public/estatisticas/obras/balanco")
    this.setState({qntObras: data.quantObras});
    this.setState({gastoTotal: data.gastoTotal});
  }

  render() {
    return (
      <Card className="mt-3" style={{ height: "40vh" }}>
        <CardHeader className="text-center">Dados do Observatório</CardHeader>
        <CardBody>
          <Row>
            <Col>
              <span className="badge bg-success"><strong>Total de obras:</strong> {this.state.qntObras}</span>
            </Col>
            <Col>
              <span className="badge bg-warning"><strong>Total Gasto:</strong> R$ {this.state.gastoTotal}</span>
            </Col>
          </Row>
          <div className="slide-container text-center mt-3">
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
            <Card className="text-center mt-3" style={{height: "40vh"}}>
                <CardHeader>
                    <CardTitle>Selecione uma categoria</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col className="m-3">
                            Saúde
                        </Col>
                        <Col className="m-3">
                            Educação
                        </Col>
                    </Row>
                    <Row>
                        <Col className="m-3">
                            Assistência Social
                        </Col>
                        <Col className="m-3">
                            Administração
                        </Col>
                    </Row>
                    <Row>
                        <Col className="m-3">
                            Urbanismo
                        </Col>
                        <Col className="m-3">
                            Todas
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

class Avaliacao extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const styles = {
      backgroundColor: "#fbb034", 
      backgroundImage: "linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)"
    };

    return (
      <div style={styles} className="text-center">
        <NavLink href="#" style={{color: "white"}}>Avalie o observatório!!</NavLink>
    </div>
    )
  }
}

class Noticias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticias:[]
    }
  }
  async componentDidMount(){
    let {data} = await axios.get("api/v1/public/noticias?quant=3");
    this.setState({noticias: data.noticias});
  }

  render() {
    return (
      <div className="slide-container text-center mt-3">
        <Slide indicators={true}>
          {this.state.noticias.map((noticia, x)=>
            <div className="each-slide" key={x}>
            <p>{noticia.titulo}</p>
            <img src={noticia.imagemUrl} onClick={()=>{window.location.href=noticia.link}} />
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
        <Container>
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
