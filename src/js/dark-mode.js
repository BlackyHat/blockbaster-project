const checkbox = document.querySelector('input[name=mode]'),
  wrapper = document.querySelector('html');

wrapper.classList.add('theme--dark');

checkbox.addEventListener('change', function () {
  if (this.checked) {
    wrapper.classList.add('theme--default');
    wrapper.classList.remove('theme--dark');
  } else {
    wrapper.classList.add('theme--dark');
    wrapper.classList.remove('theme--default');
  }
});
