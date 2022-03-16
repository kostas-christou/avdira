const videoOverlayBtn = document.querySelector('.video__play-btn-container');

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
  slidesPerView: 1,
  grabCursor: true,
  navigation: {
    nextEl: '.meetings__swiper-button-next',
    prevEl: '.meetings__swiper-button-prev',
  },
});
