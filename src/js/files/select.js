export default function select() {
  const selects = document.querySelectorAll(".select");

  if (selects.length) {
    document.body.addEventListener("click", () => {
      const selectCur = document.querySelector(".select._open");

      if (selectCur) {
        selectCur.classList.remove("_open");
      }
    });

    selects.forEach((select) => {
      const btn = select.querySelector(".select__btn");
      const btnTitle = btn.querySelector("span");
      const items = select.querySelectorAll(".select__item");
      const input = select.querySelector(".select__input");

      select.addEventListener("click", (e) => e.stopPropagation());

      btn.addEventListener("click", () => {
        if (select.classList.contains("_open")) {
          select.classList.remove("_open");
        } else {
          selects.forEach((s) => s.classList.remove("_open"));
          select.classList.add("_open");
        }
      });

      items.forEach((item) => {
        item.addEventListener("click", () => {
          input.value = item.textContent;
          btnTitle.textContent = item.textContent;

          items.forEach((i) => i.classList.remove("_active"));

          item.classList.add("_active");

          select.classList.remove("_open");
        });
      });
    });
  }
}
