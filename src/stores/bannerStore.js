import { observable, computed ,decorate, action, toJS } from 'mobx';

//productStore
export class BannerStore {
    images = [];
    test = 'hihi'
}
decorate(BannerStore,{
    images : observable
});
