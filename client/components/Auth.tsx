import React, { Component, createContext } from 'react';

interface AuthContextInterface {
    bearer: string,
    setBearer: Function
    removeBearer: Function
}

interface AuthState {
    bearer: string
}

const defaultAuthContext: AuthContextInterface = {
    bearer: '',
    setBearer: () => {},
    removeBearer: () => {},
}


const { Provider, Consumer } = createContext<AuthContextInterface>(defaultAuthContext);

class AuthProvider extends Component<{}, AuthState> {

    state = { bearer: '' }

    constructor(props: {}) {
        super(props);
        this.state.bearer = localStorage.getItem('bearer') || '';
        this.setBearer = this.setBearer.bind(this);
        this.removeBearer = this.removeBearer.bind(this);
    }

    setBearer(bearer: string) {
        localStorage.setItem('bearer', bearer);
        this.setState({ bearer });
    }
    
    removeBearer() {
        localStorage.removeItem('bearer');
        this.setState({ bearer: '' });
    }

    render() {
        return (
            <Provider value={{
                ...this.state,
                setBearer: this.setBearer,
                removeBearer: this.removeBearer,
            }}>
                {this.props.children}
            </Provider>
        )
    }
}

const AuthConsumer = Consumer;
export { AuthProvider, AuthConsumer }
