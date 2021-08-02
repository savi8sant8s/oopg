import { Component } from "react";
import GoogleLogin2 from "../components/sigin-google";

export default class App extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <GoogleLogin2 />
      </div>
    )
  }
}
