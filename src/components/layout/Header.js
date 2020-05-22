import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
    max-width: 100%;

`;

const Header = ({ children }) => {
    return (
        <HeaderWrapper>
            {children}
        </HeaderWrapper>
    )
}

export default Header
