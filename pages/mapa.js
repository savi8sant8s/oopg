import { Component } from "react";
import { Container, CardSubtitle, Table, NavLink } from 'reactstrap';
import styles from '../styles/mapa.module.css';

export default class Mapa extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="pt-5">
        <h4 className="text-center">Navegue pelo Observatório</h4>
        <CardSubtitle tag="h6" className="mb-2 mt-3 text-muted"><b>Menu</b></CardSubtitle>
        <div className={styles.line}></div>
        <Table borderless>
          <tbody>
            <tr>
              <th></th>
              <td><NavLink className="text-dark" href="/"><b>Página inicial</b></NavLink></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td><NavLink className="text-dark" href="/noticias"><b>Notícias</b></NavLink></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td><NavLink className="text-dark" href="/obras?ordenar=recente"><b>Obras</b></NavLink></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td><NavLink className="text-dark" href={"/obras?ordenar=recente&categoria=saude"}>Saúde</NavLink></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td><NavLink className="text-dark" href={"/obras?ordenar=recente&categoria=educacao"}>Educação</NavLink></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td><NavLink className="text-dark" href={"/obras?ordenar=recente&categoria=assistenciasocial"}>Assistência Social</NavLink></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td><NavLink className="text-dark" href={"/obras?ordenar=recente&categoria=administracao"}>Administração</NavLink></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td><NavLink className="text-dark" href={"/obras?ordenar=recente&categoria=urbanismo"}>Urbanismo</NavLink></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td><NavLink className="text-dark" href={"/obras?ordenar=recente"}>Todas</NavLink></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td><NavLink className="text-dark" href="/mapa"><b>Mapa do Observatório</b></NavLink></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td><NavLink className="text-dark" href="/sobre"><b>Sobre</b></NavLink></td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td><NavLink className="text-dark" href="/admin/login"><b>Administrador</b></NavLink></td>
            </tr>
          </tbody>
        </Table>
      </Container>
    )
  }
}
