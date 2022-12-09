import axios from 'axios';
import { API_KEY_TMDb } from './consts/api_key.js';
import { createMarkup } from './films';
import { hidePreloder, showPreloder } from './preloder.js';
import { scrollToTop } from './scrollToTop';
import Pagination from 'tui-pagination';
import { container } from './pagination';
import { options } from './pagination';

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
function searchInput(e) {
  e.preventDefault();
  resultPage = 1;
  const query = form.querySelector('input').value;
  e.target.reset();

  searchMovieByQuery(query, resultPage);
}
async function searchMovieByQuery(q, pagePag = 1) {
  try {
    showPreloder();
    const findMovieArray = await axios.get(
      `${URL_SEARCH_MOVIE}?api_key=${API_KEY_TMDb}&language=en-US&query=${q}&page=${pagePag}&include_adult=false`
    );
    //
    const { results, page, total_pages } = findMovieArray.data;
    createMarkup(results);
    hidePreloder();
    //
    if (page < total_pages) {
      options.totalItems = total_pages;
      options.page = pagePag;
      const pagination = new Pagination(container, options);
      pagination.on('afterMove', function (eventData) {
        resultPage = eventData.page;
        searchMovieByQuery(q, resultPage);
        scrollToTop();
      });
    }
    //
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
