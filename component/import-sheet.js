import { Component } from "react";
import readXlsxFile from 'read-excel-file'

export default class ImportSheet extends Component {

  constructor(props) {
    super(props);
    this.onReadSheet = this.onReadSheet.bind(this);
  }

  onReadSheet(event) {
    readXlsxFile(event.target.files[0]).then((rows) => {
      rows = this.removeBlankRows(rows);
      //rows = this.removeRowsWithDescription(rows);
      //rows = this.transformBlankFieldToNull(rows);
      //rows = this.transformArrayArrayToArrayObject(rows);
      console.log(rows)
    });
  }

  removeBlankRows(rows){
    return rows.filter((row)=>{
      if (row[0] != null){
        return true;
      }
    });
  }

  transformBlankFieldToNull(rows){
    let regex = new RegExp(/^[-]{4,}$/);
    for(let x = 0; x < rows.length; x++){
      for(let y = 0; y < rows[x].length; y++){
        if (regex.test(rows[x][y])){
          rows[x][y] = null;
        }
      }
    }
    return rows;
  }

  transformArrayArrayToArrayObject(rows){
    for(let x = 0; x < rows.length; x++){
      rows[x] = {
        numeroLicitacao: rows[x][0],                    
        descricao: rows[x][1],                           
        convenioNumeroAno: rows[x][2],                   
        convenioConcedente: rows[x][3],                 
        convenioRepasse: rows[x][4],                     
        convenioContrapartida: rows[x][5],               
        contratadoCpfCcnpj: rows[x][6],                  
        contratadoRazaoSocial: rows[x][7],               
        contratoNumeroAno: rows[x][8],                   
        contratoDataInicio: rows[x][9],                  
        contratoPrazo: rows[x][10],                       
        contratoValorContratado: rows[x][11],             
        contratoDataConclusaoOuParalizacao: rows[x][12],               
        aditivoPrazoAditado: rows[x][13],                 
        aditivoValorAditadoAcumulado: rows[x][14],        
        execucaoReajuste: rows[x][15],                    
        execucaoNaturezaDespesa: rows[x][16],             
        execucaoValorMedidoAcumulado: rows[x][18],        
        execucaoValorPagoAcumuladoPeriodo: rows[x][19],   
        execucaoValorPagoAcumuladoExercicio: rows[x][20], 
        valorPagoAcumulado: rows[x][21],
        situacao: rows[x][22]         
      };
    }
    return rows;          
  }

  removeRowsWithDescription(rows){
    let regex = new RegExp(/^[0-9]{3}\/[0-9]{4}$/);
    return rows.filter((row)=>{
      if (regex.test(row[8])){
        return true;
      }
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