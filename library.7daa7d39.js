!function(){function e(e,n,r,t){Object.defineProperty(e,n,{get:r,set:t,enumerable:!0,configurable:!0})}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var i={id:e,exports:{}};return r[e]=i,n.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){t[e]=n},n.parcelRequired7c6=i),i.register("iE7OH",(function(n,r){var t,i;e(n.exports,"register",(function(){return t}),(function(e){return t=e})),e(n.exports,"resolve",(function(){return i}),(function(e){return i=e}));var o={};t=function(e){for(var n=Object.keys(e),r=0;r<n.length;r++)o[n[r]]=e[n[r]]},i=function(e){var n=o[e];if(null==n)throw new Error("Could not resolve bundle with id "+e);return n}})),i.register("aNJCr",(function(n,r){var t;e(n.exports,"getBundleURL",(function(){return t}),(function(e){return t=e}));var i={};function o(e){return(""+e).replace(/^((?:https?|file|ftp|(chrome|moz)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}t=function(e){var n=i[e];return n||(n=function(){try{throw new Error}catch(n){var e=(""+n.stack).match(/(https?|file|ftp|(chrome|moz)-extension):\/\/[^)\n]+/g);if(e)return o(e[2])}return"/"}(),i[e]=n),n}})),i("iE7OH").register(JSON.parse('{"2Y0K8":"library.7daa7d39.js","fdBXP":"no-films.bd757f1e.png","7nwxg":"library.a6faaccf.js"}')),i("lb3to"),i("iSEZc");var o=i("2T02J"),a=i("bKWtT");i("9tAMN");var s;s=i("aNJCr").getBundleURL("2Y0K8")+i("iE7OH").resolve("fdBXP"),(0,o.hidePreloder)();var c=document.querySelector(".js-filters");function l(e){var n=localStorage.getItem(e);return n?JSON.parse(n):[]}function u(e){var n=e.map((function(e){var n,r=new Date(e.release_date),t=[];return(null===(n=e.genres)||void 0===n?void 0:n.length)?t=e.genres.map((function(e){return e.name})):(e.genre_ids.forEach((function(e){filmsApiService.genres_ids_array.genres.forEach((function(n){var r=n.id,i=n.name;r===e&&t.push(i)}))})),t=t.slice(0,2)),'<li class="gallery__item" id="'.concat(e.id,'">\n            <a class="film-card"">\n                    <img src="https://image.tmdb.org/t/p/w500/').concat(e.poster_path,'" \n                        class="film-poster__img" loading="lazy" />\n                <div class="info"">\n                <p class="info__title">').concat(e.title,'</p>\n\n                  <p class="info__genres">\n                  ').concat(t.join(", ")," | ").concat(r.getFullYear()," \n        \n               </p>\n            </div>\n            </a>\n      </li>")})).join(""),r=document.querySelector(".movie__gallery"),t='<p class="my-lib__title">Try to add some movies...</p> <img class="my-lib__poster" src="'.concat(s,' alt="no film informatin" width="640">');r.innerHTML=n||t}u(l("watched")),c.addEventListener("click",(function(e){var n=e.target.closest("button");if(!n)return!1;var r=n.dataset.type;n.closest("ul").querySelector(".is-active").classList.remove("is-active"),n.classList.add("is-active"),u(l(r))}));window.addEventListener("message",(function(e){var n=document.querySelector(".js-filters .is-active").dataset.type;"closeModal"===e.data&&u(l(n))})),(0,a.scrollUp)(),window.addEventListener("scroll",a.scrollUp)}();
//# sourceMappingURL=library.7daa7d39.js.map
