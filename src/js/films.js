import { FilmsApiService } from './search-api';

const filmsApiService = new FilmsApiService();
const refs = {
  movieGallery: document.querySelector('.movie__gallery'),
};

getTrendMovies();
function getTrendMovies() {
  filmsApiService
    .getTrendingDataApi()
    .then(({ page, results, total_results, total_pages }) => {
      if (!total_results) {
        throw new Error();
      }
      createMarkup(results);
    })
    .catch(error => {
      console.log(error);
    });
}

function createMarkup(data) {
  const markup = data
    .map(el => {
      //
      const date = new Date(el.release_date);
      const genres_ids = [];
      //
      el.genre_ids.forEach(el => {
        const arr = filmsApiService.genres_ids_array.genres;
        arr.forEach(({ id, name }) => {
          if (id === el) {
            genres_ids.push(name);
          }
        });
      });

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
                  <span class="info__rating">
                  ${el.vote_average.toFixed(1)}</span>
               </p>
            </div>
            </a>
</li>`;
    })
    .join('');
  //
  refs.movieGallery.innerHTML = markup;
}
