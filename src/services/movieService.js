import httpService from './httpService';
import config from './../config.json';

export async function getMovies() {
  const { data } = await httpService.get(config.apiEndpoint+'movies');
  return data;
}
