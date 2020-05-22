import React from 'react';
import styled from 'styled-components';

const NavWrapper = styled.nav`
    display:flex;
    width: 100%;
`;

const Nav = ({ children }) => {
    return (
        <NavWrapper>
            {children}
        </NavWrapper>
    )
}

export default Nav;
