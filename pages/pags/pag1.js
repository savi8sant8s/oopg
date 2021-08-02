import { Component } from "react";
import style from '../../styles/style1.module.css';

export default class pag1 extends Component {
   
    constructor(props) {
        super(props);
      }

    render() {
        return (
            <div>
                <h1 className={style.title}>Hello</h1>
            </div>
        )
    }
}