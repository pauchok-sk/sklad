export default function technicMore() {
  const sect = document.querySelector(".s-technic");

  if (sect && window.matchMedia("(max-width: 767px)").matches) {
    const btn = sect.querySelector(".s-technic__btn-more");
    const count = +sect.dataset.countShow;
    const lengthItems = sect.querySelectorAll(".s-technic__nav-item").length;

    console.log(lengthItems)

    if (count >= lengthItems && btn) btn.remove();

    btn.addEventListener("click", () => {
      const items = sect.querySelectorAll(".s-technic__nav-item");
      const hideItems = Array.from(items).filter(
        (item) => window.getComputedStyle(item).display === "none"
      );

      hideItems.splice(0, count).forEach((item) => {
        item.style.display = "flex";

        setTimeout(() => {
          item.style.opacity = 1;
          item.style.transform = "translateY(0)";
        });
      });

      if (hideItems.length <= 0) btn.remove();
    });
  }
}
