// import SimpleBar from 'simplebar';
// import 'simplebar/dist/simplebar.css';

// new SimpleBar(document.getElementById('bar'));
const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  backdrop: document.querySelector('.backdrop'),
};

document.addEventListener('click', e => {
  if (e.target.id === refs.openModalBtn.id) {
    e.preventDefault();
  }
});
console.log(refs.closeModalBtn);

refs.openModalBtn.addEventListener('click', openModal);

function openModal() {
  refs.modal.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscPress);
  refs.closeModalBtn.addEventListener('click', closeModal);
  refs.backdrop.addEventListener('click', e => {
    if (e.target.classList.contains('backdrop')) {
      closeModal();
    }
  });
}
function closeModal() {
  refs.modal.classList.add('is-hidden');
}
function onEscPress(e) {
  if (e.code === 'Escape') {
    closeModal();
    window.removeEventListener('keydown', onEscPress);
  }
}
