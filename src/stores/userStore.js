import { observable ,decorate, action, toJS } from 'mobx';
import axios from 'axios';
import history from '../utils/history';


export class UserStore {
    loading = false;
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
                window.sessionStorage.setItem('admin',JSON.stringify(res.data));
                history.push('/dashboard');
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
    };
    logout = () => {
        window.sessionStorage.removeItem('admin');
        // this.isLogged = false;
        history.push('/adminlogin');
    };




}
decorate(UserStore,{
    loading : observable,
    jwToken : observable,
    errors : observable,
    isLogged : observable,
    checkAdmin : action,
    login : action,
    logout: action,
});
