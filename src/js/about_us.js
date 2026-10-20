const swiper = new Swiper(".swiper", {
  spaceBetween: 40,
  speed: 500,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3.5,
      spaceBetween: 40,
    },
    1280: {
      slidesPerView: 4.5,
      spaceBetween: 40,
    },
  },
});
