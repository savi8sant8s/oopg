import { Component } from "react";
import style from '../styles/style1.module.css';


export default class Categorias extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="card text-center">
                    <div className="card-header" >
                        <h4 className={style.title2}>selecionar categoria</h4>
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-around">
                            <div className="card card-box m-3">
                                <libel className={" center"} >Saúde</libel>
                            </div>
                            <div className="card card-box m-3">
                                <libel className="center">Educação</libel>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around">
                            <div className="card card-box m-3">
                                <libel className="center">Assistência Social</libel>
                            </div>
                            <div className="card card-box m-3">
                                <libel className="center">Administração</libel>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around">
                            <div className="card card-box m-3">
                                <libel className="center">Urbanismo</libel>
                            </div>
                            <div className="card card-box m-3">
                                <libel className="center">Todas</libel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}