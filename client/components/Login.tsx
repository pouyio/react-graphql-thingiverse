import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { withRouter, RouteComponentProps, StaticContext } from 'react-router';
import BigMessage from './BigMessage';


interface LoginProps extends RouteComponentProps<any, StaticContext> {
    setBearer: Function
}

class Login extends Component<LoginProps> {

    parseCode() {
        const { code = '' } = queryString.parse(this.props.location.search);
        return code;
    }

    componentDidMount() {
        const code = this.parseCode();

        if (code) {
            axios.post(`${process.env.URI}/auth`, { code })
                .then(({ data: { token_type, access_token } }) => {
                    const bearer = `${token_type} ${access_token}`;
                    this.props.setBearer(bearer);
                    this.props.history.push('/');
                });
        } else {
            window.location.href = `https://www.thingiverse.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&response_type=code`;
        }
    }

    render() {
        return <BigMessage text="Logging in 📨" />;
    }
}

export default withRouter(Login);