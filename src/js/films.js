import { FilmsApiService } from './search-api';

const filmsApiService = new FilmsApiService();
// на вкладці network вже є дані котрі можна рендерити та додавати до search api метод роботи з пошукоими запитами
console.log(filmsApiService.getTrendingDataApi());
