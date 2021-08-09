import { Component } from "react";
import { CardBody, Card, CardTitle, CardText, CardLink } from "reactstrap";
import { FormGroup, Label, Col, Input } from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";

const styles = {
  list: {
    border:"2px",
    marginTop:"3rem", 
    overflow: "auto", 
    maxHeight:"720px", 
    alignContent: "center", 
    fontSize:"20px", 
    textAlign: "center"
  }
}

const listObras=[
  {titulo: "Obra nome teste Garanunhuns Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
  {titulo: "Obra nome teste Garanunhuns"},
]

function ListaObras() {
  return (
    <div style={styles.list}>    
    <ListGroup>
      {listObras.map((obra, x) =>
      <ListGroupItem disabled key={x} tag="a" href="#">{obra.titulo}</ListGroupItem>
      )}
    </ListGroup>
    </div>
  )
}

function Filtro() {
  return (
    <div class="mb-2">
      <FormGroup row>
        <Label for="FiltroCategorias" sm={2} >Filtrar</Label>
        <Col sm={10}>
          <Input type="select" name="select" id="FiltroCategorias">
            <option>Saúde</option>
            <option>Educação</option>
            <option>Assistência Social</option>
            <option>Administração</option>
            <option>Urbanismo</option>
          </Input>
        </Col>
      </FormGroup>
    </div>
  )
}

function Ordem() {
  return (
    <div class="mb-2">
      <FormGroup row>
        <Label for="FiltroOrdenar" sm={2}>Ordenar por</Label>
        <Col sm={10}>
          <Input type="select" name="select" id="FiltroOrdenar">
            <option>Mais recente</option>
            <option>Mais antigo</option>
          </Input>
        </Col>
      </FormGroup>
    </div>
  )
}

function CardObras() {
  return (
    <div>
      <div class="justify-content-center">
        <Card>
          <CardBody>
            <CardTitle class="text-center" tag="h5">Selecione uma obra</CardTitle>
            <Filtro />
            <Ordem />
            <ListaObras />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default class Obras extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <CardObras />
        </div>
      </div>
    )
  }
}
