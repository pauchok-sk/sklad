import "../scss/style.scss";
import fixedSearch from "./files/fixedSearch.js";
import burgerTabs from "./files/burgerTabs.js";
import spoller from "./files/spoller.js";
import burger from "./files/burger.js";
import headerSearchToggle from "./files/headerSearchToggle.js";
import sliders from "./files/sliders.js";
import technicMore from "./files/technicMore.js";
import map from "./files/map.js";
import tabs from "./files/tabs.js";
import inputFile from "./files/inputFile.js";

spoller();
burgerTabs();
fixedSearch();
burger();
headerSearchToggle();
sliders();
technicMore();
map();
tabs();
inputFile();

Fancybox.bind("[data-fancybox]", {
  closeButton: true,
});

document.addEventListener("DOMContentLoaded", function () {
  var myModal = new bootstrap.Modal(
    document.getElementById("modal-order")
  );
  // myModal.show();
});
