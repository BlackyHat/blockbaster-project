import axios from 'axios';
import { API_KEY_TMDb } from './consts/api_key.js';
import { createMarkup } from './films';
//CONSTANTS
const URL = 'https://api.themoviedb.org/3';
const GET_TRENDING = '/trending/movie/week';
const GET_GENRE_LIST = '/genre/movie/list';
const URL_SEARCH_MOVIE = 'https://api.themoviedb.org/3/search/movie';

export class FilmsApiService {
  constructor() {
    this.searchQuery = '';
    this.resultPage = 1;
    this.genres_ids_array;
    this.movieId = '';
  }

  async getTrendingDataApi(pagePag) {
    try {
      const searchParams = new URLSearchParams({
        api_key: API_KEY_TMDb,
        page: pagePag,
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
const form = document.querySelector('.search__box');
const text = document.querySelector('.form__text');
form.addEventListener('submit', searchInput);

form.addEventListener('submit', searchSubmit);
function searchSubmit(e) {}
function searchInput(e) {
  e.preventDefault();
  const query = form.querySelector('input').value;
  searchMovieByQuery(query);
}

async function searchMovieByQuery(q) {
  try {
    const findMovieArray = await axios.get(
      `${URL_SEARCH_MOVIE}?api_key=${API_KEY_TMDb}&language=en-US&query=${q}&page=1&include_adult=false`
    );
    createMarkup(findMovieArray.data.results);

    if (findMovieArray.data.results.length < 1) {
      text.style.visibility = 'inherit';
    }
    if (findMovieArray.data.results.length >= 1) {
      text.style.visibility = 'hidden';
    } else {
    }
  } catch (error) {
    console.log('Ничего не получается', error);
  }
}
