import { observable, computed ,decorate, action, toJS } from 'mobx';

export class ProductStore {
    products = [
        {
            id : 1,
            name : 'banana drink',
            price : 2,
            description : 'lorem lorem lorem lorem',
            soldOut : 50
        },
        {
            id : 2,
            name : 'capuchino drink',
            price : 10,
            description : 'lorem lorem lorem lorem',
            soldOut : 90
        }
    ];
    addProduct(obj) {
        return this.products.push(obj);
    };
    incPrice(id) {
        const product = this.products.find( pro => pro.id == id );
        return product.price++;
    }

    get listProduct() {
        return this.products
    }
}
decorate(ProductStore,{
    products : observable,
    addProduct : action,
    listProduct : computed
});
