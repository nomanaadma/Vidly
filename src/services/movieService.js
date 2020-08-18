import httpService from './httpService';
import { apiUrl } from './../config.json';

const apiEndpoint = apiUrl+'/movies';

function movieUrl(movieId) {
  return `${apiEndpoint}/${movieId}`;
}

export async function getMovies() {
  return await httpService.get(apiEndpoint);
}

export async function deleteMovie(movieId) {
  return await httpService.delete(movieUrl(movieId));
}

export async function getMovie(id) {
  return await httpService.get(movieUrl(id));
}

export async function saveMovie(movie) {

  if(movie._id) {
    const body = {...movie};
    delete body._id;
    return httpService.put(movieUrl(movie._id), body);
  }

  return httpService.post(apiEndpoint, movie);

}
