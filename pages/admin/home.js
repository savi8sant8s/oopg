import { Component } from "react";
import ImportSheet from "../../component/import-sheet";

export default class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ImportSheet />
      </div>
    )
  }
}
