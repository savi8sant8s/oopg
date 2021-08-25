import { Component } from "react";
import { Slide } from 'react-slideshow-image';
import { Chart } from "react-google-charts";
import Link from 'next/link';

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

class Graficos extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card className="mt-3" style={{ height: "40vh" }}>
        <CardHeader className="text-center">Dados de 2019/2020</CardHeader>
        <CardBody>
          <Row>
            <Col>
              <span className="badge bg-success"><strong>Total de obras:</strong> 123</span>
            </Col>
            <Col>
              <span className="badge bg-warning"><strong>Total Gasto:</strong> R$ 1.234.434,13</span>
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
            <Card className="text-center mt-3" style={{height: "40vh", margin: "auto"}}>
                <CardHeader>
                    <CardTitle>Selecione uma categoria</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col className="m-3">
                            <Link href={"/obras?categoria=saude&ordenar=recente"}>
                              Saúde
                            </Link>
                        </Col>
                        <Col className="m-3">
                            <Link href={"/obras?categoria=educacao&ordenar=recente"}>
                            Educação
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="m-3">
                          <Link href={"/obras?categoria=assistenciasocial&ordenar=recente"}>
                          Assistência Social
                            </Link>
                        </Col>
                        <Col className="m-3">
                          <Link href={"/obras?categoria=administracao&ordenar=recente"}>
                          Administração
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="m-3">
                          <Link href={"/obras?categoria=urbanismo&ordenar=recente"}>
                            Urbanismo
                            </Link>
                        </Col>
                        <Col className="m-3">
                          <Link href={"/obras?ordenar=recente"}>
                          Todas
                            </Link>
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
  }

  render() {
    return (
      <div className="slide-container text-center mt-3">
        <Slide indicators={true}>
          <div className="each-slide">
            <p>Notícia 1</p>
            <img src="data:image/webp;base64,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" />
          </div>
          <div className="each-slide">
            <p>Notícia 2</p>
            <img src="data:image/webp;base64,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" />
          </div>
          <div className="each-slide">
            <p>Notícia 3</p>
            <img src="data:image/webp;base64,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" />
          </div>
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
