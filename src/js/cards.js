// cards
import axios from 'axios';
import { API_KEY_TMDb } from './consts/api_key.js';
import { URL } from './consts/api_key.js';
// const GET_MOVIE_INFO = '/movie/';

console.log(URL);
console.log(API_KEY_TMDb);

async function MovieApiById(id) {
  
    try {
    const movieInfo = await axios.get('https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY_TMDb}&language=en-US');     
// const movieInfo = await axios.get(`${URL}${GET_MOVIE_INFO}${id}?api_key=${API_KEY_TMDb}&language=en-US`);
        console.log(movieInfo.data);
        // createMovieCardById(movieInfo)
    } catch (error) {
      console.log(error.message);
    }
}

MovieApiById();


