import React from 'react';
import styled from 'styled-components';

const MainWrapper = styled.main`
    max-width: 100%;
`;

const Main = ({ children }) => {
    return (
        <MainWrapper>
            {children}
        </MainWrapper>
    )
}

export default Main;
