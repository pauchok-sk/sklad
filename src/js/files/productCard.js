export default function productCard() {
  const cards = document.querySelectorAll(".card-product");

  if (cards.length) {
    window.addEventListener("resize", resizeCard);

    resizeCard();

    function resizeCard() {
      cards.forEach((card) => {
        card.style.minHeight =
          card.querySelector(".card-product__inside").clientHeight + "px";
      });
    }
  }
}
