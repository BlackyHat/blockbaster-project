import { URL, GET_GENRE_LIST, searchMovieByQuery } from './search-api.js';

function createMarkup(genresArr) {
  const genres = genresArr.map(el => el.name);
  return genres
    .map(genre => {
      return ` <li class="genres__item"">
            <button data-value="${genre.toLowerCase()}">${genre.toLowerCase()}</ button>
                        </li>`;
    })
    .join('');
}

export function renderButtons(arr) {
  const refs = {
    genreBtn: document.querySelector('.genres-bar'),
  };
  const markup = createMarkup(arr);
  refs.genreBtn.innerHTML = markup;
  refs.genreBtn.addEventListener('click', getPopularByGenres);
}

function getPopularByGenres(e) {
  searchMovieByQuery(e.target.dataset.value);
}
