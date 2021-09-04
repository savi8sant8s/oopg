import { Component } from "react";
import {
    Navbar,
    Container,
    Nav,
} from "react-bootstrap";

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
        return (
            <Navbar style={styles.bg} expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img src="/logo.png" alt="" width="40" height="34" />
                        <label className="text-light text-wrap">OOPG</label>
                    </Navbar.Brand>
                    <Navbar.Toggle className="bg-light" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
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
        )
    }
}