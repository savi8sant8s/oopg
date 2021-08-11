import { Component } from "react";
import { VscLock } from "react-icons/vsc";
import { HiMenu } from "react-icons/hi";

const styles = {
    navBg: {
        backgroundColor: "#ff2b32c4"
    }
};

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ menu: !this.state.menu })
    }

    render() {
        const show = (this.state.menu) ? "show" : "";
        
        return (
            <nav style={styles.navBg} className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand text-white" href="/">
                    <img className="m-lg-2 m-1" src="/logo.png" alt="" width="30" height="24" />
                    <label className="text-light">OOPG</label>
                </a>
                <button onClick={this.toggleMenu} className="navbar-toggler bg-light m-2" type="button" data-toggle="collapse" data-target="#navbarApp">
                    <HiMenu color="red" size="30px" />
                </button>
                <div className={"collapse navbar-collapse justify-content-end " + show} id="navbarApp">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item m-1">
                            <a className="nav-link text-white" href="/">Início</a>
                        </li>
                        <li className="nav-item m-1">
                            <a className="nav-link text-white" href="/">Notícias</a>
                        </li>
                        <li className="nav-item m-1">
                            <a className="nav-link text-white" href="/obras">Obras</a>
                        </li>
                        <li className="nav-item m-1">
                            <a className="nav-link text-white" href="/mapa">Mapa do observatório</a>
                        </li>
                        <li className="nav-item m-1">
                            <a className="nav-link text-white" href="/sobre">Sobre</a>
                        </li>
                        <li className="nav-item m-1">
                            <a className="nav-link text-white" href="/admin/login">
                                <VscLock color="white" size="23px" />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}