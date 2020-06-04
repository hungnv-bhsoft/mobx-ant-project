import { observable, decorate, action } from 'mobx';
import coffeeAPI from '../api/config';
import { headers } from '../utils/header';

export class CategoriesStore {
    loading = false;
    success = null;
    error = null;
    categories = [];

    getCategories = async () => {
        try {
            this.loading = true;
            const res = await coffeeAPI.get('/categories');
            this.categories = res.data;
            this.loading = false;
        } catch (err) {
            console.log(err);
        }
    };

    createCategorie = async (categorie) => {
        try {
            this.loading = true;
            const res = await coffeeAPI.post('/categories',categorie,{headers});
            this.categories.push(categorie);
            console.log(res.data);
            this.success = true;
            this.loading = false;
        } catch (err) {
          this.error = true;
            console.log(err);
        }
    };
    editCategorie = async (cId,name) => {
        try {
            this.loading = true;
            const res = await coffeeAPI.put(`/categories/${cId}`,name,{headers});
            console.log(res.data);
            console.log(cId);
            const indexObj = this.categories.findIndex( c => c.id === cId);//if true return 1;
            // console.log(this.projects[indexObj] = name);
            this.categories[indexObj] = name;
            this.success = true;
            this.loading = false;
        } catch (err) {
            this.error = true;
            console.log(err);
        }
    }
    deleteCategorie = async (cId) => {

        try {
            this.loading = true;
            const res = await coffeeAPI.delete(`/categories/${cId}`,{headers});
            this.categories = this.categories.filter(c => c.id !== cId);
            console.log(res.data);
            this.loading = false;
        } catch (err) {
            console.log(err);
        }
    }




}
decorate(CategoriesStore,{
    loading : observable,
    success : observable,
    error : observable,
    categories : observable,
    getCategories : action,
    createCategorie : action,
    editCategorie : action,
    deleteCategorie : action
});
