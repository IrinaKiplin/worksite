$(document).ready(function(){
 
//летающие элементы  
  $('.elements').addClass('elements--active');

//слайдер
new Swiper('.slider', {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    1024: {
      slidesPerView: 2,
      spaceBetween: 35
    },
    1201: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  },
  loop: true,
  wrapperClass: 'slider__list',
  slideClass: 'slider__item',
  pagination: {
    el: '.slider__pagination',
    type: 'bullets',
    bulletClass: 'paginator__item',
    bulletActiveClass: 'paginator__item--active',
    clickable: true
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    paginationBulletMessage: 'Перейти к слайду {{index}}'
  },
  navigation: {
    nextEl: '.slider__button--next',
    prevEl: '.slider__button--prev'
  }
});

//бургер-меню
$('.header__toggle').on('click', function(e) {
  e.preventDefault;
  $(this).toggleClass('header__toggle--active');
  $('.header__menu').toggleClass('header__menu--burger');
  $('.menu__list--row').toggleClass('menu__list--burger');
  $('body').toggleClass('scroll');
});

//форма отправки,модальные окна
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
      $('.form__agree').removeClass('checked--error');
      $('.form__checked').prop('checked', false);

    });
    formData.forEach((el) => {
      el.classList.remove('error');
      $('.form__data').val('');
    });    
  }
});

//Проверка формы на пустые поля
function submitForm() {
  var formData = $('.form__data').val();  
  if (formData.length !== 0) {
    $('.form__data').removeClass('error');
  } else {
    $('.form__data').addClass('error');
  };  
};
$('.form__button').on('click', submitForm);

//Проверка формы на флажок согласия
function agreeForm() {  
  if ($('.form__checked').is(':checked')) {
    $(this).parent().find('.form__agree').removeClass('checked--error');
  } else {
    $(this).parent().find('.form__agree').addClass('checked--error');
  }  
};
$('.form__check').on('click', agreeForm);

$('.form').submit(function (e) {
  if ($(this).find('.form__checked').prop('checked') === false) {
    $('.form__agree').addClass('checked--error');
  } else {
    $('.form__agree').removeClass('checked--error');
  }
});

//маска
$('input[type="tel"]').inputmask({ "mask": "+7 (999) 999-99-99" });

//отправка формы, валидность
$('form').each(function() {  
  $(this).validate({
    errorPlacement(error, element) {
      return true;
    },
    focusInvalid: false,    
    rules: {
      name: 'required',
      phone: {
        required: true,
        minlength: 12
      },
      mail: {
        required: true,
        email: true
      },
      agree: 'required'
    },
    messages: {
      name: 'Нужно что-то ввести',
      phone: {
        required: 'Нужно что-то ввести',
        minlength: 'Введите 10 цифр'
      },
      mail: {
        required: 'Нужно что-то ввести',
        email: 'Адрес электронной почты должен быть в формте name@domain.com'
      },
      agree: 'Пожалуйста, проставьте галочку о согласии на обработку'
    },      
    submitHandler(form) {
      let th = $(form);        
      $.ajax({
        type: 'POST',
        url: 'ml.php',
        data: th.serialize(),
      }).done(() => {
        th.trigger('reset');
        $('.form__sented').addClass('form__sented--active');
        $('.form').removeClass('form--visible');
        console.log('отправлено');
      });
      return false;
      }        
  });  
});

//Закрытие формы по крестику
$('.form__close').on('click', function(e) {
  $('.form-overlay').removeClass('form-overlay--visible');
  $('.form__data').removeClass('error');
  $('.form__data').val('');
  $('.form__agree').removeClass('checked--error');
  $('.form__checked').prop('checked', false);
});

//Пролистывание по клику на элементы меню
let menuElements = document.querySelectorAll('.menu__link');
for (let i = 0; i < menuElements.length; i++) {
  menuElements[i].addEventListener('click', function(e){
    e.preventDefault();
    let href = this.getAttribute('href');
    let currentSection = document.getElementById(href);
    let offset = currentSection.offsetTop;
    $('.header__menu').removeClass('header__menu--burger');
    $('.menu__list--row').removeClass('menu__list--burger');
    $('.header__toggle').removeClass('header__toggle--active');  
    $('body').removeClass('scroll');
    $('body,html').animate({scrollTop: offset}, 1500);
  })  
};

});