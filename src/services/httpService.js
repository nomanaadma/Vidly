import axios from "axios";
import logger from './logService';
import auth from './authService';

axios.defaults.headers.common['x-auth-token'] = auth.getJwt();

axios.interceptors.response.use(null, error => {

    const expectedError = 
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    
    if(!expectedError) {

        logger.log(error);
    }

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}