import { Component } from "react";
import style from '../styles/style1.module.css';


export default class Categorias extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div class="card text-center">
                    <div class="card-header" >
                        <h4 className={style.title2}>selecionar categoria</h4>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-around">
                            <div class="card card-box m-3">
                                <libel className={style.title2 + " center"} >Saúde</libel>
                            </div>
                            <div class="card card-box m-3">
                                <libel class="center">Educação</libel>
                            </div>
                        </div>
                        <div class="d-flex justify-content-around">
                            <div class="card card-box m-3">
                                <libel class="center">Assistência Social</libel>
                            </div>
                            <div class="card card-box m-3">
                                <libel class="center">Administração</libel>
                            </div>
                        </div>
                        <div class="d-flex justify-content-around">
                            <div class="card card-box m-3">
                                <libel class="center">Urbanismo</libel>
                            </div>
                            <div class="card card-box m-3">
                                <libel class="center">Todas</libel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}