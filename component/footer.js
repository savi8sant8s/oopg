import { Component } from "react";
import style from '../styles/style1.module.css';

export default class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className={style.bg1 + " navbar navbar-expand-lg justify-content-center navbar-light"}>                    
                    <a className="navbar-brand style: margin-right=1rem; text-white" href="#">Todos os direitos reservados.</a>                 
                </nav>
            </div>
        )
    }
}