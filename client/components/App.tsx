import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider, AuthConsumer } from './Auth';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Main from './Main';

export default class AppRouter extends Component {

    render() {
        return (
            <BrowserRouter>
                <AuthProvider>
                    <AuthConsumer>
                        {({ bearer, setBearer, removeBearer }) => (
                            <div>
                                {bearer ?
                                    <button onClick={() => removeBearer()}> logout </button>
                                    : <a href={`https://www.thingiverse.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&response_type=code`}>Log in</a>
                                }
                                <Switch>
                                    <Route
                                        path="/login"
                                        render={(props) => <Login {...props} setBearer={setBearer} />}
                                    />
                                    <ProtectedRoute path="/" component={Main} />
                                </Switch>
                            </div>
                        )}
                    </AuthConsumer>
                </AuthProvider>
            </BrowserRouter>
        );
    }
}