import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const ContentWrapper = styled.main`
    max-width: 100%;
`;

const Content = ({ children }) => {
    return (
        <>
        <Header />
        <ContentWrapper>
            {children}
        </ContentWrapper>
        </>
    )
}

export default Content;
