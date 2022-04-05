const expandLinks = document.querySelectorAll('.expand-link');
const hamMenu = document.querySelector('.header__ham-menu');
const headerNav = document.querySelector('.header__nav');
const asideRight = document.querySelector('.aside--right');
const fullMenusLeft = document.querySelectorAll('.full-menu--left');
const fullMenuRight = document.querySelector('.full-menu--right');
const fullMenuOverlay = document.querySelector('.full-menu__overlay');
const fullMenuBackButtons = document.querySelectorAll('.full-menu__back-btn');
const parallaxWrapper = document.querySelector('.parallax-wrapper');
const backToTop = document.querySelector('.back-to-top');
const mediaQueryMax880 = window.matchMedia('(max-width: 54.99em)');
const mediaQueryMax1366 = window.matchMedia('(max-width: 85.374em)');
const mediaQueryMin1366 = window.matchMedia('(min-width: 85.375em)');
const weatherTemp = document.querySelector('.header__weather-temp');
const weatherIcon = document.querySelector('.header__weather-icon');
const accessBtn = document.getElementById('universalAccessBtn');
const cookies = document.querySelector('.cookies');
const refuseBtn = document.querySelector('.cookies__btn--refuse');
const acceptBtn = document.querySelector('.cookies__btn--accept');

// Helper fuctions for reusability

// Function for changing the ham-menu icon
function toggleHamMenuIcon() {
  if (hamMenu.classList.contains('header__ham-menu--open')) {
    hamMenu.classList.remove('header__ham-menu--open');
    hamMenu.classList.add('header__ham-menu--close');
  } else {
    hamMenu.classList.remove('header__ham-menu--close');
    hamMenu.classList.add('header__ham-menu--open');
  }
}

// Function for hiding the currently open left menu (if any)
function hideCurrentLeftMenu() {
  const openLeftMenu = document.querySelector(
    '.full-menu--left.full-menu--expand'
  );
  if (openLeftMenu) {
    openLeftMenu.classList.remove('full-menu--expand');
    openLeftMenu.classList.add('full-menu--collapse');
  }
}
// Function for showing the new left menu
function showNewLeftMenu(menuIndex) {
  if (fullMenusLeft[menuIndex]) {
    fullMenusLeft[menuIndex].classList.remove('full-menu--collapse');
    fullMenusLeft[menuIndex].classList.add('full-menu--expand');
  }
}

// Function for showing the overlay
function showOverlay() {
  fullMenuOverlay.classList.remove('disappear');
  fullMenuOverlay.classList.add('appear');
}

// Function for hiding the overlay
function hideOverlay() {
  fullMenuOverlay.classList.remove('appear');
  fullMenuOverlay.classList.add('disappear');
}

// Function for showing the right menu
function showRightMenu() {
  fullMenuRight.classList.remove('full-menu--collapse');
  fullMenuRight.classList.add('full-menu--expand');
}

// Function for hiding the right menu
function hideRightMenu() {
  fullMenuRight.classList.remove('full-menu--expand');
  fullMenuRight.classList.add('full-menu--collapse');
}

// Function for adding an underline on the current active link, after removing the previous one (if any)
function addLinkUnderline(menuIndex) {
  const previousActiveLink = document.querySelector('.current');
  if (previousActiveLink) {
    previousActiveLink.classList.remove('current');
  }
  if (expandLinks[menuIndex]) {
    expandLinks[menuIndex].classList.add('current');
  }
}

// Function for removing the underline on the current active link (if any)
function removeLinkUnderline() {
  const previousActiveLink = document.querySelector('.current');
  if (previousActiveLink) {
    previousActiveLink.classList.remove('current');
  }
}

// Function for hiding the accessibility menu
function hideAccessibilityMenu() {
  const accessibilityMenu = document.getElementById('accessibilityBar');
  accessibilityMenu.classList.remove('active');
}

// Function for showing the right aside on small screens
function showRightAside() {
  if (mediaQueryMax880.matches) {
    asideRight.style.transform = 'translateX(0)';
  }
}

// Function for hiding the right aside on small screens
function hideRightAside() {
  if (mediaQueryMax880.matches) {
    asideRight.style.transform = 'translateX(100%)';
  }
}

// Cookies buttons functionality
if (acceptBtn && refuseBtn) {
  acceptBtn.addEventListener('click', () => {
    cookies.style.display = 'none';
  });

  refuseBtn.addEventListener('click', () => {
    cookies.style.display = 'none';
  });
}

// Fetch weather info from external API (weatherapi.com)
document.addEventListener('DOMContentLoaded', async () => {
  const response = await axios.get(
    'http://api.weatherapi.com/v1/current.json?key=92eab374f8c14f52bb4115634221403&q=40.981473,24.95146'
  );

  weatherIcon.src = `${response.data.current.condition.icon}`;
  weatherTemp.innerHTML = `${response.data.current.temp_c} <sup>o</sup>C`;
});

// Functionality for mega menu both for mobile and desktop
function openDesktopMenu(menuIndex = 0) {
  toggleHamMenuIcon();
  hideCurrentLeftMenu();
  showNewLeftMenu(menuIndex);
  showRightMenu();
  showOverlay();
  addLinkUnderline(menuIndex);
}

function closeDesktopMenu(menuIndex = 0) {
  toggleHamMenuIcon();
  hideCurrentLeftMenu();
  hideRightMenu();
  hideAccessibilityMenu();
  hideOverlay();
  removeLinkUnderline();
  // Add pointer events for the rest of the document
  parallaxWrapper.style.pointerEvents = 'auto';
}

function openMobileMenu(menuIndex = 0) {
  toggleHamMenuIcon();
  showRightAside();
  showOverlay();
  showRightMenu();
  // For small screens show the header navbar as expandable
  headerNav.style.transform = 'translateX(0)';
  // Remove pointer events for the rest of the document
  parallaxWrapper.style.pointerEvents = 'none';
}

function closeMobileMenu(menuIndex = 0) {
  toggleHamMenuIcon();
  hideRightAside();
  hideCurrentLeftMenu();
  hideRightMenu();
  hideAccessibilityMenu();
  hideOverlay();
  // Hide the header navbar
  headerNav.style.transform = 'translateX(calc(100% + var(--header-height)))';
  // Add pointer events for the rest of the document
  parallaxWrapper.style.pointerEvents = 'auto';
}

function openInternalMobileMenu(menuIndex = 0) {
  showRightAside();
  hideCurrentLeftMenu();
  showNewLeftMenu(menuIndex);
  showRightMenu();
  addLinkUnderline(menuIndex);
  // Change the hamburger menu icon
  hamMenu.classList.remove('header__ham-menu--open');
  hamMenu.classList.add('header__ham-menu--close');
  // Hide the main nav menu on small screens
  headerNav.style.transform = 'translateX(calc(100% + var(--header-height)))';
}

// Hamburger menu event-listener
if (hamMenu) {
  hamMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    // Large screens
    if (
      mediaQueryMin1366.matches &&
      hamMenu.classList.contains('header__ham-menu--open')
    ) {
      openDesktopMenu();
    } else if (
      mediaQueryMin1366.matches &&
      hamMenu.classList.contains('header__ham-menu--close')
    ) {
      closeDesktopMenu();
      // Small screens
    } else if (
      mediaQueryMax1366.matches &&
      hamMenu.classList.contains('header__ham-menu--open')
    ) {
      openMobileMenu();
    } else if (
      mediaQueryMax1366.matches &&
      hamMenu.classList.contains('header__ham-menu--close')
    ) {
      closeMobileMenu();
    }
  });
}

// Open internal menus on nav-link click
if (expandLinks.length > 0) {
  expandLinks.forEach((expandLink, index) => {
    expandLink.addEventListener('click', (e) => {
      e.stopPropagation();
      // Large screens
      if (mediaQueryMin1366.matches) {
        openDesktopMenu(index);
        hamMenu.classList.remove('header__ham-menu--open');
        hamMenu.classList.add('header__ham-menu--close');
        // Small screens
      } else if (mediaQueryMax1366.matches) {
        openInternalMobileMenu(index);
      }
    });
  });
}

// Close all open menus when clicking outside
document.addEventListener('click', (e) => {
  const openMenuLeft = document.querySelector(
    '.full-menu--left.full-menu--expand'
  );
  const openMenuRight = document.querySelector(
    '.full-menu--right.full-menu--expand'
  );
  // Large screens
  if (
    mediaQueryMin1366.matches &&
    openMenuLeft &&
    openMenuRight &&
    !openMenuLeft.contains(e.target) &&
    !openMenuRight.contains(e.target)
  ) {
    closeDesktopMenu();
    // Small screens
  } else if (
    mediaQueryMax1366.matches &&
    openMenuLeft &&
    openMenuRight &&
    !openMenuLeft.contains(e.target) &&
    !openMenuRight.contains(e.target)
  ) {
    closeMobileMenu();
  } else if (
    mediaQueryMax1366.matches &&
    !openMenuLeft &&
    openMenuRight &&
    headerNav &&
    !openMenuRight.contains(e.target) &&
    !headerNav.contains(e.target)
  ) {
    closeMobileMenu();
    hamMenu.classList.remove('header__ham-menu--close');
    hamMenu.classList.add('header__ham-menu--open');
  }
});

// Mega menu back button functionality on mobile devices
if (fullMenuBackButtons.length > 0) {
  fullMenuBackButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      closeMobileMenu();
      openMobileMenu();
    });
  });
}

// Back-to-top button functionality
if (backToTop) {
  window.addEventListener('scroll', checkPosition);

  backToTop.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

function checkPosition() {
  let windowY = window.scrollY;
  let screenHeight = screen.height;

  if (windowY < screenHeight) {
    backToTop.classList.add('hide');
  } else {
    backToTop.classList.remove('hide');
  }
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

// Calendar initialization
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
    720: {
      slidesPerView: 1.4,
      spaceBetween: 30,
    },
    1350: {
      slidesPerView: 1.4,
      spaceBetween: 40,
    },
    2200: {
      slidesPerView: 2.4,
      spaceBetween: 60,
    },
  },
  navigation: {
    nextEl: '.meetings__swiper-button-next',
    prevEl: '.meetings__swiper-button-prev',
  },
});

const quickAccessSwiper = new Swiper('.quick-access__swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  grabCursor: true,
  breakpoints: {
    720: {
      slidesPerView: 1.4,
      spaceBetween: 30,
    },
    1150: {
      slidesPerView: 2.4,
      spaceBetween: 40,
    },
    1550: {
      slidesPerView: 3.4,
      spaceBetween: 50,
    },
    2000: {
      slidesPerView: 4.4,
      spaceBetween: 60,
    },
  },
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
    720: {
      slidesPerView: 1.4,
      spaceBetween: 20,
    },
    1150: {
      slidesPerView: 2.4,
      spaceBetween: 30,
    },
    1550: {
      slidesPerView: 3.4,
      spaceBetween: 50,
    },
    2000: {
      slidesPerView: 4.4,
      spaceBetween: 50,
    },
  },
  navigation: {
    nextEl: '.civil-protection__swiper-button-next',
    prevEl: '.civil-protection__swiper-button-prev',
  },
});
