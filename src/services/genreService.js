import httpService from './httpService';
import { apiUrl } from './../config.json';

export async function getGenres() {
  return await httpService.get(apiUrl + '/genres');
}
