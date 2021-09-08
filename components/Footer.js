import { Component } from "react";

export default class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const styles = {
            background: "linear-gradient(315deg, #ed2939, #dc143c)",
            color:"white"
          };

        return (
            <footer style={{paddingTop:"100px"}}>
                <div  className="text-center py-3"><p style={{marginBottom:"1px"}}>© 2021 Todos os direitos reservados.</p>
                    Baseado no Modelo para Observatório de Projetos <a style={{color:"red"}} href="https://sol.sbc.org.br/index.php/cbsoft_estendido/article/download/7654/7531/">GP2, Cin-UFPE.</a>
                </div>
            </footer>
        )
    }
}