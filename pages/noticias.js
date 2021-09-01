import axios from "axios";
import { Component } from "react";
import {Card, CardImg, CardBody, CardTitle, Button} from 'reactstrap';

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
            <div style={styles.list}>
                {this.state.noticias.map((noticia, x) =>
                    <Card key={x}>
                        <CardImg style={{ maxwidth: "100%", height: "400px", objectFit: "contain" }} src={noticia.imagemUrl} alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h4">{noticia.titulo}</CardTitle>
                            <p>{noticia.mensagem}</p>
                            <Button target="_blank" href={noticia.link}>Veja Mais</Button>
                        </CardBody>
                    </Card>
                )}
            </div>

        )
    }
}