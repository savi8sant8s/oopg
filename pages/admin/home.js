import React, { Component } from 'react';
import { 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 
  FormGroup, 
  Label, 
  Input, 
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { DiAndroid } from "react-icons/di"
import ImportarPlanilha from "../../components/importar-planilha";
import { FaPen } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import Swal from 'sweetalert2';

function ObrasListar() {
  return (
    <div>
      <DiAndroid size="50px"/>
    </div>
  )
}

function ObrasCadastrar() {
  return (
    <div>
      <ImportarPlanilha />
    </div>
  )
}

function Noticias() {
  return (
    <div>
      pag de noticia
    </div>
  )
}

class AdminCriar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: this.props.nome ? this.props.nome : "",
      email: this.props.email ? this.props.email : "",
      funcao: this.props.funcao ? this.props.funcao : ""
    };
    this.onManipularMudanca = this.onManipularMudanca.bind(this);
    this.onCadastrar = this.onCadastrar.bind(this);
  }

  onManipularMudanca(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onCadastrar() {
    Swal.fire("Precisa implementar.", '', 'info');
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
            <option value="SUPORTE">Suporte</option>
            <option value="GERAL">Geral</option>
          </Input>
        </FormGroup>
        <div className="mt-3 text-center">
          <Button onClick={this.onCadastrar} color="primary" size="lg">Cadastrar novo admin</Button>
        </div>
      </>
    )
  }
}

class AdminListar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
    this.onDeletarAdmin = this.onDeletarAdmin.bind(this);
    this.onMostrarModal = this.onMostrarModal.bind(this);
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
        Swal.fire('Falta implementar.', '', 'success');
      } 
    })
  }

  render() {
    return (
      <>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Função</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sávio Santos</td>
              <td>savio@email.com</td>
              <td>GERAL</td>
              <td>
                <FaPen onClick={()=>{this.onMostrarModal()}} className="m-2" size="20" />
                <TiDelete onClick={()=>{this.onDeletarAdmin(1, "Irineu")}} className="m-2" size="20" />
              </td>
            </tr>
          </tbody>
        </Table>
        <Modal isOpen={this.state.modal} toggle={this.onMostrarModal}>
        <ModalHeader>Alterar administrador</ModalHeader>
        <ModalBody>
          <AdminCriar nome="Fulano de tal" email="fulano@gmail.com" funcao="SUPORTE" />
        </ModalBody>
      </Modal>
        </>
    )
  }
}


class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      abaAtual: "1"
    };
    this.setAbaAtual = this.setAbaAtual.bind(this);
  }

  setAbaAtual(tab) {
    this.setState({ abaAtual: tab });
  }

  render() {
    return (
      <>
        <Nav tabs className="d-flex justify-content-around">
          <NavItem >
            <NavLink onClick={() => { this.setAbaAtual('1'); }}>
              <h4>Adicionar</h4>
            </NavLink>
          </NavItem>
          <NavItem>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => { this.setAbaAtual('2'); }}>
              <h4>Todos</h4>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.abaAtual}>
          <TabPane tabId="1">
            <AdminCriar />
          </TabPane>
          <TabPane tabId="2">
            <AdminListar />
          </TabPane>
        </TabContent>
      </>
    )
  }
}

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      toggle: "3",
      toggle2: "1" };
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle(tab) {
    this.setState({ toggle: tab })
  }

  onToggle2(tab) {
    this.setState({ toggle2: tab })
  }

  render() {
    return (
      <div className="nav justify-content-center">
        <div>
          <Nav tabs style={{ marginBottom: "10px", marginTop: "50px" }}>
            <NavItem >
              <NavLink style={{ paddingLeft: "100px", paddingRight: "100px" }} onClick={() => { this.onToggle('1'); }}>
                <h4 style={{ color: "black" }}>Obras</h4>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ paddingLeft: "100px", paddingRight: "100px" }} onClick={() => { this.onToggle('2'); }}>
                <h4 style={{ color: "black" }}>Noticias</h4>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ paddingLeft: "100px", paddingRight: "100px" }} onClick={() => { this.onToggle('3'); }}>
                <h4 style={{ color: "black" }}>Administrador</h4>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.toggle}>
            <TabPane tabId="1">
              <div>
                <Nav tabs style={{ marginBottom: "10px", marginTop: "50px" }}>
                  <NavItem >
                    <NavLink style={{alignContent:"center"}} onClick={() => { this.onToggle2('1'); }}>
                      <h5 style={{ color: "black" }}>Obras Cadastradas</h5>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink style={{alignContent:"center"}} onClick={() => { this.onToggle2('2'); }}>
                      <h5 style={{ color: "black" }}>Cadastrar Obras</h5>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.toggle2}>
                  <TabPane tabId="1">
                    <ObrasListar />
                  </TabPane>
                  <TabPane tabId="2">
                    <ObrasCadastrar />
                  </TabPane>
                </TabContent>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <Noticias />
            </TabPane>
            <TabPane tabId="3">
              <Admin />
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}




