import './js/blinking-heart.js';
import { hidePreloder, showPreloder } from './js/preloder';
import { scrollUp } from './js/scrollToTop.js';

import './js/modal-movie.js';
import * as noFilms from './img/no-films.png';

hidePreloder();

const filterRef = document.querySelector('.js-filters');

createMarkup(getMovies('watched'));

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
      // //
      if (!el.genres?.length) {
        el.genre_ids.forEach(el => {
          const arr = filmsApiService.genres_ids_array.genres;
          arr.forEach(({ id, name }) => {
            if (id === el) {
              genres_ids.push(name);
            }
          });
        });
        genres_ids = genres_ids.slice(0, 2);
      } else {
        genres_ids = el.genres.map(({ name }) => name);
      }
      //
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
  const noData = `<p class="my-lib__title">Try to add some movies...</p> <img class="my-lib__poster" src="${noFilms} alt="no film informatin" width="640">`;
  movieGallery.innerHTML = markup ? markup : noData;
}

const handleCloseModal = () => {
  window.addEventListener('message', evt => {
    const movieType = document.querySelector('.js-filters .is-active').dataset
      .type;

    if (evt.data === 'closeModal') {
      createMarkup(getMovies(movieType));
    }
  });
};

handleCloseModal();

scrollUp();
window.addEventListener('scroll', scrollUp);
