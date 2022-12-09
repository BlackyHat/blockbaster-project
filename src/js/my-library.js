import { createMarkup } from './films.js';

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
