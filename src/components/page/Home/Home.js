import React from 'react';
import { observer } from 'mobx-react';
// import { toJS } from 'mobx';
import { useStores } from '../../../hooks/useStores';

import Banner from './Banner';
import { Heading, ContainerWrapper } from '../../common';
import ShowProduct from './ShowProduct';
import Content from '../../layout/Content';


const Home = observer(() => {
    const { productStore, bannerStore } = useStores();
    React.useEffect(() => {
        bannerStore.getBanners();
    },[bannerStore]);
    React.useEffect(() => {
        productStore.getProducts();
    },[productStore]);


    return (
        <Content>
        <Banner {...bannerStore} />
        <ContainerWrapper>
            <Heading>Coffee Menu</Heading>
            <ShowProduct {...productStore}
            incPrice={productStore.incPrice} />
        </ContainerWrapper>
        </Content>
        );
});

export default Home
