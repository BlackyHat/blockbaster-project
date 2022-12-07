const TIME_DELAY = 500;

window.addEventListener('load', function () {
  setTimeout(function () {
    document.body.classList.add('loaded');
  }, TIME_DELAY);
});

export function showPreloder() {
  document.body.classList.remove('loaded');
}

export function hidePreloder() {
  setTimeout(function () {
    document.body.classList.add('loaded');
  }, TIME_DELAY);
}
