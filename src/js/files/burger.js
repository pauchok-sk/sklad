export default function burger() {
  const burgerOpen = document.querySelector("#burger-open");
  const burgerClose = document.querySelector("#burger-close");
  const burger = document.querySelector("#burger");

  if (burger) {
    burger.addEventListener("click", (e) => e.stopPropagation());

    burgerOpen.addEventListener("click", (e) => {
      e.stopPropagation();
      handlerBurgerOpen();
    });
    burgerClose.addEventListener("click", (e) => {
      e.stopPropagation();
      handlerBurgerClose();
    });

    function handlerBurgerClose() {
      burger.classList.remove("_open");
      document.body.classList.remove("body-hidden");
    }

    function handlerBurgerOpen() {
      burger.classList.add("_open");
      document.body.classList.add("body-hidden");
    }

    function updateHeightBurger() {
      burger.style.maxHeight = `${window.visualViewport.height}px`;
    }

    window.visualViewport.addEventListener("resize", updateHeightBurger);
    window.visualViewport.addEventListener("scroll", updateHeightBurger);

    updateHeightBurger();
  }
}
