var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var d={id:e,exports:{}};return t[e]=d,n.call(d.exports,d,d.exports),d.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n);var d=n("2shzp"),a=n("OemQu");function i(){document.body.classList.remove("loaded")}function s(){setTimeout((function(){document.body.classList.add("loaded")}),500)}window.addEventListener("load",(function(){setTimeout((function(){document.body.classList.add("loaded")}),500)}));const l={openModalMovieCard:document.querySelector("[modal-movie-open]"),closeModalMovieBtn:document.querySelector("[modal-movie-close]"),backdrop:document.querySelector(".js-modalMovie__backdrop"),targetMovie:document.querySelector(".movie__gallery"),modalCard:document.querySelector(".modalMovie__container")};function c(){document.body.classList.remove("show-modal"),window.removeEventListener("keydown",r)}function r(e){"Escape"===e.code&&c()}l.openModalMovieCard.addEventListener("click",(function(){document.body.classList.add("show-modal"),window.addEventListener("keydown",r)})),l.closeModalMovieBtn.addEventListener("click",c),l.backdrop.addEventListener("click",(function(e){e.currentTarget===e.target&&c()})),l.targetMovie.addEventListener("click",(function(e){const t=e.target.closest("li");console.log(t.id),async function(e){try{i();!function(e){const{poster_path:t,title:o,vote_average:n,vote_count:d,popularity:a,original_title:i,genres:s,genre_ids:c,overview:r,id:b,release_date:g}=e.data;v={poster_path:t,title:o,original_title:i,genres:s,id:b,release_date:g};const f=`\n        <div class="movie__poster">\n                <picture class="movie__poster--img">\n                    <img src="https://image.tmdb.org/t/p/w500/${t}" alt=${o} class="movie-poster__img" />\n                </picture>\n            </div>\n            <div class="movie__about">\n                <h2 class="movie__about--title">${o}</h2>\n                <table>\n                    <tr>\n                        <td class="movie__table-menu">Vote / Votes</td>\n                        <td class="movie__table-number"><span class="average">${n.toFixed(1)}</span> / <span class="count">${Math.round(d)}</span></td>\n                    </tr>\n                    <tr>\n                        <td class="movie__table-menu">Popularity</td> \n                        <td class="movie__table-number">${a.toFixed(1)}</td>\n                    </tr>\n                    <tr>\n                        <td class="movie__table-menu">Original Title</td>\n                        <td class="movie__table-data">${i}</td>\n                    </tr>\n                    <tr>\n                        <td class="movie__table-menu">Genre</td>\n                        <td class="movie__table-genres">${s[0].name}</td>\n                    </tr>\n                </table>\n                <div>\n                    <h3 class="movie__about--subtitle">About</h3>\n                    <p class="modal__about--discription">${r}</p>\n                </div>\n                <div class="modal__buttons">\n                    <button class="modal__button button-watched" type="button">${function(){const e=u.some((e=>e.id===v.id));let t="";t=e?"Remove From Watched":"Add To Watched";return t}()}</button>\n                    <button class="modal__button button-queue" type="button">${function(){const e=m.some((e=>e.id===v.id));let t="";t=e?"Remove From Queue":"Add To Queue";return t}()}</button>\n                </div>\n            </div>\n        `;l.modalCard.innerHTML=f;const h=document.querySelector(".button-watched"),y=document.querySelector(".button-queue");function w(){u.some((e=>e.id===v.id))?h.classList.add("modal__button--watched"):h.classList.remove("modal__button--watched");m.some((e=>e.id===v.id))?y.classList.add("modal__button--watched"):y.classList.remove("modal__button--watched")}h.addEventListener("click",_),y.addEventListener("click",p),w()}(await d.default.get(`https://api.themoviedb.org/3/movie/${e}?api_key=${a.API_KEY_TMDb}&language=en-US`)),s()}catch(e){console.log(e),s()}}(t.id)}));let u=[],m=[];!function(){const e=localStorage.getItem("watched"),t=JSON.parse(e);if(null===t)return;u=t;const o=localStorage.getItem("queue"),n=JSON.parse(o);null!==n&&(m=n)}();let v={};function _(e){if(u.some((e=>e.id===v.id))){const o=u.findIndex((e=>e.id===v.id));t=o,u.splice(t,1),localStorage.setItem("watched",JSON.stringify(u)),e.target.textContent="Add To Watched"}else o=v,u.push(o),localStorage.setItem("watched",JSON.stringify(u)),e.target.textContent="Remove From Watched";var t,o}function p(e){if(m.some((e=>e.id===v.id))){const o=m.findIndex((e=>e.id===v.id));t=o,m.splice(t,1),localStorage.setItem("queue",JSON.stringify(m)),e.target.textContent="Add To Queue"}else o=v,m.push(o),localStorage.setItem("queue",JSON.stringify(m)),e.target.textContent="Remove From Queue";var t,o}
//# sourceMappingURL=library.c6da0298.js.map