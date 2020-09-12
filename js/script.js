$(document).ready(function(){

  $('.elements').addClass('elements--active');

});

new Swiper('.slider', {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    1025: {
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
        
        ЭлектроннаяПочта: {
          required: true,
        }
      },
      messages: {
        Телефон: {
          required: 'Нужно что-то ввести'
        },
        Имя: {
          required: 'Нужно что-то ввести'
        },
        ЭлектроннаяПочта: {
          required: 'Нужно что-то ввести'
        }
      },
      submitHandler(form) {
      let th = $(form);

      $.ajax({
      type: 'POST',
      url: 'mail.php',
      data: th.serialize(),
    }).done(() => {

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
  setTimeout(
    function() {
        window.scrollTo(0, offset);
    }, 300);
  $('body').removeClass('scroll');
  })
}
