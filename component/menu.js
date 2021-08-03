import { Component } from "react";
import style from '../styles/style1.module.css';

export default class Menu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                 <nav class={ style.bg1 + " navbar navbar-expand-md navbar-light"}>
                <img className="m-lg-2" src="/logo1.png" alt="" width="30" height="24"/>
                    <h4 className="mt-2 m-lg-2">OOPG</h4>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class= "collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto ">
                            <li class="nav-item ">
                                <a class="nav-link text-white" href="#">Página Inicial</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#">Todas as Obras</a>
                            </li>
                        </ul>
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#">Mapa do Observatório</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#">Sobre</a>
                            </li>
                            <li class="nav-item">
                            <img className="m-xl-2" src="/adm.png" alt="" width="18" height="25"/>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}