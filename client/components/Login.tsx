import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { withRouter } from 'react-router';

class Login extends Component<any, any> {

    parseCode() {
        const { code = '' } = queryString.parse(this.props.location.search);
        return code;
    }

    componentDidMount() {
        const code = this.parseCode();

        if (code) {
            axios.post('http://localhost:3000/auth', { code })
                .then(({ data: { token_type, access_token } }: any) => {
                    const bearer = `${token_type} ${access_token}`;
                    this.props.setBearer(bearer);
                    this.props.history.push('/');
                });
        } else {
            window.location.href = `https://www.thingiverse.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&response_type=code`;
        }
    }

    render() {
        return <h1>Loggin in ⌛️</h1>;
    }
}

export default withRouter(Login);