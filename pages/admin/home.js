import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavLink,
  Card,
  CardHeader,
  CardBody,
  Button,
  FormGroup,
  Label,
  Input,
  Table,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { TiDelete } from "react-icons/ti";
import { AiOutlineInfoCircle } from "react-icons/ai";
import readXlsxFile from 'read-excel-file';
import axios from 'axios';
import { schema } from '../../services/schemas';
import { mostrarAlerta } from '../../services/alerta-padrao';
import { formVazio } from "../../services/form-vazio";
import Swal from 'sweetalert2';
import { STATUS } from '../../services/codigo-status';

class ImportarPlanilha extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countConstructions: 0,
      constructions: []
    }
    this.onReadSheet = this.onReadSheet.bind(this);
    this.onCadastrarObras = this.onCadastrarObras.bind(this);
  }

  async onCadastrarObras() {
    let corpo = this.state.constructions;
    schema.obras.validate(corpo).then(() => {
      Swal.showLoading();
      let token = sessionStorage.getItem("oopgV1Token");
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      axios.post("/api/v1/private/obras", corpo, config).then((res) => {
        Swal.hideLoading();
        let resposta = res.data;
        switch (resposta.status) {
          case STATUS.OBRA.CRIADAS_SUCESSO:
            mostrarAlerta('Sucesso', 'Obras cadastradas com sucesso.');
            break;
          case STATUS.ERRO.PROBLEMA_INESPERADO:
            mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
            break;
          case STATUS.SESSAO.TOKEN_INDEFINIDO:
            mostrarAlerta('Token não definido', 'Contate o mantenedor do site.');
            sessionStorage.removeItem("oopgV1Token");
            window.location.href = "/admin/login";
            break;
          case STATUS.ADMIN.NAO_REALIZOU_PRIMEIRO_ACESSO:
            mostrarAlerta('Acesso não permitido', 'Você ainda não realizou o primeiro acesso.');
            sessionStorage.removeItem("oopgV1Token");
            window.location.href = "/admin/login";
            break;
          case STATUS.CORPO.CAMPOS_INCORRETOS:
            mostrarAlerta('Campos incorretos', 'Verifique o preenchimento dos campos.');
            break;
          case STATUS.SESSAO.TOKEN_INVALIDO:
            mostrarAlerta('Token inválido', 'Faça login novamente.');
            sessionStorage.removeItem("oopgV1Token");
            window.location.href = "/admin/login";
            break;
          default:
            mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
        }
      }).catch(() => {
        mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
      });
    }).catch((erro) => {
      console.log(erro);
      this.onIndicarPreenchimentoCorreto(erro, corpo);
    });
  }

  onIndicarPreenchimentoCorreto(erro, corpo) {
    if (formVazio(corpo)) {
      mostrarAlerta('Formulário não preenchido', 'Digite email e senha.');
    }
    else if (erro.path) {
      mostrarAlerta('Campo incorreto','Existe algum campo na planilha preenchido de forma incorreta.');
    }
  }

  onReadSheet(event) {
    readXlsxFile(event.target.files[0]).then((rows) => {
      rows = rows.slice(1,rows.length+1);
      rows = this.transformToArrayObject(rows);
      this.setState({countConstructions: rows.length});
      this.setState({constructions: rows});
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
        valorPagoAcumulado: rows[x][20],
        situacao: rows[x][21],
        categoria: rows[x][22]
      }
    }
    return arrayObject;
  }

  render() {
    return (
      <>
      <div className="form-group text-center mt-5">
        <label>Selecione um arquivo:</label>
        <input id="file" accept=".xlsx" onChange={this.onReadSheet} type="file" className="form-control-file" />
      </div>
      {this.state.countConstructions != 0 ?
        <>
         <Button className="mt-5" onClick={this.onCadastrarObras}>Cadastrar {this.state.countConstructions} obras</Button>
        </>
         :
         <>
         <Card className="mt-5">
             <CardHeader>
               <AiOutlineInfoCircle size="30px" color="black" />
               <br></br><label style={{ color: "black" }}>Observação</label>
             </CardHeader>
             <CardBody>
               <p className="text-justify">
                 É necessário seguir o modelo abaixo em Excel para cadastro das obras em massa.
               </p>
               <a href="../Modelo de planilha de informações de obras públicas.xlsx" download target="_blank">Baixar modelo em Excel</a>
             </CardBody>
           </Card>
         </>
       }
       </>
    )
  }
}

class AdminCriar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      email: "",
      funcao: ""
    };
    this.onManipularMudanca = this.onManipularMudanca.bind(this);
    this.onCadastrar = this.onCadastrar.bind(this);
  }

  onManipularMudanca(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onIndicarPreenchimentoCorreto(erro, corpo) {
    if (formVazio(corpo)) {
      mostrarAlerta('Formulário não preenchido', 'Digite o nome, funcão e email.');
    }
    else if (erro.path == "nome") {
      mostrarAlerta('Nome inválido', 'O nome deve possuir entre 5 e 30 caracteres, sem números ou caracteres especiais.');
    }

    else if (erro.path == "funcao") {
      mostrarAlerta('Função inválida', 'Selecione uma função');
    }
    else if (erro.path == "email") {
      mostrarAlerta('Email inválido', 'Ex.: fulano@email.com.');
    }
}

  onCadastrar() {
    let corpo = { nome: this.state.nome, funcao: this.state.funcao, email: this.state.email }
    let token = sessionStorage.getItem("oopgV1Token");
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
    schema.admin.validate(corpo).then(() => {
      Swal.showLoading();
      axios.post("/api/v1/private/admin", corpo, config).then((res) => {
        Swal.hideLoading();
        let resposta = res.data;
        switch (resposta.status) {
          case STATUS.ADMIN.CRIADO_SUCESSO:
            mostrarAlerta("Admin cadastrado com sucesso", `Senha temporária: ${resposta.primeiroAcesso.senhaTemporaria}`);
            window.location.reload();
            break;
          case STATUS.ADMIN.JA_CADASTRADO:
            mostrarAlerta('Admin já cadastrado', 'Este Admin já está cadastrado.');
            break;
          case STATUS.ADMIN.NAO_REALIZOU_PRIMEIRO_ACESSO:
            mostrarAlerta('Admin não realizou o primeiro acesso', 'Este Admin não realizou o primeiro acesso.');
            break;
          case STATUS.SESSAO.TOKEN_INVALIDO:
            mostrarAlerta('Token inválido', 'Token inválido');
            sessionStorage.removeItem("oopgV1Token");
            window.location.href = "/admin/login";
            break;
          case STATUS.SESSAO.TOKEN_INDEFINIDO:
            mostrarAlerta('Token não definido', 'Contate o mantenedor do site.');
            sessionStorage.removeItem("oopgV1Token");
            window.location.href = "/admin/login";
            break;
          case STATUS.ADMIN.OPERACAO_NAO_PERMITIDA:
            mostrarAlerta('Operação não permitida', 'Não é possível manipular admin');
            break;
          case STATUS.CORPO.CAMPOS_INCORRETOS:
            mostrarAlerta('Campos incorretos', 'Verifique o preenchimento do formulário.');
            break;
          default:
            mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
        }
      }).catch(() => {
        mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
      });
    }).catch((erro) => {
      this.onIndicarPreenchimentoCorreto(erro, corpo);
    });
  }

  render() {
    return (
      <>
        <FormGroup className="mb-2">
          <Label>Nome:</Label>
          <Input onChange={this.onManipularMudanca} value={this.state.nome} type="text" name="nome" />
        </FormGroup>
        <FormGroup className="mb-2">
          <Label>Email:</Label>
          <Input onChange={this.onManipularMudanca} value={this.state.email} type="email" name="email" />
        </FormGroup>
        <FormGroup className="mb-2">
          <Label>Função</Label>
          <Input onChange={this.onManipularMudanca} value={this.state.funcao} type="select" name="funcao">
            <option>Selecione</option>
            <option value="SUPORTE">Suporte</option>
            <option value="GERAL">Geral</option>
          </Input>
        </FormGroup>
        <div className="mt-3 text-center">
          <Button onClick={this.onCadastrar} color="primary" size="lg">Criar</Button>
        </div>
      </>
    )
  }
}

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      admins: []
    }
    this.onPegarAdmins = this.onPegarAdmins.bind(this);
    this.onDeletarAdmin = this.onDeletarAdmin.bind(this);
    this.onMostrarModal = this.onMostrarModal.bind(this);
  }

  componentDidMount(){
    this.onPegarAdmins();
  }

  onMostrarModal(){
    this.setState({modal: !this.state.modal});
  }

  onDeletarAdmin(id, nome){
    Swal.fire({
      title: `Deseja realmente deletar o Admin ${nome}?`,
      showCancelButton: true,
      confirmButtonText: `Deletar Admin`,
      cancelButtonText: `Agora não`,
    }).then((result) => {
      if (result.isConfirmed) {
        let token = sessionStorage.getItem("oopgV1Token");
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
          Swal.showLoading();
          axios.delete(`/api/v1/private/admin/${id}`, config).then((res) => {
            Swal.hideLoading();
            let resposta = res.data;
            switch (resposta.status) {
              case STATUS.ADMIN.DELETADO_SUCESSO:
                mostrarAlerta("Sucesso", "Admin deletado com sucesso");
                window.location.reload();
                break;
              case STATUS.ADMIN.NAO_EXISTE:
                mostrarAlerta('Admin não existe', 'Este Admin não existe.');
                break;
              case STATUS.ADMIN.NAO_REALIZOU_PRIMEIRO_ACESSO:
                mostrarAlerta('Admin não realizou o primeiro acesso', 'Este Admin não realizou o primeiro acesso.');
                break;
              case STATUS.SESSAO.TOKEN_INVALIDO:
                mostrarAlerta('Token inválido', 'Token inválido');
                sessionStorage.removeItem("oopgV1Token");
                window.location.href = "/admin/login";
                break;
              case STATUS.SESSAO.TOKEN_INDEFINIDO:
                mostrarAlerta('Token não definido', 'Contate o mantenedor do site.');
                sessionStorage.removeItem("oopgV1Token");
                window.location.href = "/admin/login";
                break;
              case STATUS.ADMIN.OPERACAO_NAO_PERMITIDA:
                mostrarAlerta('Operação não permitida', 'Não é possível manipular admin');
                break;
              case STATUS.CORPO.CAMPOS_INCORRETOS:
                mostrarAlerta('Campos incorretos', 'Verifique o preenchimento do formulário.');
                break;
              default:
                mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
            }
          }).catch((e) => {
            console.log(e)
            mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
          });
      } 
    })
  }

  onPegarAdmins(){
    let token = sessionStorage.getItem("oopgV1Token");
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
      Swal.showLoading();
      axios.get(`/api/v1/private/admins`, config).then((res) => {
        Swal.hideLoading();
        let resposta = res.data;
        switch (resposta.status) {
          case STATUS.ADMIN.SUCESSO:
            this.setState({admins: resposta.admins});
            break;
          case STATUS.ADMIN.NAO_REALIZOU_PRIMEIRO_ACESSO:
            mostrarAlerta('Admin não realizou o primeiro acesso', 'Este Admin não realizou o primeiro acesso.');
            break;
          case STATUS.SESSAO.TOKEN_INVALIDO:
            mostrarAlerta('Token inválido', 'Token inválido');
            sessionStorage.removeItem("oopgV1Token");
            window.location.href = "/admin/login";
            break;
          case STATUS.SESSAO.TOKEN_INDEFINIDO:
            mostrarAlerta('Token não definido', 'Contate o mantenedor do site.');
            sessionStorage.removeItem("oopgV1Token");
            window.location.href = "/admin/login";
            break;
          default:
            mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
        }
      }).catch(() => {
        mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
      });
  }

  render() {
    return (
      <>
        <Button size="lg" onClick={()=>{this.onMostrarModal()}}>Novo admin</Button>
        <Table className="mt-5">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Função</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.admins.map((admin, x) =>
              <tr key={x}>
                <td>{admin.nome}</td>
                <td>{admin.email}</td>
                <td>{admin.funcao}</td>
                <td>
                  <TiDelete onClick={() => { this.onDeletarAdmin(admin.id, admin.nome) }} className="m-2" size="20" />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Modal isOpen={this.state.modal} toggle={this.onMostrarModal}>
        <ModalHeader>Criar administrador</ModalHeader>
        <ModalBody>
          <AdminCriar />
        </ModalBody>
      </Modal>
        </>
    )
  }
}

export default class AdminHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: "1"
    };
    this.onDefinirTabAtual = this.onDefinirTabAtual.bind(this)
  }

  onDefinirTabAtual(tab) {
    this.setState({ tab: tab })
  }

  onLogout() {
    let token = sessionStorage.getItem("oopgV1Token");
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
    Swal.fire({
      title: 'Deseja realmente sair?',
      showCancelButton: true,
      confirmButtonText: `Sim`,
      cancelButtonText: `Agora não`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("/api/v1/private/logout", {}, config).then((res) => {
          let resposta = res.data;
          switch (resposta.status) {
            case STATUS.ADMIN.LOGOUT_SUCESSO:
              mostrarAlerta('Sucesso', 'Sessão finalizada.');
              sessionStorage.removeItem("oopgV1Token");
              window.location.href = "/";
              break;
            case STATUS.ERRO.PROBLEMA_INESPERADO:
              mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
              break;
            case STATUS.SESSAO.TOKEN_INDEFINIDO:
              mostrarAlerta('Token não definido', 'Contate o mantenedor do site.');
              sessionStorage.removeItem("oopgV1Token");
              window.location.href = "/admin/login";
              break;
            case STATUS.SESSAO.TOKEN_INVALIDO:
              mostrarAlerta('Token inválido', 'Faça login novamente.');
              sessionStorage.removeItem("oopgV1Token");
              window.location.href = "/admin/login";
              break;
            default:
              mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
          }
        }).catch(() => {
          mostrarAlerta('Problema inesperado', 'Contate o mantenedor do sistema pela página "Sobre".');
        });
      } 
    })
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavLink onClick={() => { this.onDefinirTabAtual('1') }}>
            <h4 className="text-dark">Administrador</h4>
          </NavLink>
          <NavLink onClick={() => { this.onDefinirTabAtual('2') }}>
            <h4 className="text-dark">Noticias</h4>
          </NavLink>
          <NavLink onClick={() => { this.onDefinirTabAtual('3') }}>
            <h4 className="text-dark">Obras</h4>
          </NavLink>
          <NavLink onClick={() => { this.onLogout() }}>
            <h4 className="text-danger">Sair</h4>
          </NavLink>
        </Nav>
        <TabContent activeTab={this.state.tab} className="container-fluid d-flex justify-content-center text-center">
          <TabPane tabId="1" className="mt-5">
            <Admin />
          </TabPane>
          <TabPane tabId="2" className="mt-5">
            <h3>Cadastro de obras</h3>
            <ImportarPlanilha />
          </TabPane>
          <TabPane tabId="3" className="mt-5">
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
