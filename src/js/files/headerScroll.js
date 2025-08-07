export default function headerScroll() {
  const headerContainer = document.querySelector(".header-container");

  if (headerContainer) {
    const headerSticky = document.querySelector(".header-sticky");
    const offsetTop = headerContainer.clientHeight;

    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (window.matchMedia("(min-width: 992px)").matches) {
        if (scrollTop > offsetTop && scrollTop > lastScrollTop) {
          headerSticky.classList.add("_scroll");
        } else {
          headerSticky.classList.remove("_scroll");
        }
      } else {
        if (scrollTop > offsetTop && scrollTop > lastScrollTop) {
          headerContainer.classList.add("_scroll");
        } else {
          headerContainer.classList.remove("_scroll");
        }
      }

      lastScrollTop = scrollTop;
    });
  }
}
