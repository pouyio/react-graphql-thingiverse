import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
    &.active {
        color: #fcff58;
        font-weight: bold;
    }
`;

const StyledNavbar = styled.ul`
    list-style-type: none;
    max-width: 45rem;
    margin: 0 auto;
    padding: 0 1em;
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    & a {
        color: white
        text-decoration: none;
    }

    & li {
        transition: all .1s;
        padding: .7em;
    }
    
    & li:hover {
        transform: scale(1.2);
    }
`;

const StyledNavbarContainer = styled.div`
    background: #444;
    border-bottom: 3px solid #fcff58;
    width: 100%;
    position: sticky;
    top: 0;
`;

const StyledButton = styled.button`
    background: #fcff58;
    border: none;
    border-radius: 0.3em;
    padding: 0.3em 0.4em;
    font-size: 1em;
`;

export default function Navbar(props: {logout: Function}) {
    return (
        <StyledNavbarContainer>
            <StyledNavbar>
                <li>
                    <StyledNavLink to="/newest">Newest</StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/popular">Popular</StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/featured">Featured</StyledNavLink>
                </li>
                <li>
                    <StyledButton onClick={() => props.logout()}> Logout </StyledButton>
                </li>
            </StyledNavbar>
        </StyledNavbarContainer>
    )
}