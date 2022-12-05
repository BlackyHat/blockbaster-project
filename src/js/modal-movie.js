import axios from 'axios';
import { API_KEY_TMDb } from './consts/api_key.js';
import { FilmsApiService } from './search-api';


const URL = 'https://api.themoviedb.org/3';
const GET_MOVIE_INFO = '/movie/';

const refs = {
    openModalMovieCard: document.querySelector('[modal-movie-open]'),
    closeModalMovieBtn: document.querySelector('[modal-movie-close]'),
    backdrop: document.querySelector('.js-modalMovie__backdrop'),
    
    targetMovie: document.querySelector('.movie__gallery'),
    modalCard: document.querySelector('.modalMovie__container'),
}


refs.openModalMovieCard.addEventListener('click', onModalMovieOpen);
refs.closeModalMovieBtn.addEventListener('click', onModalMovieClose);
refs.backdrop.addEventListener('click', onBackdropClose); // не работает
refs.targetMovie.addEventListener('click', createMovieCard);

// Open/Close Modal
function onModalMovieOpen() {
    document.body.classList.add('show-modal');
    window.addEventListener('keydown', onEscPress);
}

function onModalMovieClose() {
    document.body.classList.remove('show-modal');
    window.removeEventListener('keydown', onEscPress);
    
}

function onBackdropClose(e) {
    console.log("click");
    console.log(e.currentTarget);
    console.log(e.target);
}    

function onEscPress(e) {
    // console.log(e.code);
    if (e.code === 'Escape') {
        onModalMovieClose();
    }
}
// Create movieCard

function createMovieCard(e) {
    // if (e.target.closest('li.movie__gallery--items'));
    const idMovie = e.target.closest('li');
    console.log(idMovie.id);
    
    MovieApiById(idMovie.id);
    // createMovieCardById(idMovie);
}

async function MovieApiById(id) {
   
    try {
        const movieInfo = await axios.get(`${URL}${GET_MOVIE_INFO}${id}?api_key=${API_KEY_TMDb}&language=en-US`);
        // console.log(movieInfo.data);
        createMovieCardById(movieInfo)
    } catch (error) {
      console.log(error);
    }
}

function createMovieCardById(item) {
    const { poster_path, title, vote_average, vote_count, popularity, original_title, genres, genre_ids, overview } = item.data;
    console.log({ poster_path, title, vote_average, vote_count, popularity, original_title, genres, genre_ids, overview });
    // 
    console.log(genres);

    const markup = `
        <div class="movie__poster">
                <picture class="movie__poster--img">
                    <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt=${title} class="movie-poster__img" />
                </picture>
            </div>
            <div class="movie__about">
                <h2 class="movie__about--title">${title}</h2>
                <table>
                    <tr>
                        <td class="movie__table-menu">Vote / Votes</td>
                        <td class="movie__table-data"><span class="average">${vote_average.toFixed(1)}</span> / <span class="count">${Math.round(vote_count)}</span></td>
                    </tr>
                    <tr>
                        <td class="movie__table-menu">Popularity</td> 
                        <td class="movie__table-data">${popularity.toFixed(1)}</td>
                    </tr>
                    <tr>
                        <td class="movie__table-menu">Original Title</td>
                        <td class="movie__table-data">${original_title}</td>
                    </tr>
                    <tr>
                        <td class="movie__table-menu">Genre</td>
                        <td class="movie__table-data">${genre_ids} исправить</td>
                    </tr>
                </table>
                <div>
                    <h3 class="movie__about--subtitle">About</h3>
                    <p class="modal__about--discription">${overview}</p>
                </div>
                <div class="modal__buttons">
                    <button class="modal__button button-watched" type="button">add to Watched</button>
                    <button class="modal__button button-queue" type="button">add to queue</button>
                </div>
            </div>
        `;
    refs.modalCard.innerHTML = markup;
}
document.querySelector("#\\34 36270")