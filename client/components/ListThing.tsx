import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledElement = styled.article`
    overflow: hidden;
    min-width: 8em;
    max-width: 10em;
    background: #FFF;
    box-sizing: border-box;
    box-shadow: #000000bd 0 0 3px;
    border-radius: .3em;
    margin: .2em;
    
    `

const StyledText = styled.p`
    padding: .2em;
    margin: 0.4em 0;
    color: #000000bd;
    text-decoration: none;
`;
    
export default class ListThing extends Component<any, any> {
    render() {
        return (
            <StyledElement>
                <Link style={{ textDecoration: 'none' }} to={`/thing/${this.props.id}`}>
                    <img src={this.props.thumbnail.replace('medium', 'large')} style={{width: '100%'}} />
                    <StyledText>{this.props.name}</StyledText>
                </Link>
            </StyledElement>
        );
    }
}