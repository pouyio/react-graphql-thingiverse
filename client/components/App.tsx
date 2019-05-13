import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
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
                                        <ul>
                                            <li>
                                                <Link to="/newest">Newest</Link>
                                            </li>
                                            <li>
                                                <Link to="/popular">Popular</Link>
                                            </li>
                                            <li>
                                                <Link to="/featured">Featured</Link>
                                            </li>
                                            <li>
                                                <button onClick={() => removeBearer()}> Logout </button>
                                            </li>
                                        </ul>
                                        : <a href={`https://www.thingiverse.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&response_type=code`}>Log in</a>
                                    }
                                    <Switch>
                                        <Route
                                            path="/login"
                                            render={(props) => <Login {...props} setBearer={setBearer} />}
                                        />
                                        <Route exact path="/" render={() => <Redirect to="/newest" />} />
                                        <ProtectedRoute path="/newest" title="Newest" component={Things} />
                                        <ProtectedRoute path="/popular" title="Popular" component={Things} />
                                        <ProtectedRoute path="/featured" title="Featured" component={Things} />
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