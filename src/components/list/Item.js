import React from 'react';
import styled from 'styled-components';

const ItemStyle = styled.li`
  margin: ${ ({ margin }) => margin ? margin: null};
  padding: ${ ({ padding }) => padding ? padding: null};
`;

const Item = ({ children,margin,padding }) => {
    return (
        <ItemStyle
        margin={margin}
        padding={padding}
        >
            {children}
        </ItemStyle>
    )
}

export default Item
