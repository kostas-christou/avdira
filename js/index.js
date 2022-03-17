const videoOverlayBtn = document.querySelector('.video__play-btn-container');

// Hamburger menu listener
const hamMenu = document.querySelector('.header__ham-menu');
hamMenu.addEventListener('click', () => {
  if (hamMenu.classList.contains('header__ham-menu--open')) {
    hamMenu.classList.remove('header__ham-menu--open');
    hamMenu.classList.add('header__ham-menu--close');
  } else {
    hamMenu.classList.remove('header__ham-menu--close');
    hamMenu.classList.add('header__ham-menu--open');
  }
});

// Hide video overlay on click
if (videoOverlayBtn) {
  videoOverlayBtn.addEventListener('click', () => {
    const videoOverlay = document.querySelector('.video__overlay');
    videoOverlay.style.zIndex = '-1';
  });
}

// Back to top functionallity
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  backToTop.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

// Calendar functionallity
if (document.getElementById('color-calendar')) {
  new Calendar({
    id: '#color-calendar',
    calendarSize: 'small',
  });
}

// Swiper (slider) config
const meetingsSwiper = new Swiper('.meetings__swiper', {
  slidesPerView: 1.4,
  spaceBetween: 60,
  grabCursor: true,
  navigation: {
    nextEl: '.meetings__swiper-button-next',
    prevEl: '.meetings__swiper-button-prev',
  },
});

const quickAccessSwiper = new Swiper('.quick-access__swiper', {
  slidesPerView: 2.4,
  spaceBetween: 40,
  grabCursor: true,
  navigation: {
    nextEl: '.quick-access__swiper-button-next',
    prevEl: '.quick-access__swiper-button-prev',
  },
});
