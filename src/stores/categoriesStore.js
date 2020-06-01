import { observable, computed ,decorate, action, toJS } from 'mobx';
import coffeeAPI from '../api/config';

const getToken = JSON.parse(window.sessionStorage.getItem('admin')) || null;
console.log(getToken.jwt);

export class CategoriesStore {
    loading = false;
    categories = [];

    getCategories = async () => {
        try {
            this.loading = true;
            const res = await coffeeAPI.get('/categories');
            this.categories = res.data;
            this.loading = false;
            // console.log('LOAD categories SUCCESS',res.data);
        } catch (err) {
            console.log(err);
        }
    };

    createCategorie = async (product) => {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken.jwt}`
        }
        try {
            this.loading = true;
            const res = await coffeeAPI.post('/categories',product,{headers});
            this.categories.push(product);
            console.log(res.data);
            this.loading = false;
        } catch (err) {
            console.log(err);
        }
    }




}
decorate(CategoriesStore,{
    loading : observable,
    categories : observable,
    getCategories : action,
    createCategorie : action
});
