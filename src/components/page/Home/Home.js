import React from 'react';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
// import productStore from '../../stores/productStore';
import List from '../../list/List';
import Item from '../../list/Item';
import Banner from './Banner';
import { useStores } from '../../../hooks/useStores';

const Home = () => {
    const { productStore } = useStores();
    // console.log(toJS(useStores()));

    return useObserver(() =>  (
            <div>
                <Banner />
                <List
                flexDirection='column'
                >
                    {productStore.products !== undefined && productStore.products.map( product => {
                        return <Item key={product.id}>
                                <div onClick={() => productStore.incPrice(product.id) } >name : {product.name}</div>
                                <div>price : {product.price}</div>
                                </Item>
                    })}
                </List>
            </div>
        ));
}

export default Home
