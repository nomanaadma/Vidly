import httpService from './httpService';
import config from './../config.json';

export async function getGenres() {
  const { data } = await httpService.get(config.apiEndpoint+'genres');
  return data;
}
