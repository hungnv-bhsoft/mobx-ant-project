import React from 'react';
import List from '../../list/List';
import Item from '../../list/Item';
import styled from 'styled-components';
// import { toJS } from 'mobx';
import { useObserver } from 'mobx-react';

const Spinner = styled.div`
    text-align: center;
    font-size: 2rem;
`;

const ShowProduct = ({ products, incPrice ,loading}) => {
    // console.log(toJS(incPrice));
    return useObserver(() => {
        return loading ? <Spinner>Loading...</Spinner> : (
            <List
            flexDirection='column'
            >
            {products !== undefined && products.map( product => {
                return <Item key={product.id}>
                        <div onClick={() => incPrice(product.id) } >name : {product.name}</div>
                        <div>price : {product.price}</div>
                        </Item>
                })}
            </List>
        )
    });
}

export default ShowProduct
