const svg = document.querySelector('.footer__icon');
function blickSvg() {
  setInterval(() => {
    svg.classList.toggle('footer__icon-blick');
  }, 800);
}
blickSvg();
