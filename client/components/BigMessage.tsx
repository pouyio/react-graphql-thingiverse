import React from 'react';
import styled from 'styled-components';

const StyledBigMessage = styled.h1`
    position: absolute;
    left: calc(50% - ${(props: any) => props.text.length / 2}em);
`;


export default function BigMessage(props: any) {
    return <StyledBigMessage {...props}>{props.text}</StyledBigMessage>;
}
