import { Component } from "react";

export default class Avaliacao extends Component {
    constructor(props) {
      super(props);

    }
  
    render() {
      return (
        <div className="container-fluid d-flex justify-content-center mt-5">
          <iframe scrolling="no" src="https://docs.google.com/forms/d/e/1FAIpQLSc1GyWPEJwYkLjHOfAVwNdd76kayVjYenSSk4zuEQPJDqMbzQ/viewform?embedded=true" 
          width="100%" height="2500" frameborder="0" marginheight="0" marginwidth="0">Carregando…</iframe>
        </div>
      )
    }
  }