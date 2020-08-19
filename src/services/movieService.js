import httpService from './httpService';
import { apiUrl } from './../config.json';

const apiEndpoint = apiUrl+'/movies';

function movieUrl(movieId) {
  return `${apiEndpoint}/${movieId}`;
}

export function getMovies() {
  return httpService.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return httpService.delete(movieUrl(movieId));
}

export function getMovie(id) {
  return httpService.get(movieUrl(id));
}

export function saveMovie(movie) {

  if(movie._id) {
    const body = {...movie};
    delete body._id;
    return httpService.put(movieUrl(movie._id), body);
  }

  return httpService.post(apiEndpoint, movie);

}
