import { Component } from "react";
import ImportSheet from "../components/import-sheet";

export default class App extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        Importar planilha
        <ImportSheet />
      </div>
    )
  }
}
