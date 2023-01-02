import axios from 'axios';
import { API_KEY_TMDb } from './consts/api_key.js';
import { hidePreloder, showPreloder } from './preloder.js';
import * as noPoster from '../img/no-poster-available.png';

//
const URL = 'https://api.themoviedb.org/3';
const GET_MOVIE_INFO = '/movie/';
const URL_GET_IMG = 'https://image.tmdb.org/t/p/w500/';

const refs = {
  openModalMovieCard: document.querySelector('[modal-movie-open]'),
  closeModalMovieBtn: document.querySelector('[modal-movie-close]'),
  backdrop: document.querySelector('.js-modalMovie__backdrop'),
  targetMovie: document.querySelector('.movie__gallery'),
  modalCard: document.querySelector('.modalMovie__container'),
};

refs.openModalMovieCard.addEventListener('click', onModalMovieOpen);
refs.closeModalMovieBtn.addEventListener('click', onModalMovieClose);
refs.backdrop.addEventListener('click', onBackdropClose);
refs.targetMovie.addEventListener('click', createMovieCard);

// Open/Close Modal
function onModalMovieOpen(e) {
  if (e.target.nodeName === 'UL') {
    return;
  }
  document.body.classList.add('show-modal');
  window.addEventListener('keydown', onEscPress);
}

function onModalMovieClose() {
  document.body.classList.remove('show-modal');
  window.removeEventListener('keydown', onEscPress);
  window.postMessage('closeModal');
  setTimeout(() => {
    refs.modalCard.innerHTML = '';
  }, 500);
}

function onBackdropClose(e) {
  if (e.currentTarget === e.target) {
    onModalMovieClose();
  }
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    onModalMovieClose();
  }
}
// Create movieCard

function createMovieCard(e) {
  const idMovie = e.target.closest('li');
  if (idMovie) {
    MovieApiById(idMovie.id);
  }
}

async function MovieApiById(id) {
  if (!id) {
    return;
  }
  try {
    showPreloder();
    const movieInfo = await axios.get(
      `${URL}${GET_MOVIE_INFO}${id}?api_key=${API_KEY_TMDb}&language=en-US`
    );
    console.log(movieInfo);
    createMovieCardById(movieInfo);
    hidePreloder();
  } catch (error) {
    console.log(error);
    hidePreloder();
  }
}
// =====================================================================================================================================
function getMoviesFromLocalStorage() {
  //watched
  const saveWatched = localStorage.getItem('watched');
  const parsWatched = JSON.parse(saveWatched);

  if (parsWatched === null) {
    return;
  } else {
    watchedDb = parsWatched;
  }

  //Queued
  const saveQueue = localStorage.getItem('queue');
  const parsQueue = JSON.parse(saveQueue);

  if (parsQueue === null) {
    return;
  } else {
    queueDb = parsQueue;
  }
}

let watchedDb = [];
let queueDb = [];
getMoviesFromLocalStorage();
// add to watched
function addToWatched(obj) {
  watchedDb.push(obj);

  localStorage.setItem('watched', JSON.stringify(watchedDb));
}
function removeFromWatched(index) {
  watchedDb.splice(index, 1);

  localStorage.setItem('watched', JSON.stringify(watchedDb));
}
// add to Queue
function addToQueue(obj) {
  queueDb.push(obj);

  localStorage.setItem('queue', JSON.stringify(queueDb));
}

function removeFromQueue(index) {
  queueDb.splice(index, 1);

  localStorage.setItem('queue', JSON.stringify(queueDb));
}

// ==============================================================================================================================
function createMovieCardById(item) {
  const {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    genre_ids,
    overview,
    id,
    release_date,
  } = item.data;
  // Movie data for local storage
  const movieData = {
    poster_path,
    title,
    original_title,
    genres,
    genre_ids,
    id,
    release_date,
  };
  const isTrailerIn = +release_date.slice(0, 4) > 2010;
  currentMovie = movieData;
  const genreInfoNormalized =
    genres.length > 0 ? genres[0].name : 'No genres info';

  const markup = `
        <div class="movie__poster">
                <picture class="movie__poster--img">
                    <img src="${checkPoster(
                      poster_path
                    )}" alt=${title} class="movie-poster__img" />
                </picture>
                                <button type="button" class="movie-treiler ${
                                  !isTrailerIn ? 'visually-hidden' : ''
                                } " data-id=${id}></button>
            </div>
            <div class="movie__about">
                <h2 class="movie__about--title">${title}</h2>
                <table>
                    <tr>
                        <td class="movie__table-menu">Vote / Votes</td>
                        <td class="movie__table-number"><span class="average">${vote_average.toFixed(
                          1
                        )}</span> / <span class="count">${Math.round(
    vote_count
  )}</span></td>
                    </tr>
                    <tr>
                        <td class="movie__table-menu">Popularity</td> 
                        <td class="movie__table-number">${popularity.toFixed(
                          1
                        )}</td>
                    </tr>
                    <tr>
                        <td class="movie__table-menu">Original Title</td>
                        <td class="movie__table-data">${original_title}</td>
                    </tr>
                    <tr>
                        <td class="movie__table-menu">Genre</td>
                        <td class="movie__table-genres">${genreInfoNormalized}</td></tr>
                </table>
                <div>
                    <h3 class="movie__about--subtitle">About</h3>
                    <p class="modal__about--discription">${
                      overview || 'No overview ino'
                    }</p>
                </div>
                <div class="modal__buttons">
                    <button class="modal__button button-watched" type="button">${changeTextButtonWatched()}</button>
                    <button class="modal__button button-queue" type="button">${changeTextButtonQueue()}</button>
                </div>
            </div>
        `;
  refs.modalCard.innerHTML = markup;
  //  ==================================================================================================================

  const addToWatchedRef = document.querySelector('.button-watched');
  const addToQueueRef = document.querySelector('.button-queue');
  const addPlayTrailer = document.querySelector('.movie-treiler');
  addToWatchedRef.addEventListener('click', clickOnWatched);
  addToQueueRef.addEventListener('click', clickOnQueue);
  addPlayTrailer.addEventListener('click', clickOnPlay);
  function changeBgColorButton() {
    const chekMovieId2 = watchedDb.some(movie => movie.id === currentMovie.id);
    if (!chekMovieId2) {
      addToWatchedRef.classList.remove('modal__button--watched');
    } else {
      addToWatchedRef.classList.add('modal__button--watched');
    }
    const chekMovieId1 = queueDb.some(movie => movie.id === currentMovie.id);
    if (!chekMovieId1) {
      addToQueueRef.classList.remove('modal__button--watched');
    } else {
      addToQueueRef.classList.add('modal__button--watched');
    }
  }
  changeBgColorButton();
  // =====================================================================================================================
}
// ============================================================================================
let currentMovie = {};
function clickOnWatched(e) {
  const chekMovieId = watchedDb.some(movie => movie.id === currentMovie.id);
  if (!chekMovieId) {
    addToWatched(currentMovie);
    e.target.textContent = 'Remove From Watched';
  } else {
    const findIndex = watchedDb.findIndex(
      movie => movie.id === currentMovie.id
    );
    removeFromWatched(findIndex);
    e.target.textContent = 'Add To Watched';
  }
}
function clickOnQueue(e) {
  const chekMovieId = queueDb.some(movie => movie.id === currentMovie.id);
  if (!chekMovieId) {
    addToQueue(currentMovie);
    e.target.textContent = 'Remove From Queue';
  } else {
    const findIndex = queueDb.findIndex(movie => movie.id === currentMovie.id);
    removeFromQueue(findIndex);
    e.target.textContent = 'Add To Queue';
  }
}

function changeTextButtonWatched() {
  const chekMovieId2 = watchedDb.some(movie => movie.id === currentMovie.id);
  let textButton = '';
  if (!chekMovieId2) {
    textButton = 'Add To Watched';
  } else {
    textButton = 'Remove From Watched';
  }
  return textButton;
}

function changeTextButtonQueue() {
  const chekMovieId2 = queueDb.some(movie => movie.id === currentMovie.id);
  let textButton = '';
  if (!chekMovieId2) {
    textButton = 'Add To Queue';
  } else {
    textButton = 'Remove From Queue';
  }
  return textButton;
}

// =========================================================================================================================
// =========================================================================================================================

function clickOnPlay(e) {
  const idMovie = e.target.dataset.id;
  getTrailer(idMovie).then(({ results }) => {
    let key = results[0].key;
    renderYoutubeFrame(key);
  });
}

async function getTrailer(id) {
  try {
    const searchParams = new URLSearchParams({
      api_key: API_KEY_TMDb,
      language: 'en',
    });
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?${searchParams}`;
    const response = await axios.get(url);
    if (!response) {
      throw new Error('Something goes wrong');
    }
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

const renderYoutubeFrame = movieKey => {
  refs.modalCard.innerHTML = `<iframe allowfullscreen frameborder="0" src="https://www.youtube.com/embed/${movieKey}?autoplay=1" 
  class="iframe"></iframe>`;
};
// =========================================================================================================================
function checkPoster(img) {
  if (img) {
    return `https://image.tmdb.org/t/p/w500/${img}`;
  }
  return noPoster;
}
