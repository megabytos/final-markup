import debounce from 'lodash.debounce';

(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtns = document.querySelectorAll('.js-close-menu');
  const mobileOverlay = document.querySelector('.js-mobile-overlay');

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');
    mobileOverlay.classList.toggle('is-open');

    const scrollLockMethod = !isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  if (window.innerWidth < 1280) {
    closeMenuBtns.forEach(btn => btn.addEventListener('click', toggleMenu));
  }

  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  centeredSlides: false,
  effect: 'none',
  allowTouchMove: false,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

  slidesPerView: 1,

  breakpoints: {
    375: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1280: {
      slidesPerView: 3,
    }
  }
});

const prevButton = document.querySelector('.swiper-button-prev');
const nextButton = document.querySelector('.swiper-button-next');
const swiper_wrap = document.querySelector('.swiper-wrapper');
const el = document.querySelector('.reviews-list'); // получаем наш параграф
const styles = window.getComputedStyle(el);

const mediaQuery = window.matchMedia('(min-width: 768px)');
console.log(mediaQuery);


if (mediaQuery.matches) {
  tabletSwiper();
}
else {
  mobileSwiper();
}

function handleTabletChange() {
  if (mediaQuery.matches) {
    tabletSwiper();
  } else {
    mobileSwiper();
  }
}

window.addEventListener('resize', debounce(handleTabletChange, 20));


function tabletSwiper() {
  let gap = parseInt(styles.gap);
  nextButton.addEventListener('click', () => {
    swiper_wrap.style.left = `-${gap / 2}px`;

  });

  prevButton.addEventListener('click', () => {
    swiper_wrap.style.left = "0px";
  });
}

function mobileSwiper() {
  nextButton.addEventListener('click', () => {
    swiper_wrap.style.left = "0px";

  });

  prevButton.addEventListener('click', () => {
    swiper_wrap.style.left = "0px";
  });
}