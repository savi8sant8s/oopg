import { Component } from "react";
import Footer from "../component/footer";
import Menu from "../component/menu";

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
