import React from 'react';
import { CountStore } from './createStore';
import { BannerStore } from './bannerStore';
import { ProductStore } from './productStore';

export const storeContext = React.createContext({
    countStore : new CountStore() ,
    productStore : new ProductStore(),
    bannerStore : new BannerStore()
});
