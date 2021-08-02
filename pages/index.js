import { Component } from "react";
import Categorias from "../component/categorias";
import Dashboard from "../component/dashboard";
import Footer from "../component/footer";
import Menu from "../component/menu";
import NewsSlide from "../component/news-slide";

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Menu />
        <div class="alert alert-warning" role="alert">
          <p class="text-center"><a href="#" class="alert-link text-center">Avalie o Observatório.</a></p>
        </div>
        <NewsSlide />
        <div class="d-flex justify-content-around mt-3 mb-2">
          <Categorias />
          <Dashboard />
        </div>
        <Footer/>
      </div>
    )
  }
}
