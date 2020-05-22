import { observable, computed ,decorate, action, toJS } from 'mobx';
import coffeeAPI from '../api/config';
//banner store
export class BannerStore {
    images = []
    loading = false

    getBanners = async () => {
        try {
            this.loading = true;
            const res = await coffeeAPI.get('/banners');
            this.images = res.data;
            this.loading = false;
            console.log('LOAD SUCCESS BANNERS');
        } catch (err) {
            console.log(err);
        }
    }
}
decorate(BannerStore,{
    images : observable,
    loading : observable,
    getBanners : action
});
