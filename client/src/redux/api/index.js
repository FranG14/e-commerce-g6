import axios from 'axios';

//const { REACT_APP_API } = 'https://e-commerce-g6-back.herokuapp.com/'; // En local comentar esta linea
const { REACT_APP_API } = process.env; // En deploy comentar esta linea

const API = axios.create( { baseURL: REACT_APP_API} ) 

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const getUserById = () => API.get('/users/:id');
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);
export const googleLogIn = (formData) => API.post('users/google',formData);
export const changePassword = (passwords) => API.patch('/users/password/:_id', passwords);
