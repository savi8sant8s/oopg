import axios from "axios";
import { Component } from "react";
import {
    Button, 
    ListGroup, 
    ListGroupItem,
    Container
} from 'reactstrap';

export default class Sobre extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noticias: []
        }
    }
    async componentDidMount(){
        let {data} = await axios.get("api/v1/public/noticias");
        this.setState({noticias: data.noticias});
    }

    render() {
        return (
            <div className="container-fluid d-flex justify-content-center text-center">
                <div className="row col-sm-8">
                    <Container className="mt-5">
                        <h3>Notícias referentes as obras da cidade de Garanhuns</h3>
                        <ListGroup>
                            {this.state.noticias.map((noticia, x) =>
                                <ListGroupItem key={x}>
                                    <img width="200px" src={noticia.imagemUrl} />
                                    <h4>{noticia.titulo}</h4>
                                    <p>{noticia.mensagem}</p>
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </Container>
                </div>
            </div>
        )
    }
}