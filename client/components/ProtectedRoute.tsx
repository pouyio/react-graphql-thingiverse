import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './Auth';

const ProtectedRoute = ({ component: Component, title, ...rest }: any) => (
    <AuthConsumer>
        {({ bearer }) => (
            <Route {...rest} render={props =>
                bearer ?
                    <Component {...props} {...rest} bearer={bearer} title={title} />
                    : <Redirect to="/login" />
            }
            />
        )}
    </AuthConsumer>
)

export default ProtectedRoute