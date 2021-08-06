import { Component } from "react";
import Categorias from "../component/categorias";
import Dashboard from "../component/dashboard";
import LoginCliente from "../component/login-cliente";
import NewsSlide from "../component/news-slide";
import style from '../styles/style1.module.css';

export default class paginainicial extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bg-dark">
        <LoginCliente />
        <div className={style.divavaliarobservatorio + " alert alert-warning border-0"} role="alert">
          <p className=" text-center"><a href="#" className="alert-link text-center text-white">Avalie o Observatório.</a></p>
        </div>
        
        <NewsSlide />
        <div className="d-flex justify-content-around mt-3 mb-2">
          <Categorias />
          <Dashboard />
        </div>
      </div>
    )
  }
}
