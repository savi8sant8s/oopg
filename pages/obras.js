import { Component } from "react";
import { CardBody, Card, CardTitle, CardHeader } from "reactstrap";
import { FormGroup, Label, Col, Input } from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";

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

class ListaObras extends Component {
  constructor(props){
    super(props);
    this.state = {
      constructions: [],
      countConstructions: 0
    }
  }

  componentDidMount(){
    axios.get("/api/v1/public/obras").then((res)=>{
      let { data } = res;
      this.setState({countConstructions: data.countConstructions});
      this.setState({constructions: data.constructions});
    })
  }

  render(){
    return (
      <div style={styles.list}> 
      {this.state.countConstructions > 0 ? <h3>{this.state.countConstructions} obras</h3> : <></> }  
      <ListGroup>
        {this.state.constructions.map((obra, x) =>
        <ListGroupItem key={x} tag="a" href={`/obra?id=${obra.id}`}>{obra.descricao.slice(0,70) + "..."}</ListGroupItem>
        )}
      </ListGroup>
      </div>
    )
  }
}

class Filtros extends Component {
  constructor(props){
    super(props);
  }


  render(){
    return (
      <div>
        <div className="mb-2">
          <FormGroup row>
            <Label sm={2} >Filtrar por</Label>
            <Col sm={10}>
              <Input type="select" name="filter">
                <option>Selecione</option>
                <option value="SAUDE">Saúde</option>
                <option value="EDUCACAO">Educação</option>
                <option value="ASSISTENCIASOCIAL">Assistência Social</option>
                <option value="ADMINISTRACAO">Administração</option>
                <option value="URBANISMO">Urbanismo</option>
              </Input>
            </Col>
          </FormGroup>
        </div>
        <div className="mb-2">
          <FormGroup row>
            <Label sm={2}>Ordenar por</Label>
            <Col sm={10}>
              <Input type="select" name="sort">
                <option>Selecione</option>
                <option value="RECENTE">Mais recente</option>
                <option value="ANTIGO">Mais antigo</option>
              </Input>
            </Col>
          </FormGroup>
        </div>
      </div>
    )
  }
}

export default class Obras extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid row d-flex justify-content-center">
        <div className="row col-sm-6">
          <Card className="mt-3">
            <CardHeader>
              <CardTitle className="text-center" tag="h5">Selecione uma obra</CardTitle>
              <Filtros />
            </CardHeader>
            <CardBody>
              <ListaObras/>
            </CardBody>
          </ Card>
        </div>
      </div>
    )
  }
}
