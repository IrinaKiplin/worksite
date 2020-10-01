$(document).ready(function(){
  $('.elements').addClass('elements--active');
});

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

$('.header__toggle').on('click', function(e) {
  e.preventDefault;
  $(this).toggleClass('header__toggle--active');
  $('.header__menu').toggleClass('header__menu--burger');
  $('.menu__list--row').toggleClass('menu__list--burger');
  $('body').toggleClass('scroll');
});


$(document).ready(function(){
  $('input[type="tel"]').inputmask({ "mask": "+7 (999) 999-99-99" });
    
  $('form').each(function () {
    $(this).validate({
      errorPlacement(error, element) {
        return true;
      },
      focusInvalid: false,    
      rules: {
        Телефон: {
          required: true,
          minlength: 18
        },
        Имя: {
          required: true,
        },
        ЭлектроннаяПочта: {
          required: true,
          email: true
        }
        /*Согласие: {
          required: true,
        },*/
      },

      messages: {
        Телефон: {
          required: 'Нужно что-то ввести',
          minlength: 'Введите 10 цифр'
        },
        Имя: {
          required: 'Нужно что-то ввести'
        },
        ЭлектроннаяПочта: {
          required: 'Нужно что-то ввести',
          email: 'Адрес электронной почты должен быть в формте name@domain.com'
        }
        /*Согласие: {
          required: 'Нужно проставить галочку с отметкой о согласии'
        },*/
      },

      submitHandler(form) {
        let th = $(form);

        $.ajax({
          type: 'POST',
          url: 'mail.php',
          data: th.serialize(),
        }).done(() => {
          $('.form__sented').addClass('form__sented--active');
          $('.form').removeClass('form--visible');
          console.log('отправлено');
          th.trigger('reset');
        });

        return false;
      }

    });
  });
});

function submitForm() {
  var formData = $('.form__data').val();
  if (formData.length !== 0) {
    $('.form__data').removeClass('error');
  } else {
    $('.form__data').addClass('error');
  };
};

$('.form__button').on('click', submitForm);

$('.form__close').on('click', function(e) {
  $('.form-overlay').removeClass('form-overlay--visible');
  $('.form__data').removeClass('error');
  $('.form__data').val('');
});

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
}
