import { Component } from "react";
import { CardBody, Card, CardTitle, CardHeader, NavLink } from "reactstrap";
import { FormGroup, Label, Col, Input, Table } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

class ListaObras extends Component {
  constructor(props){
    super(props);
    this.state = {
      obras: [],
      quantObras: 0
    }
  }

  async componentDidMount() {
    Swal.showLoading();
    let { data } = await axios.get(this.pegarUrl());
    Swal.close();
    this.setState({ quantObras: data.quantObras });
    this.setState({ obras: data.obras });
  }

  pegarUrl(){
    let baseUrl = "/api/v1/public/obras";
    if (this.props.query.categoria != undefined && this.props.query.categoria != ""){
      baseUrl += `?categoria=${this.props.query.categoria}`;
    }
    if (this.props.query.ordenar != undefined && this.props.query.ordenar != ""){
      baseUrl += baseUrl.length > 20 ? '&': '?';
      baseUrl += `ordenar=${this.props.query.ordenar}`;
    }
    return baseUrl;
  }

  render(){
    return (
      <div className="text-center"> 
      {this.state.quantObras > 0 ? <h3>{this.state.quantObras} obras</h3> : <></> }  
      <Table>
      <thead>
            <tr>
              <th>Ano</th>
              <th>Descrição</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.obras.map((obra, x) =>
              <tr key={x}>
                <td>{moment(obra.contratoDataInicio).format("YYYY")}</td>
                <td>{obra.descricao.slice(0, 100) + "..."}</td>
                <td><NavLink href={`/obra/${obra.id}`}>Ver mais</NavLink></td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

class Filtros extends Component {
  constructor(props){
    super(props);
    this.state = {
      categoria: "",
      ordenar: ""
    }
    this.onFiltrarObras = this.onFiltrarObras.bind(this);
    this.onManipularMudanca = this.onManipularMudanca.bind(this);
  }

  componentDidMount(){
    this.setState({
      categoria: this.props.query.categoria,
      ordenar: this.props.query.ordenar
    })
  }

  onManipularMudanca(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.onFiltrarObras(event.target.name, event.target.value);
  }

  onFiltrarObras(filtro, valor){
    let baseUrl = "";
    if (filtro == "categoria"){
      baseUrl += this.state.ordenar != "" || this.state.ordenar != undefined
      ? `?categoria=${valor}&ordenar=${this.state.ordenar}`: `?categoria=${valor}`;
    }
    else if (filtro == "ordenar"){
      baseUrl += this.state.categoria != "" || this.state.categoria != undefined 
      ? `?categoria=${this.state.categoria}&ordenar=${valor}`: `?ordenar=${valor}`;
    }
    window.location.href = baseUrl;
  }

  render(){
    return (
      <div>
        <div className="mb-2">
          <FormGroup row>
            <Label sm={2} >Filtrar por</Label>
            <Col sm={10}>
              <Input onChange={this.onManipularMudanca} value={this.state.categoria} name="categoria" type="select">
                <option value="">Todas</option>
                <option value="saude">Saúde</option>
                <option value="educacao">Educação</option>
                <option value="assistenciasocial">Assistência Social</option>
                <option value="administracao">Administração</option>
                <option value="urbanismo">Urbanismo</option>
              </Input>
            </Col>
          </FormGroup>
        </div>
        <div className="mb-2">
          <FormGroup row>
            <Label sm={2}>Ordenar por</Label>
            <Col sm={10}>
              <Input onChange={this.onManipularMudanca} value={this.state.ordenar} name="ordenar" type="select">
                <option value="">Todas</option>
                <option value="recente">Mais recente</option>
                <option value="antigo">Mais antigo</option>
              </Input>
            </Col>
          </FormGroup>
        </div>
      </div>
    )
  }
}

export default class Obras extends Component {

  static getInitialProps({ query }) {
    return { query }
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid row d-flex justify-content-center">
        <div className="row col-sm-8">
          <Card className="mt-3">
            <CardHeader>
              <CardTitle className="text-center" tag="h5">Selecione uma obra</CardTitle>
              <Filtros query={this.props.query}/>
            </CardHeader>
            <CardBody>
              <ListaObras query={this.props.query} />
            </CardBody>
          </ Card>
        </div>
      </div>
    )
  }
}
