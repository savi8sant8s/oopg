import axios from "axios";
import { Component } from "react";
import {
    ListGroup,
    ListGroupItem,
    Container,
    Col,
    Row,
    Card
} from 'react-bootstrap';
import Swal from "sweetalert2";
import { mostraCarregamento } from "../services/alerta-padrao";

export default class Sobre extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noticias: []
        }
    }
    async componentDidMount() {
        mostraCarregamento();
        let { data } = await axios.get("api/v1/public/noticias");
        this.setState({ noticias: data.noticias });
        Swal.close();
    }

    render() {
        return (
            <Container fluid="sm" className="text-center p-5">
                <h3>Notícias referentes as obras da cidade de Garanhuns</h3>
                <Card>
                    <ListGroup variant="flush" className="mt-5">
                        {this.state.noticias.map((noticia, x) =>
                            <ListGroupItem action href={noticia.link} key={x}>
                                <Row>
                                    <Col sm="8">
                                        <img width="200px" src={noticia.imagemUrl} />
                                    </Col>
                                    <Col sm="4">
                                        <h4>{noticia.titulo}</h4>
                                        <p>{noticia.mensagem}</p>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        )}
                    </ListGroup>
                </Card>

            </Container>
        )
    }
}