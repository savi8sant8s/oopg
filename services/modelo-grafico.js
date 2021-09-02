
export default class ModeloGrafico {
  
  obrasPorSituacao(json) {
    let tabela = [['Situação', 'Total de obras']];
    tabela.push(["Concluídas", json.quantConcluidas]);
    tabela.push(["Em andamento", json.quantAndamento]);
    tabela.push(["Paralizadas", json.quantParalizadas]);
    return {
      titulo: "Quantidade de obras por situação",
      tipo: "PieChart",
      data: tabela,
      options: { is3D: true }
    }
  }

  obrasPorCategoria(json) {
    let tabela = [['Categoria', 'Total']];
    tabela.push(["Administração", json.quantAdministracao]);
    tabela.push(["Ass. Social", json.quantAssistenciaSocial]);
    tabela.push(["Educação", json.quantEducacao]);
    tabela.push(["Saúde", json.quantSaude]);
    tabela.push(["Urbanismo", json.quantUrbanismo]);
    return {
      titulo: "Quantidade de obras por categoria",
      tipo: "PieChart",
      data: tabela,
      options: { pieHole: 0.4 }
    }
  }

  obrasPorAno(json) {
    let tabela = [['Ano', 'Total']];
    json.obrasPorAno.map((x) => {
      let linha = Object.values(x);
      linha[0] = String(linha[0]);
      tabela.push(linha);
    });
    return {
      titulo: "Quantidade de obras por ano",
      tipo: "Bar",
      data: tabela,
      options: {}
    }
  }

  gastoObrasPorAno(json) {
    let tabela = [['Ano', 'Total gasto']];
    json.gastoAnual.map((x) => {
      let linha = Object.values(x);
      linha[0] = String(linha[0]);
      tabela.push(linha);
    });
    return {
      titulo: "Gasto anual de obras",
      tipo: "Bar",
      data: tabela,
      options: {}
    }
  }
}
