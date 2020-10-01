const btns = document.querySelectorAll('.btn');
const formOverLay = document.querySelector('.form-overlay');
const forms = document.querySelectorAll('.form');
const formData = document.querySelectorAll('.form__data');

btns.forEach((el) => {
  el.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');

    forms.forEach((el) => {
      el.classList.remove('form--visible');
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('form--visible');
    formOverLay.classList.add('form-overlay--visible');
  });
});

formOverLay.addEventListener('click', (e) => {
  if (e.target == formOverLay) {
    formOverLay.classList.remove('form-overlay--visible');
    forms.forEach((el) => {
      el.classList.remove('form--visible');
      $('.form__sented').removeClass('form__sented--active');      
    });
    formData.forEach((el) => {
      el.classList.remove('error');
      $('.form__data').val('');
    });
  }
});