import { Component } from "react";
import { Card, CardLink, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Table } from 'reactstrap';
import styles from '../styles/mapa.module.css';

export default class Mapa extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <Card className="ms-3 me-3">
            <CardBody>
              <CardTitle className="text-center" tag="h5">Navegue pelo Observatório</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 mt-3 text-muted"><b>Menu</b></CardSubtitle>
              <div className={styles.line}></div>
              <Table borderless>                  
                <tbody>
                <tr>
                    <th></th>
                    <td><a className={styles.disableLink} href="https://www.google.com.br/"><b>Página inicial</b></a></td>
                  </tr>                  
                  <tr>
                    <th scope="row"></th>
                    <td><a className={styles.disableLink} href="https://www.google.com.br/"><b>Todas as obras</b></a></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td><a className={styles.disableLink} href="https://www.google.com.br/">Saúde</a></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td><a className={styles.disableLink} href="https://www.google.com.br/">Educação</a></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td><a className={styles.disableLink} href="https://www.google.com.br/">Assistência Social</a></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td><a className={styles.disableLink} href="https://www.google.com.br/">Administração</a></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td><a className={styles.disableLink} href="https://www.google.com.br/">Urbanismo</a></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td><a className={styles.disableLink} href="https://www.google.com.br/">Todas</a></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td><a className={styles.disableLink} href="https://www.google.com.br/"><b>Mapa do Observatório</b></a></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td><a className={styles.disableLink} href="https://www.google.com.br/"><b>Administrador</b></a></td>
                  </tr>           
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}
