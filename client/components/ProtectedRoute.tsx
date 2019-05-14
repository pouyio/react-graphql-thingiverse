import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './Auth';
import styled from 'styled-components';

const ProtectedRoute = ({ component: Component, title, className, ...rest }: any) => (
    <AuthConsumer>
        {({ bearer }) => (
            <Route {...rest} render={props =>
                bearer ?
                    <div className={className}>
                        <Component {...props} {...rest} bearer={bearer} title={title} />
                    </div>
                    : <Redirect to="/login" />
            }
            />
        )}
    </AuthConsumer>
)


export default styled(ProtectedRoute)`
            max-width: 68rem;
            margin: 0 auto;
`
