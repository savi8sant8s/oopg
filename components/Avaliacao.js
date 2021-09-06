import { Component } from "react";
import { NavLink } from "react-bootstrap";

export default class Avaliacao extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const styles = {
        backgroundColor: "#fbb034",
        backgroundImage: "linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)"
      };

      return (
        <div style={styles} className="text-center">
          <NavLink href="/avaliacao" style={{ color: "white" }}>Avalie o observatório!!</NavLink>
        </div>
      )
    }
  }