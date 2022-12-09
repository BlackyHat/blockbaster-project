import axios from 'axios';

import './js/blinking-heart.js';
import { hidePreloder, showPreloder } from './js/preloder';
import { API_KEY_TMDb } from './js/consts/api_key.js';

const URL = 'https://api.themoviedb.org/3';
const GET_GENRE_LIST = '/genre/movie/list';

let genres = [];
hidePreloder();

const filterRef = document.querySelector('.js-filters');

window.addEventListener('load', async () => {
  await getGenres()
  createMarkup(getMovies('watched'));
})

filterRef.addEventListener('click', evt => {
  const target = evt.target.closest('button');
  if (!target) return false;

  const movieType = target.dataset.type;
  target
    .closest('ul')
    .querySelector('.is-active')
    .classList.remove('is-active');
  target.classList.add('is-active');
  createMarkup(getMovies(movieType));
});

function getMovies(type) {
  const data = localStorage.getItem(type);
  if (data) return JSON.parse(data);
  return [];
}

function createMarkup(data) {
  const markup = data
    .map(el => {
      const date = new Date(el.release_date);
      let genres_ids = [];
      if (!el.genres?.length) {
        el.genre_ids.forEach(el => {
          const arr = genres;
          arr.forEach(({ id, name }) => {
            if (id === el) {
              genres_ids.push(name);
            }
          });
        });
        genres_ids = genres_ids.slice(0, 3);
      } else {
        genres_ids = el.genres.map(({ name }) => name);
      }

      return `<li class="gallery__item" id="${el.id}">
            <a class="film-card"">
                    <img src="https://image.tmdb.org/t/p/w500/${
                      el.poster_path
                    }" 
                        class="film-poster__img" loading="lazy" />
                <div class="info"">
                <p class="info__title">${el.title}</p>

                  <p class="info__genres">
                  ${genres_ids.join(', ')} | ${date.getFullYear()} 
        
               </p>
            </div>
            </a>
      </li>`;
    })
    .join('');

  const movieGallery = document.querySelector('.movie__gallery');
  movieGallery.innerHTML = markup;
}

async function getGenres () {
  const searchParams = new URLSearchParams({
    api_key: API_KEY_TMDb,
    page: 1,
    language: 'en',
  });

  genres = await axios.get(
    `${URL}${GET_GENRE_LIST}?${searchParams}`
  );
}
