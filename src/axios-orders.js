import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-1fcf5-default-rtdb.firebaseio.com/'
});

export default instance;