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
              {this.state.modelos.map((modelo, x)=>
                <div className="each-slide">
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
