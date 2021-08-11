import { Component } from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
export default class Sobre extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
        <Card className="ms-3 mx-3">
          <CardBody>
            <CardTitle className="text-center" tag="h5">Sobre o Observatório de obras públicas de Garanhuns</CardTitle>
            <CardText className="text-justify">  O projeto consiste na construção de um observatório das obras públicas realizadas na cidade de Garanhuns-PE, 
              onde oferece à população da cidade, informações relevantes sobre as obras realizadas no período de 2017 a 2020 na cidade, 
              bem como uma sessão de comentários públicos em cada obra visando empoderar o público a serem testemunhas e fiscalizadores 
              das mesmas. Através de uma efetiva forma de coleta dos dados, registro de novos dados e homologação do sistema construído, 
              é possível utilizar as informações para guiar obras futuras e dar transparência a tais empreitadas que são de extrema 
              importância para o crescimento da cidade.
              </CardText>
              <CardText className="text-justify">
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
              </CardText>
          </CardBody>
        </Card>
        </div>
      </div>
    )
  }
}
