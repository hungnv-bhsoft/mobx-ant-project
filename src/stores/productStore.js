import { observable, computed ,decorate, action, toJS } from 'mobx';
import coffeeAPI from '../api/config';

const getToken = JSON.parse(window.sessionStorage.getItem('admin'));
// console.log(getToken.jwt);
export const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': `Bearer ${getToken.jwt}`
}

export class ProductStore {
    loading = false;
    products = [];
    success = null;
    error = null;

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
        try {
            this.loading = true;
            await coffeeAPI.post('/products',product,{headers});
            this.products.push(product);
            this.success = true;
            this.loading = false;
        } catch (err) {
          this.error = true;
            console.log(err);
        }
    };
    deleteProduct = async (productId) => {
          try {
            this.loading = true;
            await coffeeAPI.delete(`/products/${productId}`,{headers});
            this.success = true;
            this.products = this.products.filter(product => product.id !== productId);
            this.loading = false;
        } catch (err) {
          this.error = true;
            console.log(err);
        }
    };
    eidtProduct = async (productId,product) => {
        try {
          this.loading = true;
          const res = await coffeeAPI.put(`/products/${productId}`,product,{headers});
          const indexObj = this.products.findIndex( pro => pro.id === productId);//if true return 1;
          // console.log(this.projects[indexObj] = obj);
          this.products[indexObj] = product;
          console.log(res);
          this.success = true;
          this.loading = false;
      } catch (err) {
        this.error = true;
          console.log(err);
      }
    }
    uploadCover = async (fileList) => {

        try {
            this.loading = true;
            const cover = new FormData();
            cover.append('files',fileList);
            await coffeeAPI.post('http://localhost:1337/upload',cover,{headers});
            this.success = true;
            this.loading = false;
        } catch (err) {
            this.error = true;
            console.log(err);
        }
    };

    incPrice = (id) => {
        const product = this.products.find( pro => pro.id == id );
        return product.price++;
        // console.log(id);
    };
    convertVND = (currency) => {
        return this.products.map( pro => pro.price  * currency );
    };

}
decorate(ProductStore,{
    loading : observable,
    products : observable,
    success : observable,
    error : observable,
    getProducts : action,
    createProduct : action,
    deleteProduct : action,
    eidtProduct : action,
    incPrice : action,
    convertVND : action
});
