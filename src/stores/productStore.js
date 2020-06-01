import { observable, computed ,decorate, action, toJS } from 'mobx';
import coffeeAPI from '../api/config';

const getToken = JSON.parse(window.sessionStorage.getItem('admin'));
// console.log(getToken.jwt);

export class ProductStore {
    loading = false;
    products = [];

    getProducts = async () => {
        try {
            this.loading = true;
            const res = await coffeeAPI.get('/products');
            this.products = res.data;
            this.loading = false;
            // console.log('LOAD PRODUCTS SUCCESS',res.data);
        } catch (err) {
            console.log(err);
        }
    };

    createProduct = async (product) => {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken.jwt}`
        }
        try {
            this.loading = true;
            const res = await coffeeAPI.post('/products',product,{headers});
            this.products.push(product);
            console.log(res.data);
            this.loading = false;
        } catch (err) {
            console.log(err);
        }
    }

    uploadCover = async (fileList) => {
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getToken.jwt}`
        }
        try {
            this.loading = true;
            const res = await coffeeAPI.post('http://localhost:1337/upload',fileList,{headers});
            console.log(res.data);
            this.loading = false;
        } catch (err) {
            console.log(err);
        }
    }

    incPrice = (id) => {
        const product = this.products.find( pro => pro.id == id );
        return product.price++;
        // console.log(id);
    }
    convertVND = (currency) => {
        return this.products.map( pro => pro.price  * currency );
    }

}
decorate(ProductStore,{
    loading : observable,
    products : observable,
    getProducts : action,
    createProduct : action,
    incPrice : action,
    convertVND : action
});
