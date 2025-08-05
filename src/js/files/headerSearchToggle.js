export default function headerSearchToggle() {
  const search = document.querySelector(".header-sticky__search-wrapper");

  if (search) {
    const searchBtn = document.querySelector(".header-sticky__search-open");
    const headerNav = document.querySelector(
      ".header-sticky .header-nav__list"
    );

    searchBtn.addEventListener("click", () => {
      search.classList.add("_open");
      headerNav.style.display = "none";
      searchBtn.style.display = "none";

      setTimeout(() => {
        search.style.opacity = 1;
      }, 10);
    });
  }
}
