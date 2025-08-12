export default function sliders() {
  const introSlider = document.querySelector(".intro__slider");

  if (introSlider) {
    const swiper = new Swiper(introSlider, {
      speed: 700,
      autoplay: {
        delay: 3500,
      },
      pagination: {
        el: ".intro__slider-pagination",
        clickable: true,
      },
    });
  }

  const conditionsSlider = document.querySelector(".s-conditions__slider");

  if (conditionsSlider && window.matchMedia("(max-width: 991px)").matches) {
    const swiper = new Swiper(conditionsSlider, {
      speed: 700,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 3200,
      },
      pagination: {
        el: ".intro__slider-pagination",
        clickable: true,
      },
    });
  }
  const recServicesSlider = document.querySelector(".s-rec-services__slider");

  if (recServicesSlider) {
    const swiper = new Swiper(recServicesSlider, {
      speed: 700,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 3500,
      },
      pagination: {
        el: ".s-rec-services .slider-pagination",
        clickable: true,
      },
      navigation: {
        prevEl: ".s-rec-services .slider-btn._prev",
        nextEl: ".s-rec-services .slider-btn._next",
      },
      breakpoints: {
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  }

    const recProductSlider = document.querySelector(".s-product__rec-slider");

  if (recProductSlider) {
    const swiper = new Swiper(recProductSlider, {
      speed: 700,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 3500,
      },
      pagination: {
        el: ".s-product .slider-pagination",
        clickable: true,
      },
      navigation: {
        prevEl: ".s-product .slider-btn._prev",
        nextEl: ".s-product .slider-btn._next",
      },
    });
  }
}
