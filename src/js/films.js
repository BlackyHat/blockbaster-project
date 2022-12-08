import { FilmsApiService } from './search-api';
import Pagination from 'tui-pagination';
import { container } from './pagination';
import { options } from './pagination';
import { hidePreloder, showPreloder } from './preloder';
const filmsApiService = new FilmsApiService();
const refs = {
  movieGallery: document.querySelector('.movie__gallery'),
};

export function getTrendMovies(pagePag = 1) {
  showPreloder();
  filmsApiService
    .getTrendingDataApi(pagePag)
    .then(({ results, total_results, total_pages }) => {
      let totalPages = total_pages;
      if (!total_results) {
        throw new Error();
      }
      createMarkup(results);

      if (pagePag < totalPages) {
        options.totalItems = totalPages;
        options.page = pagePag;
        const pagination = new Pagination(container, options);
        pagination.on('afterMove', function (event) {
          pagePag = event.page;
          getTrendMovies(pagePag);
        });
      }
      hidePreloder();
    })
    .catch(error => {
      hidePreloder();
      console.log(error);
    });
}

export function createMarkup(data) {
  const markup = data
    .map(el => {
      //
      const date = new Date(el.release_date);
      let genres_ids = [];
      //
      if (!el.genres) {
        el.genre_ids.forEach(el => {
          const arr = filmsApiService.genres_ids_array.genres;
          arr.forEach(({ id, name }) => {
            if (id === el) {
              genres_ids.push(name);
            }
          });
        });
        genres_ids = genres_ids.slice(0, 3);
      } else {
        genres_ids = el.genres.map(({name}) => name);
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
  //
  refs.movieGallery.innerHTML = markup;
}
