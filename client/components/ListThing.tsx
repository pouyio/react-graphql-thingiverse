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
    margin-bottom: 0;
`;

const StyledAuthor = styled(StyledText)`
    text-align: right;
    font-size: .8em;
`;

const StyledCreatorImg = styled.img`
    border-radius: 100%;
    height: 1em;
`;

export default class ListThing extends Component<any, any> {
    render() {
        return (
            <StyledElement>
                <Link style={{ textDecoration: 'none' }} to={`/thing/${this.props.id}`}>
                    <img src={this.props.thumbnail.replace('medium', 'large')} style={{ width: '100%' }} />
                    <StyledText>{this.props.name}</StyledText>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.2em', paddingTop: 0 }}>
                        <StyledCreatorImg src={this.props.creator.thumbnail} />
                        <StyledAuthor>{this.props.creator.name}</StyledAuthor>
                    </div>
                </Link>
            </StyledElement>
        );
    }
}