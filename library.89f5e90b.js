!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return o[e]=a,t.call(a.exports,a,a.exports),a.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){n[e]=t},t.parcelRequired7c6=a);var c=a("bpxeT"),i=a("2TvXO"),l=a("dIxxU"),d=a("2JYat"),r="https://api.themoviedb.org/3",s="/movie/",u={openModalMovieCard:document.querySelector("[data-modalMovie-open]"),closeModalMovieBtn:document.querySelector("[data-modalMovie-close]"),backdrop:document.querySelector(".js-modalMovie__backdrop"),targetMovie:document.querySelector(".movie__gallery"),modalCard:document.querySelector(".modalMovie__container")};function v(){document.body.classList.remove("show-modal"),window.removeEventListener("keydown",_)}function _(e){"Escape"===e.code&&v()}function p(){return(p=e(c)(e(i).mark((function t(o){var n;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.default.get("".concat(r).concat(s).concat(o,"?api_key=").concat(d.API_KEY_TMDb,"&language=en-US"));case 3:n=e.sent,console.log(n.data),m(n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0.message);case 11:case"end":return e.stop()}}),t,null,[[0,8]])})))).apply(this,arguments)}function m(e){var t=e.data,o=t.poster_path,n=t.title,a=t.vote_average,c=t.vote_count,i=t.popularity,l=t.original_title,d=t.genre_ids,r=t.overview;console.log({poster_path:o,title:n,vote_average:a,vote_count:c,popularity:i,original_title:l,genre_ids:d,overview:r});var s='\n        <div class="movie__poster">\n                <picture class="movie__poster--img">\n                    <img src="https://image.tmdb.org/t/p/w500/'.concat(o,'" alt=').concat(n,' class="movie-poster__img" />\n                </picture>\n            </div>\n            <div class="movie__about">\n                <h2 class="movie__about--title">').concat(n,'</h2>\n                <table>\n                    <tr>\n                        <td class="movie__table-menu">Vote / Votes</td>\n                        <td class="movie__table-data">').concat(a," / ").concat(c,'</td>\n                    </tr>\n                    <tr>\n                        <td class="movie__table-menu">Popularity</td>\n                        <td class="movie__table-data">').concat(i,'</td>\n                    </tr>\n                    <tr>\n                        <td class="movie__table-menu">Original Title</td>\n                        <td class="movie__table-data">').concat(l,'</td>\n                    </tr>\n                    <tr>\n                        <td class="movie__table-menu">Genre</td>\n                        <td class="movie__table-data">').concat(d,' исправить</td>\n                    </tr>\n                </table>\n                <div>\n                    <h3 class="movie__about--subtitle">About</h3>\n                    <p class="modal__about--discription">').concat(r,'</p>\n                </div>\n                <div class="modal__buttons">\n                    <button class="modal__button button-watched" type="button">add to Watched</button>\n                    <button class="modal__button button-queue" type="button">add to queue</button>\n                </div>\n            </div>\n        ');u.modalCard.innerHTML=s}u.openModalMovieCard.addEventListener("click",(function(){document.body.classList.add("show-modal"),window.addEventListener("keydown",_)})),u.closeModalMovieBtn.addEventListener("click",v),u.backdrop.addEventListener("click",(function(e){console.log("click"),console.log(e.currentTarget),console.log(e.target)})),u.targetMovie.addEventListener("click",(function(e){var t=e.target.closest("li");console.log(t.id),function(e){p.apply(this,arguments)}(t.id)}))}();
//# sourceMappingURL=library.89f5e90b.js.map
