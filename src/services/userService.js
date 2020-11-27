import httpService from './httpService';

const apiEndpoint = '/users';

export async function register(user) {
    return await httpService.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}