import React from 'react';
import styled from 'styled-components';

const ItemStyle = styled.li`
`;

const Item = ({ children }) => {
    return (
        <ItemStyle>
            {children}
        </ItemStyle>
    )
}

export default Item
