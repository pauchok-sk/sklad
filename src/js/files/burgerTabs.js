export default function burgerTabs() {
  const buttons = document.querySelectorAll("[data-burger-tab-btn]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const currentTab = btn.closest(".burger__tab");
        const idTab = btn.dataset.burgerTabBtn;
        const nextTab = document.querySelector(`[data-burger-tab="${idTab}"]`);

        currentTab.classList.remove("_active");
        currentTab.style.opacity = 0;

        nextTab.classList.add("_active");

        setTimeout(() => {
          nextTab.style.opacity = 1;
        }, 10);
      });
    });
  }
}
