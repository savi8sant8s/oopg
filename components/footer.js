import { Component } from "react";

export default class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="page-footer font-small blue pt-5 mt-5">
                <div className="footer-copyright text-center py-3"><p>© 2021 Todos os direitos reservados.</p>
                    Baseado no Modelo para Observatório de Projetos <a href="https://sol.sbc.org.br/index.php/cbsoft_estendido/article/download/7654/7531/">GP2, Cin-UFPE.</a>
                </div>
            </footer>
        )
    }
}