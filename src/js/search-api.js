import axios from 'axios';
import { API_KEY_TMDb } from './consts/api_key.js';
//CONSTANTS
const URL = 'https://api.themoviedb.org/3';
const GET_TRENDING = '/trending/movie/week';
const GET_GENRE_LIST = '/genre/movie/list';

export class FilmsApiService {
  constructor() {
    this.searchQuery = '';
    this.resultPage = 1;
    this.genres_ids_array;
    this.movieId = '';
  }

  async getTrendingDataApi() {
    try {
      const searchParams = new URLSearchParams({
        api_key: API_KEY_TMDb,
        language: 'en',
      });
      const url = `${URL}${GET_TRENDING}?${searchParams}`;
      //
      const response = await axios.get(url);
      //
      if (!this.genres_ids_array) {
        const genres_ids = await axios.get(
          `${URL}${GET_GENRE_LIST}?${searchParams}`
        );
        this.genres_ids_array = genres_ids.data;
      }
      if (!response.status) {
        throw new Error('Something goes wrong');
      }

      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
