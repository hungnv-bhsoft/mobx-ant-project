import { observable, computed ,decorate, action, toJS } from 'mobx';
//Count store
export class CountStore {
    count = 0;
    increment() {
        this.count++;
    }
    decrement() {
        this.count--
    }
    get doubleCount() {
        return this.count * 2
    }
}
decorate(CountStore,{
    count : observable,
    decrement : action,
    increment : action,
    doubleCount : computed
});
