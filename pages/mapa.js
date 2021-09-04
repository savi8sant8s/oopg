import { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';

export default class Mapa extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid="sm" className="p-5">
        <h3 className="text-center">Navegue pelo Observatório</h3>
        <div className="mt-5" style={{ borderBottom: "solid 4px" }}>
          <h4><b>Menu</b></h4>
        </div>
        <ListGroup variant="flush">
          <ListGroupItem action href="/"><b>Página inicial</b></ListGroupItem>
          <ListGroupItem action href="/obras?ordenar=recente"><b>Todas as obras</b></ListGroupItem>
          <ListGroupItem>
            <ListGroup variant="flush">
              <ListGroupItem action href={"/obras?ordenar=recente&categoria=saude"}>Saúde</ListGroupItem>
              <ListGroupItem action href={"/obras?ordenar=recente&categoria=educacao"}>Educação</ListGroupItem>
              <ListGroupItem action href={"/obras?ordenar=recente&categoria=assistenciasocial"}>Assistência Social</ListGroupItem>
              <ListGroupItem action href={"/obras?ordenar=recente&categoria=administracao"}>Administração</ListGroupItem>
              <ListGroupItem action href={"/obras?ordenar=recente&categoria=urbanismo"}>Urbanismo</ListGroupItem>
            </ListGroup>
          </ListGroupItem>
          <ListGroupItem action href="/mapa"><b>Mapa do Observatório</b></ListGroupItem>
          <ListGroupItem action href="/sobre"><b>Sobre</b></ListGroupItem>
          <ListGroupItem action href="/admin/login"><b>Administrador</b></ListGroupItem>
        </ListGroup>
      </Container>
    )
  }
}
