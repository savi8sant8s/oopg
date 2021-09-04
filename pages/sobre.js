import { Component } from "react";
import {
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  Image,
  Row,
  Col
} from 'react-bootstrap';

export default class Sobre extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid="sm" className="p-5">
        <h3 className="text-center">Sobre o projeto</h3>
        <Card className="mt-5 text-justify p-3">
          <p>O projeto consiste na construção de um observatório das obras públicas realizadas na cidade de Garanhuns-PE,
            onde oferece à população da cidade, informações relevantes sobre as obras realizadas no período de 2017 a 2020 na cidade,
            bem como uma sessão de comentários públicos em cada obra visando empoderar o público a serem testemunhas e fiscalizadores
            das mesmas. Através de uma efetiva forma de coleta dos dados, registro de novos dados e homologação do sistema construído,
            é possível utilizar as informações para guiar obras futuras e dar transparência a tais empreitadas que são de extrema
            importância para o crescimento da cidade.
          </p>
          <p>
            O Grupo de Pesquisa em Gestão de
            Projetos (GP2) do Centro de Informática (CIn) da Universidade Federal de
            Pernambuco (UFPE), nos últimos anos, tem dedicado esforços para o
            desenvolvimento de pesquisas relacionadas à temática observatórios, em
            especial, aos observatórios aplicados ao contexto dos projetos. Neste contexto,
            um modelo conceitual para apoiar na compreensão e no desenvolvimento de
            observatórios de projetos está sendo desenvolvido pelo GP2 (VIEIRA, FARIAS
            JUNIOR E MOURA, no prelo). Este projeto de extensão fará uso dos conhecimentos
            produzidos pelas pesquisas desenvolvidas pelo GP2, e os resultados alcançados a
            partir da execução deste projeto poderão ser utilizados como insumos para o
            desenvolvimento de novas pesquisas.
          </p>
        </Card>
        <h3 className="text-center mt-5">Equipe</h3>
          <ListGroup className="mt-5 p-3" variant="flush">
            <ListGroupItem>
              <Row>
                <Col sm="1">
                  <Image height="60px" src="https://avatars.githubusercontent.com/u/50916242?v=4" roundedCircle />
                </Col>
                <Col sm="11" className="m-auto">
                  Brenoly Porto
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col sm="1">
                  <Image height="60px" src="https://avatars.githubusercontent.com/u/61158693?v=4" roundedCircle />
                </Col>
                <Col sm="11" className="m-auto">
                  Edgleyson Ferreira
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col sm="1">
                  <Image height="60px" src="https://avatars.githubusercontent.com/u/50780673?v=4" roundedCircle />
                </Col>
                <Col sm="11" className="m-auto">
                  Sávio Santos
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
          <div className="d-flex justify-content-end">
          <p className="mt-3"><small>*Estudantes de Bacharelado em Engenharia de Software - UPE Garanhuns</small></p>
          </div>
      </Container>
    )
  }
}
