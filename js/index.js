// Hamburger menu listener
const hamMenu = document.querySelector('.header__ham-menu');
const fullMenuLeft = document.querySelector('.full-menu--left');
const fullMenuRight = document.querySelector('.full-menu--right');

hamMenu.addEventListener('click', (e) => {
  e.stopPropagation();

  if (hamMenu.classList.contains('header__ham-menu--open')) {
    hamMenu.classList.remove('header__ham-menu--open');
    hamMenu.classList.add('header__ham-menu--close');
    fullMenuLeft.classList.remove('full-menu--collapse');
    fullMenuLeft.classList.add('full-menu--expand');
    fullMenuRight.classList.remove('full-menu--collapse');
    fullMenuRight.classList.add('full-menu--expand');
  } else {
    hamMenu.classList.remove('header__ham-menu--close');
    hamMenu.classList.add('header__ham-menu--open');
    fullMenuLeft.classList.add('full-menu--collapse');
    fullMenuLeft.classList.remove('full-menu--expand');
    fullMenuRight.classList.add('full-menu--collapse');
    fullMenuRight.classList.remove('full-menu--expand');
  }
});

// Close all open menus when clicking outside
document.addEventListener('click', (e) => {
  const menusOpen = document.querySelectorAll('.full-menu--expand');

  if (menusOpen.length > 0) {
    console.log('Menus open!');
    let menuRemainOpen = [];

    menusOpen.forEach((menu) => {
      if (menu.contains(e.target)) {
        menuRemainOpen.push('true');
      } else {
        menuRemainOpen.push('false');
      }
    });

    if (menuRemainOpen.indexOf('true') === -1) {
      hamMenu.classList.remove('header__ham-menu--close');
      hamMenu.classList.add('header__ham-menu--open');
      fullMenuLeft.classList.remove('full-menu--expand');
      fullMenuLeft.classList.add('full-menu--collapse');
      fullMenuRight.classList.remove('full-menu--expand');
      fullMenuRight.classList.add('full-menu--collapse');
    }
  }
});

// Back-to-top button functionallity
const backToTop = document.querySelector('.back-to-top');

function checkPosition() {
  let windowY = window.scrollY;
  let screenHeight = screen.height;

  if (windowY < screenHeight) {
    backToTop.classList.add('hide');
  } else {
    backToTop.classList.remove('hide');
  }
}

if (backToTop) {
  window.addEventListener('scroll', checkPosition);

  backToTop.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

// Hide video overlay on click and show youtube video
const videoOverlayButtons = document.querySelectorAll(
  '.video__play-btn-container'
);
if (videoOverlayButtons.length > 0) {
  videoOverlayButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      showVideo(e);
    });
  });
}

function showVideo(e) {
  const videoOverlay = e.target.parentElement;

  videoOverlay.style.display = 'none';
}

// Calendar functionallity
if (document.getElementById('color-calendar')) {
  new Calendar({
    id: '#color-calendar',
    calendarSize: 'small',
  });
}

//// Playing with calendar
const calendarBody = document.querySelector('.calendar__body');
calendarBody.addEventListener('click', (e) => {
  const calendarDay = document.querySelector('.calendar__day-selected');
  const calendarHeader =
    calendarDay.parentElement.parentElement.previousElementSibling;
  const calendarMonth = calendarHeader.querySelector('.calendar__month');
  const calendarYear = calendarHeader.querySelector('.calendar__year');
  let day = calendarDay.firstElementChild.textContent;
  let month = calendarMonth.textContent;
  let year = calendarYear.textContent;
  console.log(`See all events on ${day}/${month}/${year}`);
});

// Swiper (slider) config
const meetingsSwiper = new Swiper('.meetings__swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  grabCursor: true,
  breakpoints: {
    1000: {
      slidesPerView: 1.4,
      spaceBetween: 60,
    },
    1350: {
      slidesPerView: 1.4,
      spaceBetween: 60,
    },
    1850: {
      slidesPerView: 1.4,
      spaceBetween: 60,
    },
  },
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

const civilProtectionSwiper = new Swiper('.civil-protection__swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  grabCursor: true,
  breakpoints: {
    850: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    1350: {
      slidesPerView: 2.5,
      spaceBetween: 40,
    },
    1850: {
      slidesPerView: 3.5,
      spaceBetween: 50,
    },
  },
  navigation: {
    nextEl: '.civil-protection__swiper-button-next',
    prevEl: '.civil-protection__swiper-button-prev',
  },
});
