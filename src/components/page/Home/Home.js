import React from 'react';
import { useObserver } from 'mobx-react';
// import { toJS } from 'mobx';
import { useStores } from '../../../hooks/useStores';

import Banner from './Banner';
import { Heading } from '../../common';
import ShowProduct from './ShowProduct';


const Home = () => {
    const { productStore, bannerStore } = useStores();
    React.useEffect(() => {
        bannerStore.getBanners();
    },[]);
    React.useEffect(() => {
        productStore.getProducts();
    },[]);


    return useObserver(() =>  (
            <div>
                <Banner {...bannerStore} />
                <Heading>Coffee Menu</Heading>
                <ShowProduct {...productStore} incPrice={productStore.incPrice} />
            </div>
        ));
}

export default Home
