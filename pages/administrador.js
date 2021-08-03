import { Component } from "react";
import Categorias from "../component/categorias";
import Dashboard from "../component/dashboard";
import Footer from "../component/footer";
import Menu from "../component/menu";
import NewsSlide from "../component/news-slide";

export default class administrador extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Menu />
        <div>
          aqui
        </div>
        <Footer/>
      </div>
    )
  }
}
