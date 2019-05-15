import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AuthProvider, AuthConsumer } from './Auth';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Things from './Things';
import Thing from './Thing';
import Navbar from './Navbar';
import Logout from './Logout';

const httpLink = createHttpLink({
    uri: `${process.env.URI}/graphql`,
});

const authLink = setContext((_: any, { headers }: any) => {
    const token = localStorage.getItem('bearer');
    return {
        headers: {
            ...headers,
            authorization: token || '',
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default class AppRouter extends Component {

    render() {
        return (
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <AuthProvider>
                        <AuthConsumer>
                            {({ bearer, setBearer, removeBearer }) => (
                                <div>
                                    {bearer ?
                                        <Navbar logout={() => removeBearer()}/>
                                        : ''
                                    }
                                    <Switch>
                                        <Route
                                            path="/login"
                                            render={(props) => <Login {...props} setBearer={setBearer} />}
                                        />
                                        <Route path="/logout" component={Logout} />} />
                                        <Route exact path="/" render={() => <Redirect to="/newest" />} />
                                        <ProtectedRoute path="/newest" type="newest" component={Things} />
                                        <ProtectedRoute path="/popular" type="popular" component={Things} />
                                        <ProtectedRoute path="/featured" type="featured" component={Things} />
                                        <ProtectedRoute path="/thing/:id" component={Thing} />
                                    </Switch>
                                </div>
                            )}
                        </AuthConsumer>
                    </AuthProvider>
                </ApolloProvider>
            </BrowserRouter>
        );
    }
}