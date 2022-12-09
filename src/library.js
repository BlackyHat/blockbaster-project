import './js/blinking-heart.js';
import { hidePreloder, showPreloder } from './js/preloder';

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
      // if (!el.genres) {
      //   el.genre_ids.forEach(el => {
      //     const arr = filmsApiService.genres_ids_array.genres;
      //     arr.forEach(({ id, name }) => {
      //       if (id === el) {
      //         genres_ids.push(name);
      //       }
      //     });
      //   });
      //   genres_ids = genres_ids.slice(0, 3);
      // } else {
      // console.log(el.genres);


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
