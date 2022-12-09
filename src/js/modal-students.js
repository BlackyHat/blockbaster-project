import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

new SimpleBar(document.getElementById('bar'));

const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
};


document.addEventListener('click', (e) => {
    if (e.target.id === refs.openModalBtn.id) {
        e.preventDefault();
    }
});
  
  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }