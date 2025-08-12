export default function formSearchFocus() {
  const forms = document.querySelectorAll(".form-search");

  if (forms.length) {
    forms.forEach((form) => {
      const input = form.querySelector("input");

      input.addEventListener("focus", () => {
        form.classList.add("_focus");
      });
      input.addEventListener("blur", () => {
        form.classList.remove("_focus");
      });
    });
  }
}
