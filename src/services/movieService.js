import httpService from './httpService';
import { apiUrl } from './../config.json';

const apiEndpoint = apiUrl+'/movies';

export async function getMovies() {
  return await httpService.get(apiEndpoint);
}

export async function deleteMovie(movieId) {
  return await httpService.delete(apiEndpoint+'/'+movieId);
}