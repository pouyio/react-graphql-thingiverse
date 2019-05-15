import React from 'react';
import BigMessage from './BigMessage';

export default function Logout() {
    return (
        <BigMessage>
            <a href={`https://www.thingiverse.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&response_type=code`}>Log in</a>
        </BigMessage>
    )
}