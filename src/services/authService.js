import httpService from './httpService';
import jwtDecode from 'jwt-decode';
import { apiUrl } from './../config.json';

const apiEndpoint = apiUrl+'/auth';
const tokenKey = 'token';

httpService.setJwt(getJwt());

export async function login(email, password) {
    const { data: jwt } = await httpService.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(token) {
    localStorage.setItem(tokenKey, token);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function currentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    currentUser,
    loginWithJwt,
    getJwt
}