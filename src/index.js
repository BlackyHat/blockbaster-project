import { getTrendMovies } from './js/films.js';
import './js/genres-bar';
import './js/modal-movie.js';
import { scrollUp } from './js/scrollToTop.js';
import './js/blinking-heart.js';
import './js/modal-students.js';

getTrendMovies();
scrollUp();
window.addEventListener('scroll', scrollUp);
