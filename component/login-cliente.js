import { GoogleLogin } from 'react-google-login';
import { Component } from "react";
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export default class LoginCliente extends Component {

    constructor(props) {
        super(props);
        this.loginGoogle = this.loginGoogle.bind(this);
        this.logoutGoogle = this.logoutGoogle.bind(this);
    }

    loginGoogle(response) {
        console.log(response);
    }

    logoutGoogle(response) {
        console.log(response);
    }

    render() {
        return (
            <div>
                <GoogleLogin
                    clientId={CLIENT_ID}
                    buttonText="Comentar com o Google"
                    onSuccess={this.loginGoogle}
                    onFailure={this.loginGoogle}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </div>
        )
    }
}
