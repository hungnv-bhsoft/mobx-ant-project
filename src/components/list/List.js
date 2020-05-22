import React from 'react';
import styled from 'styled-components';

const ListWrapper = styled.ul`
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction : ${ ({ flexDirection }) =>
    flexDirection === "column" ? "column" : "row"};
    & > * {
        display: block;
        padding : ${ ({ padding }) => padding ? padding : null };
    }
`;

const List = ({ children, flexDirection ,margin,padding}) => {
    return (
        <ListWrapper
            margin={margin}
            padding={padding}
            flexDirection={flexDirection}
        >
            {children}
        </ListWrapper>
    )
}

export default List;
