import Api from './api';

export const register = (data) => Api.post('/user', data).then(res => res.data);

export const login = (data) => Api.post('/user/loginadmin', data).then(res => res.data.data);

export const getAuth = (id) => Api.get('/user/' + id).then(res => res.data);