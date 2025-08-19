export default function introHeight() {
  const slider = document.querySelector(".intro__slider");

  if (slider && window.matchMedia("(max-width: 575px)").matches) {

    const headerHeight = document.querySelector(".header").clientHeight;
    const headerAddressHeight = document.querySelector(".header-address").clientHeight;
    const offsetTop = headerAddressHeight + headerHeight;

    updateHeight()

    function updateHeight() {
      slider.style.height = `${window.visualViewport.height - offsetTop}px`;
    }
  
    window.visualViewport.addEventListener("resize", updateHeight);
    window.visualViewport.addEventListener("scroll", updateHeight);
  }
}
