import React from 'react';
import styled from 'styled-components';

const StyledBigMessage = styled.h1`
    text-align: center;
`;

export default function BigMessage(props: any) {
    return <StyledBigMessage>{props.text || props.children}</StyledBigMessage>;
}
