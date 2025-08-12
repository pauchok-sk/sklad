(() => {
    "use strict";
    function fixedSearch() {
        const search = document.querySelector("#fixed-search");
        if (search) {
            const btnsOpen = document.querySelectorAll(".fixed-search-open");
            const btnClose = document.querySelector("#fixed-search-close");
            search.addEventListener("click", e => e.stopPropagation());
            document.body.addEventListener("click", () => {
                search.classList.remove("_open");
            });
            btnsOpen.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.stopPropagation();
                    search.classList.add("_open");
                });
            });
            btnClose.addEventListener("click", e => {
                e.stopPropagation();
                search.classList.remove("_open");
            });
        }
    }
    function burgerTabs() {
        const buttons = document.querySelectorAll("[data-burger-tab-btn]");
        if (buttons.length) buttons.forEach(btn => {
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
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                });
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter(item => item.closest("[data-spollers]") === spollersBlock);
                    spollerTitles.forEach(spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    });
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach(spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                });
            });
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter(function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            });
            if (media.length) {
                const breakpointsArray = [];
                media.forEach(item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                });
                let mdQueries = breakpointsArray.map(function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                });
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach(breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter(function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        });
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    });
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout(() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout(() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        function uniqArray(array) {
            return array.filter(function(item, index, self) {
                return self.indexOf(item) === index;
            });
        }
    }
    function burger() {
        const burgerOpen = document.querySelector("#burger-open");
        const burgerClose = document.querySelector("#burger-close");
        const burger = document.querySelector("#burger");
        if (burger) {
            burger.addEventListener("click", e => e.stopPropagation());
            burgerOpen.addEventListener("click", e => {
                e.stopPropagation();
                handlerBurgerOpen();
            });
            burgerClose.addEventListener("click", e => {
                e.stopPropagation();
                handlerBurgerClose();
            });
            function handlerBurgerClose() {
                burger.classList.remove("_open");
                document.body.classList.remove("body-hidden");
            }
            function handlerBurgerOpen() {
                burger.classList.add("_open");
                document.body.classList.add("body-hidden");
            }
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height}px`;
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function headerSearchToggle() {
        const search = document.querySelector(".header-sticky__search-wrapper");
        if (search) {
            const searchBtn = document.querySelector(".header-sticky__search-open");
            const headerNav = document.querySelector(".header-sticky .header-nav__list");
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
    function sliders() {
        const introSlider = document.querySelector(".intro__slider");
        if (introSlider) {
            new Swiper(introSlider, {
                speed: 700,
                autoplay: {
                    delay: 3500
                },
                pagination: {
                    el: ".intro__slider-pagination",
                    clickable: true
                }
            });
        }
        const conditionsSlider = document.querySelector(".s-conditions__slider");
        if (conditionsSlider && window.matchMedia("(max-width: 991px)").matches) {
            new Swiper(conditionsSlider, {
                speed: 700,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 3200
                },
                pagination: {
                    el: ".intro__slider-pagination",
                    clickable: true
                }
            });
        }
        const recServicesSlider = document.querySelector(".s-rec-services__slider");
        if (recServicesSlider) {
            new Swiper(recServicesSlider, {
                speed: 700,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 3500
                },
                pagination: {
                    el: ".s-rec-services .slider-pagination",
                    clickable: true
                },
                navigation: {
                    prevEl: ".s-rec-services .slider-btn._prev",
                    nextEl: ".s-rec-services .slider-btn._next"
                },
                breakpoints: {
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }
            });
        }
        const recProductSlider = document.querySelector(".s-product__rec-slider");
        if (recProductSlider) {
            new Swiper(recProductSlider, {
                speed: 700,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 3500
                },
                pagination: {
                    el: ".s-product .slider-pagination",
                    clickable: true
                },
                navigation: {
                    prevEl: ".s-product .slider-btn._prev",
                    nextEl: ".s-product .slider-btn._next"
                }
            });
        }
    }
    function technicMore() {
        const sect = document.querySelector(".s-technic");
        if (sect && window.matchMedia("(max-width: 767px)").matches) {
            const btn = sect.querySelector(".s-technic__btn-more");
            const count = +sect.dataset.countShow;
            const lengthItems = sect.querySelectorAll(".s-technic__nav-item").length;
            console.log(lengthItems);
            if (count >= lengthItems && btn) btn.remove();
            btn.addEventListener("click", () => {
                const items = sect.querySelectorAll(".s-technic__nav-item");
                const hideItems = Array.from(items).filter(item => window.getComputedStyle(item).display === "none");
                hideItems.splice(0, count).forEach(item => {
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
    function map() {
        const maps = document.querySelectorAll(".map");
        if (maps.length) maps.forEach(map => {
            const center = JSON.parse(map.dataset.center);
            const zoom = Number(map.dataset.zoom);
            const icon = map.dataset.icon;
            function init() {
                const htmlMap = new ymaps.Map(map, {
                    center,
                    zoom
                });
                const placemark = new ymaps.Placemark(center, {}, {
                    iconLayout: "default#image",
                    iconImageHref: icon,
                    iconImageSize: [ 26, 40 ],
                    iconImageOffset: [ -5, -65 ]
                });
                htmlMap.geoObjects.add(placemark);
                htmlMap.controls.remove("geolocationControl");
                htmlMap.controls.remove("searchControl");
                htmlMap.controls.remove("trafficControl");
                htmlMap.controls.remove("typeSelector");
                htmlMap.controls.remove("fullscreenControl");
                htmlMap.controls.remove("rulerControl");
                htmlMap.behaviors.disable([ "scrollZoom" ]);
            }
            ymaps.ready(init);
        });
    }
    function tabs() {
        const buttons = document.querySelectorAll("[data-tab-btn]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const container = btn.closest(".tabs");
                const tabId = btn.dataset.tabBtn;
                const allButtons = container.querySelectorAll("[data-tab-btn]");
                const allTabs = container.querySelectorAll("[data-tab]");
                const currentTab = container.querySelector(`[data-tab="${tabId}"]`);
                allTabs.forEach(t => {
                    t.classList.remove("_active");
                    t.style.opacity = 0;
                });
                currentTab.classList.add("_active");
                setTimeout(() => {
                    currentTab.style.opacity = 1;
                }, 10);
                allButtons.forEach(b => b.classList.remove("_active"));
                btn.classList.add("_active");
            });
        });
    }
    function inputFile() {
        const inputs = document.querySelectorAll(".input-file");
        if (inputs.length) inputs.forEach(input => {
            input.addEventListener("change", e => {
                const label = document.querySelector(`label[for="${input.id}"]`);
                if (e.target.files[0]) label.querySelector("span").textContent = "Файл прикреплен";
            });
        });
    }
    function headerScroll() {
        const headerContainer = document.querySelector(".header-container");
        if (headerContainer) {
            const headerSticky = document.querySelector(".header-sticky");
            const offsetTop = headerContainer.clientHeight;
            let lastScrollTop = 0;
            window.addEventListener("scroll", () => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (window.matchMedia("(min-width: 992px)").matches) if (scrollTop > offsetTop && scrollTop > lastScrollTop) headerSticky.classList.add("_scroll"); else headerSticky.classList.remove("_scroll"); else if (scrollTop > offsetTop && scrollTop > lastScrollTop) headerContainer.classList.add("_scroll"); else headerContainer.classList.remove("_scroll");
                lastScrollTop = scrollTop;
            });
        }
    }
    function select_select() {
        const selects = document.querySelectorAll(".select");
        if (selects.length) {
            document.body.addEventListener("click", () => {
                const selectCur = document.querySelector(".select._open");
                if (selectCur) selectCur.classList.remove("_open");
            });
            selects.forEach(select => {
                const btn = select.querySelector(".select__btn");
                const btnTitle = btn.querySelector("span");
                const items = select.querySelectorAll(".select__item");
                const input = select.querySelector(".select__input");
                select.addEventListener("click", e => e.stopPropagation());
                btn.addEventListener("click", () => {
                    if (select.classList.contains("_open")) select.classList.remove("_open"); else {
                        selects.forEach(s => s.classList.remove("_open"));
                        select.classList.add("_open");
                    }
                });
                items.forEach(item => {
                    item.addEventListener("click", () => {
                        input.value = item.textContent;
                        btnTitle.textContent = item.textContent;
                        items.forEach(i => i.classList.remove("_active"));
                        item.classList.add("_active");
                        select.classList.remove("_open");
                    });
                });
            });
        }
    }
    function productCard() {
        const cards = document.querySelectorAll(".card-product");
        if (cards.length) {
            window.addEventListener("resize", resizeCard);
            resizeCard();
            function resizeCard() {
                cards.forEach(card => {
                    card.style.minHeight = card.querySelector(".card-product__inside").clientHeight + "px";
                });
            }
        }
    }
    function inputmask() {
        const inputs = document.querySelectorAll('input[type="tel"]');
        const im = new Inputmask("+7 (999) 999-99-99");
        im.mask(inputs);
        inputs.forEach(input => {
            input.addEventListener("keydown", e => {
                const value = e.target.value;
                value.split("");
                if (value.length === 0 && (e.key === "8" || e.key === "7")) e.preventDefault();
            });
        });
    }
    function sidebar() {
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
    function formSearchFocus() {
        const forms = document.querySelectorAll(".form-search");
        if (forms.length) forms.forEach(form => {
            const input = form.querySelector("input");
            input.addEventListener("focus", () => {
                form.classList.add("_focus");
            });
            input.addEventListener("blur", () => {
                form.classList.remove("_focus");
            });
        });
    }
    function moreText() {
        const items = document.querySelectorAll("[data-more]");
        if (items.length) items.forEach(item => {
            const btn = item.nextElementSibling;
            btn.addEventListener("click", () => {
                item.classList.add("_open");
                setTimeout(() => {
                    item.querySelectorAll("p").forEach(p => p.style.opacity = 1);
                }, 10);
                btn.remove();
            });
        });
    }
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
    headerScroll();
    select_select();
    productCard();
    inputmask();
    sidebar();
    formSearchFocus();
    moreText();
    Fancybox.bind("[data-fancybox]", {
        closeButton: true
    });
    document.addEventListener("DOMContentLoaded", function() {
        new bootstrap.Modal(document.getElementById("modal-order"));
    });
})();