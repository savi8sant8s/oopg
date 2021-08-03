import { Component } from "react";
import readXlsxFile from 'read-excel-file'

export default class ImportSheet extends Component {

  constructor(props) {
    super(props);
    this.onReadSheet = this.onReadSheet.bind(this);
  }

  onReadSheet(event) {
    readXlsxFile(event.target.files[0]).then((rows) => {
      console.log(rows);
    });
  }

  render() {
    return (
      <div className="form-group">
        <label>Selecione um arquivo</label>
        <input id="file" accept=".xlsx" onChange={this.onReadSheet} type="file" className="form-control-file" />
      </div>
    )
  }
}