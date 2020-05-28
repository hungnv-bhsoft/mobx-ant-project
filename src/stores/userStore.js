import { observable, computed ,decorate, action, toJS } from 'mobx';
import axios from 'axios';
import history from '../utils/history';


export class UserStore {
    loading = false;
    user = null;
    jwToken = null;
    errors = null;
    isLogged = false;
    login = async (user) => {
        try {
            const res = await axios.post('http://localhost:1337/auth/local',{
                identifier : user.email,
                password : user.password
            });
            const userRole = res.data.user;
            if(userRole.blocked === false && userRole.role.type === 'manager' ) {
                this.user = res.data.user;
                window.sessionStorage.setItem('admin',JSON.stringify(res.data.jwt));
                this.isLogged = true;
                history.push('/admin');
            } else {
                this.errors = 'You can not access into admin!';
            };
            this.loading = false;
        } catch (error) {
            this.errors = 'email or password invalid!'
        }
    };
    checkAdmin = () => {
        const admin = JSON.parse(window.sessionStorage.getItem('admin'));
        this.jwToken = admin || null;
        if(this.jwToken) {
            history.push('/admin');
        } else {
            history.push('/adminlogin');
        }
    };
    logout = () => {
        window.sessionStorage.removeItem('admin');
        this.isLogged = false;
        history.push('/adminlogin');
    };




}
decorate(UserStore,{
    loading : observable,
    user: observable,
    errors : observable,
    adminLogged : observable,
    isLogged : observable,
    checkAdmin : action,
    login : action,
    logout: action,
});
