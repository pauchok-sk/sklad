export default function sidebar() {
  const sidebar = document.querySelector("#sidebar");

  if (sidebar) {
    const sidebarOpen = document.querySelector("#sidebar-open");
    const sidebarClose = document.querySelector("#sidebar-close");
    const sidebarOverlay = document.querySelector("#sidebar-overlay");

    sidebarOverlay.addEventListener("click", handleClose);
    sidebarClose.addEventListener("click", handleClose);
    sidebarOpen.addEventListener("click", handleOpen);

    function handleOpen() {
      sidebar.classList.add("_open");
      sidebarOverlay.classList.add("_open");

      document.body.classList.add("body-hidden");
    }

    function handleClose() {
      sidebar.classList.remove("_open");
      sidebarOverlay.classList.remove("_open");

      document.body.classList.remove("body-hidden");
    }
  }
}
