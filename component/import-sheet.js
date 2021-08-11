import { Component } from "react";
import readXlsxFile from 'read-excel-file'

export default class ImportSheet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countConstructions: 0
    }
    this.onReadSheet = this.onReadSheet.bind(this);
  }

  onReadSheet(event) {
    readXlsxFile(event.target.files[0]).then((rows) => {
      rows = rows.slice(1,rows.length+1);
      rows = this.transformToArrayObject(rows);
      this.setState({countConstructions: rows.length});
    });
  }

  transformToArrayObject(rows){
    let arrayObject = [];
    for(let x = 0; x < rows.length; x++){
      arrayObject[x] = {
        numeroLicitacao: rows[x][0],
        descricao: rows[x][1], 
        convenioNumeroAno: rows[x][2], 
        convenioConcedente: rows[x][3],
        convenioRepasse: rows[x][4], 
        convenioContrapartida: rows[x][5], 
        contratadoCpfCnpj: rows[x][6], 
        contratadoRazaoSocial: rows[x][7], 
        contratoNumeroAno: rows[x][8], 
        contratoDataInico: rows[x][9], 
        contratoPrazo: rows[x][10], 
        contratoValorContratado: rows[x][11], 
        contratoDataConclusao: rows[x][12], 
        aditivoPrazoAditado: rows[x][13], 
        aditivoValorAditado: rows[x][14], 
        execucaoReajuste: rows[x][15],
        execucaoNaturezaDespesa: rows[x][16], 
        execucaoValorMedidoAcumulado: rows[x][17],
        execucaoValorPagoAcumuladoPeriodo: rows[x][18], 
        execucaoValorPagoAcumuladoExercicio: rows[x][19], 
        valorPagoAcumuladoObra: rows[x][20],
        situacao: rows[x][21],
        categoria: rows[x][22]
      }
    }
    return arrayObject;
  }
  render() {
    return (
      <div className="form-group">
        <label>Selecione um arquivo:</label>
        <input id="file" accept=".xlsx" onChange={this.onReadSheet} type="file" className="form-control-file" />
        {this.state.countConstructions != 0 ?
          <p>{this.state.countConstructions} obras.</p>
          :
          <></>
        }
      </div>
    )
  }
}