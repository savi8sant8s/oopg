import { Component } from "react";
import style from '../styles/style1.module.css';

export default class Menu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                 <nav className={ style.bg1 + " navbar navbar-expand-md navbar-light"}>
                <img className="m-lg-2" src="/logo1.png" alt="" width="30" height="24"/>
                    <h4 className="mt-2 m-lg-2">OOPG</h4>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className= "collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item ">
                                <a className="nav-link text-white" href="#">Página Inicial</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Todas as Obras</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Mapa do Observatório</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Sobre</a>
                            </li>
                            <li className="nav-item">
                            <img className="m-xl-2" src="/adm.png" alt="" width="18" height="25"/>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}