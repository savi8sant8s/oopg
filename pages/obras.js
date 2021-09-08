import { Component } from "react";
import { 
  Container,
  NavLink,
  Table, 
  InputGroup,
  FormControl,
  Card,
  Row
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { mostraCarregamento } from "../services/alerta-padrao";

class ListaObras extends Component {
  constructor(props){
    super(props);
    this.state = {
      obras: []
    }
  }

  async componentDidMount() {
    mostraCarregamento();
    let { data } = await axios.get(this.pegarUrl());
    Swal.close();
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
      <Card>
        <Table striped>
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
                <td><NavLink style={{color:"red"}} href={`/obra/${obra.id}`}>Ver mais</NavLink></td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
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

  async componentDidMount(){
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
      <>
          <InputGroup className="mb-3">
            <InputGroup.Text>Filtrar por</InputGroup.Text>
            <FormControl as="select" onChange={this.onManipularMudanca} value={this.state.categoria} name="categoria">
              <option value="">Todas</option>
              <option value="saude">Saúde</option>
              <option value="educacao">Educação</option>
              <option value="assistenciasocial">Assistência Social</option>
              <option value="administracao">Administração</option>
              <option value="urbanismo">Urbanismo</option>
            </FormControl>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Ordenar por</InputGroup.Text>
              <FormControl as="select" onChange={this.onManipularMudanca} value={this.state.ordenar} name="ordenar">
                <option value="">Todas</option>
                <option value="recente">Mais recente</option>
                <option value="antigo">Mais antigo</option>
              </FormControl>
          </InputGroup>
      </>
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
      <Container fluid="sm" className="text-center p-5">
        <h3>Obras públicas de Garanhuns</h3>
        <div className="mt-5">
          <Filtros query={this.props.query} />
          <ListaObras query={this.props.query} />
        </div>
      </Container>
    )
  }
}
