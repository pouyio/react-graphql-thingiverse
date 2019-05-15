import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledBigMessage = styled.h1`
    text-align: center;
`;

interface Message {
    text?: string;
    children?: ReactNode;
}

export default function BigMessage(props: Message) {
    return <StyledBigMessage>{props.text || props.children}</StyledBigMessage>;
}
