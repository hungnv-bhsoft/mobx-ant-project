import { observable, computed ,decorate, action, toJS } from 'mobx';
import coffeeAPI from '../api/config';


export class ProductStore {
    loading = false;
    products = [];
    getProducts = async () => {
        try {
            this.loading = true;
            const res = await coffeeAPI.get('/products');
            this.products = res.data;
            this.loading = false;
            console.log('LOAD PRODUCTS SUCCESS',res.data);
        } catch (err) {
            console.log(err);
        }
    }

    addProduct(obj) {
        return this.products.push(obj);
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
    incPrice : action,
    convertVND : action
});
