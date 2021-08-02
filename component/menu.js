import { Component } from "react";

export default class Menu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg justify-content-end navbar-light bg-light">
                    <img src="https://i.imgur.com/buhRjZh.jpeg" class="mr-1" width="30" height="30"></img>
                    <a class="navbar-brand style: margin-right=1rem;" href="#">OOPG</a>
                    <ul class="nav">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Todas as obras</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Mapa do Observatório</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Sobre</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}