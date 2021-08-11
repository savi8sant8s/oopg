import { Component } from "react";
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const styles = {
    list: {
        border: "2px",
        marginTop: "3rem",
        overflow: "auto",
        maxHeight: "720px",
        alignContent: "center",
        fontSize: "20px",
        textAlign: "center"
    }
}

export default class Sobre extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div style={styles.list}>
                <Card>
                    <CardImg style={{ maxwidth: "100%",  height: "400px", objectFit: "contain" }} src="https://garanhuns.pe.gov.br/gid/wp-content/uploads/2021/08/WhatsApp-Image-2021-08-06-at-15.08.16-1200x720.jpeg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h4">Prefeitura faz plantio de mudas arbóreas às margens da BR 423, em parceria com empresas privadas</CardTitle>
                        <Button target="_blank" href="https://garanhuns.pe.gov.br/prefeitura-faz-plantio-de-mudas-arboreas-as-margens-da-br-423-em-parceria-com-empresas-privadas/">Veja Mais</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg style={{ maxwidth: "100%",  height: "400px", objectFit: "contain" }} src="https://garanhuns.pe.gov.br/gid/wp-content/uploads/2021/08/WhatsApp-Image-2021-08-06-at-12.21.02-600x424.jpeg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h4">Prefeitura reúne produtores do setor da indústria alimentícia de Garanhuns</CardTitle>
                        <Button target="_blank" href="https://garanhuns.pe.gov.br/prefeitura-reune-produtores-do-setor-da-industria-alimenticia-de-garanhuns/">Veja Mais</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg style={{ maxwidth: "100%",  height: "400px", objectFit: "contain" }} src="https://garanhuns.pe.gov.br/gid/wp-content/uploads/2021/08/BORA-VACINAR-22-600x424.jpeg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h4">Prefeitura de Garanhuns amplia vacinação para pessoas a partir de 22 anos de idade</CardTitle>
                        <Button target="_blank" href="https://garanhuns.pe.gov.br/prefeitura-de-garanhuns-amplia-vacinacao-para-pessoas-a-partir-de-22-anos-de-idade/">Veja Mais</Button>
                    </CardBody>
                </Card>
            </div>

        )
    }
}