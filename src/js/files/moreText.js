export default function moreText() {
  const items = document.querySelectorAll("[data-more]");

  if (items.length) {
    items.forEach((item) => {
      const btn = item.nextElementSibling;

      btn.addEventListener("click", () => {
        item.classList.add("_open");
        setTimeout(() => {
          item.querySelectorAll("p").forEach((p) => (p.style.opacity = 1));
        }, 10);

        btn.remove();
      });
    });
  }
}
