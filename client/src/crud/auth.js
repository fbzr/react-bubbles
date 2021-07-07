import { axiosWithAuth } from '../utils/axiosWithAuth';

export const login = async user => {
    try {
        return await axiosWithAuth().post('/api/login', user);
    } catch(err) {
        console.log(err);
    }
}

export default {
    login
}