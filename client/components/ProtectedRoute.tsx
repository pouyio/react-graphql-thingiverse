import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './Auth';

const ProtectedRoute = ({ component: Component, ...rest }: any) => (
    <AuthConsumer>
        {({ bearer }) => (
            <Route render={props =>
                bearer ?
                    <Component {...props} {...rest} bearer={bearer}  />
                    : <Redirect to="/login" />
            }
            />
        )}
    </AuthConsumer>
)

export default ProtectedRoute