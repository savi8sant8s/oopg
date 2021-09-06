import { Component } from "react";
import {
    Navbar,
    Container,
    Nav,
} from "react-bootstrap";
import Avaliacao from "./Avaliacao";

const styles = {
    bg: {
        background: "#ff2b32c4"
    }
};

export default class Menu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const styles = {
            backgroundColor: "#960001",
            backgroundImage: "linear-gradient(315deg, #ed2939, #dc143c)"
          };
        return (
            <>
            <Navbar style={styles} expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/">
                        
                        <label className="text-light text-wrap" style={{marginLeft:"15px"}}>OOPG</label>
                    </Navbar.Brand>
                    <Navbar.Toggle className="bg-light" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav className="nav navbar-nav ml-auto">
                            <Nav.Link className="text-light" href="/">Início</Nav.Link>
                            <Nav.Link className="text-light" href="/noticias">Notícias</Nav.Link>
                            <Nav.Link className="text-light" href="/obras?ordenar=recente">Todas as obras</Nav.Link>
                            <Nav.Link className="text-light" href="/mapa">Mapa do observatório</Nav.Link>
                            <Nav.Link className="text-light" href="/sobre">Sobre</Nav.Link>
                            <Nav.Link className="text-light" href="/termos">Termos</Nav.Link>
                            <Nav.Link className="text-light" href="/admin/login">Admin</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Avaliacao/>
            </>
        )
    }
}