import { getTrendMovies } from './js/films';
import './js/genres-bar';
import './js/dark-mode';
import './js/modal-movie';
import { scrollUp } from './js/scrollToTop';
import './js/blinking-heart';
import './js/modal-students';

getTrendMovies();
scrollUp();
window.addEventListener('scroll', scrollUp);
