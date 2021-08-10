import React, { Component, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import ImportSheet from '../../component/import-sheet';
import {DiAndroid} from "react-icons/di"

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
      <ImportSheet />
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

function Administrador() {
  return (
    <div>
      pag do administrador
    </div>
  )
}

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      toggle: "1",
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
              <Administrador />
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}




