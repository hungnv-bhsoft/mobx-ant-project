import React from 'react';
import { CountStore } from './createStore';
import { BannerStore } from './bannerStore';
import { ProductStore } from './productStore';
import { UserStore } from './userStore';
import { CategoriesStore } from './categoriesStore';

export const storeContext = React.createContext({
    countStore : new CountStore() ,
    categoriesStore : new CategoriesStore(),
    productStore : new ProductStore(),
    bannerStore : new BannerStore(),
    userStore  : new UserStore()
});
