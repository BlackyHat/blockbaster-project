import throttle from 'lodash.throttle';

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function scrollToEnd() {
  const scrollHeigth = document.documentElement.scrollHeight;
  window.scrollTo({
    top: scrollHeigth,
    behavior: 'smooth',
  });
}

export const scrollUp = throttle(() => {
  console.log(window.scrollY);
  const buttonUpRef = document.querySelector('.scroll-to-top');
  buttonUpRef.addEventListener('click', scrollToEnd);

  if (window.scrollY > document.documentElement.scrollHeight / 3) {
    buttonUpRef.classList.remove('scroll-to-end');
    buttonUpRef.addEventListener('click', scrollToTop);
    buttonUpRef.removeEventListener('click', scrollToEnd);
  } else {
    buttonUpRef.classList.add('scroll-to-end');
    buttonUpRef.removeEventListener('click', scrollToTop);
    buttonUpRef.addEventListener('click', scrollToEnd);
  }
}, 750);
