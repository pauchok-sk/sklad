export default function fixedSearch() {
  const search = document.querySelector("#fixed-search");

  if (search) {
    const btnsOpen = document.querySelectorAll(".fixed-search-open");
    const btnClose = document.querySelector("#fixed-search-close");

    search.addEventListener("click", (e) => e.stopPropagation());

    document.body.addEventListener("click", () => {
      search.classList.remove("_open");
    });

    btnsOpen.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        search.classList.add("_open");
      });
    });
    btnClose.addEventListener("click", (e) => {
      e.stopPropagation();
      search.classList.remove("_open");
    });
  }
}
