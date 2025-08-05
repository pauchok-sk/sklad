export default function sliders() {
  const introSlider = document.querySelector(".intro__slider");

  if (introSlider) {
    const swiper = new Swiper(introSlider, {
      speed: 700,
      autoplay: {
        delay: 3500,
      },
      autoHeight: true,
      pagination: {
        el: ".intro__slider-pagination",
        clickable: true,
      },
    });
  }

  const conditionsSlider = document.querySelector(".s-conditions__slider");

  if (conditionsSlider) {
    const swiper = new Swiper(conditionsSlider, {
      speed: 700,
      slidesPerView: "auto",
      spaceBetween: 20,
      // autoplay: {
      //   delay: 3200,
      // },
      pagination: {
        el: ".intro__slider-pagination",
        clickable: true,
      },
    });
  }
}
