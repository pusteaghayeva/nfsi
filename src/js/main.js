document.addEventListener("DOMContentLoaded", () => {
    initialLanguage();
    setHeaderMenuHeight();
    if (typeof WOW !== "undefined") {
        new WOW().init();
    }
    initializeAccordion(".accordion-header", ".accordion-content");
    initializeAccordion(
        ".nested-accordion-header",
        ".nested-accordion-content",
        ".accordion-content"
    );
    initScrollToTopButton(".arrow_to_top");
    initScrollToTopButton("#backToTopButton", 70);
    adjustTitleWidth(".info_title", 15, "135px");
});

function initialLanguage() {
    const selectedLanguage = document.getElementById("selectedLanguage") || document.querySelector(".dropbtn");
    if (!selectedLanguage) return;

    const dropdown = selectedLanguage.closest(".dropdown");
    if (!dropdown) return;

    const dropdownContent = dropdown.querySelector(".dropdown-content");
    if (!dropdownContent) return;

    // Toggle dropdown open/close on click
    selectedLanguage.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdownContent.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            dropdownContent.classList.remove("show");
        }
    });

    // Handle language item selection
    dropdownContent.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            dropdownContent.classList.remove("show");
        });
    });
}

function initializeAccordion() {
    document
        .querySelectorAll(".accordion-header, .nested-accordion-header")
        .forEach((button) => {
            button.addEventListener("click", () => {
                const accordionContent = button.nextElementSibling;
                const isActive = accordionContent.style.maxHeight;

                const parentAccordion = button.closest(
                    ".accordion-content, .nested-accordion-content"
                );
                if (parentAccordion) {
                    parentAccordion
                        .querySelectorAll(".accordion-content, .nested-accordion-content")
                        .forEach((content) => {
                            if (content !== accordionContent) {
                                content.style.maxHeight = null;
                            }
                        });
                }

                accordionContent.style.maxHeight = isActive
                    ? null
                    : accordionContent.scrollHeight + "px";

                if (parentAccordion && accordionContent.style.maxHeight) {
                    parentAccordion.style.maxHeight =
                        parentAccordion.scrollHeight + accordionContent.scrollHeight + "px";
                }
            });
        });
}

initializeAccordion();

function setHeaderMenuHeight() {
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach((menuItem) => {
        menuItem.addEventListener("mouseover", () => {
            const submenu = menuItem.querySelector(":scope > .submenu");
            if (!submenu) return;

            const submenus = submenu.querySelectorAll(".submenu");
            let isActive = 0;
            submenus.forEach((sub) => {
                const height = sub.scrollHeight;
                if (isActive) {
                    return;
                }
                if (height == 0) {
                    submenu.style.height = "auto";
                    return;
                }

                isActive = 1;
                submenu.style.height = `${height}px`;
            });
        });

        menuItem.addEventListener("mouseleave", () => {
            const submenu = menuItem.querySelector(".submenu");
            if (!submenu) return;
            submenu.style.height = "";
        });
    });
}

document.querySelectorAll(".menu-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function () {
        const menu = document.querySelector("#responsive-menu");
        const isMenuVisible = menu.style.transform === "translateX(0%)";
        const body = document.body;
        if (isMenuVisible) {
            menu.style.transform = "translateX(100%)";
            menu.style.opacity = "0";
            menu.style.zIndex = "100";
            body.classList.remove("no-scroll");
        } else {
            menu.style.transform = "translateX(0%)";
            menu.style.opacity = "1";
            body.classList.add("no-scroll");
        }
    });
});

function initScrollToTopButton(buttonSelector, scrollThreshold = 70) {
    const arrowToTop = document.querySelector(buttonSelector);

    if (!arrowToTop) {
        console.warn("element", buttonSelector, "not found.");
        return;
    }

    function toggleArrowToTop() {
        if (window.scrollY > scrollThreshold) {
            arrowToTop.classList.add("visible");
        } else {
            arrowToTop.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", toggleArrowToTop);
}

function adjustTitleWidth(selector, maxLength, newWidth) {
    const elements = document.querySelectorAll(selector);

    const shouldAdjustWidth = Array.from(elements).some(
        (element) => element.textContent.length > maxLength
    );

    if (shouldAdjustWidth) {
        elements.forEach((element) => {
            element.style.width = newWidth;
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const pageItems = document.querySelectorAll("#pagination .page-item");
    const arrowPrev = document.querySelector(".arrow_prev");
    const arrowNext = document.querySelector(".arrow_next");
    let currentPage = 0;

    function updateActivePage() {
        pageItems.forEach((item, index) => {
            if (index === currentPage) {
                item.classList.add("active_pagination");
            } else {
                item.classList.remove("active_pagination");
            }
        });
    }

    if (arrowPrev) {
        arrowPrev.addEventListener("click", function () {
            if (currentPage > 0) {
                currentPage--;
                updateActivePage();
            }
        });
    }

    if (arrowNext) {
        arrowNext.addEventListener("click", function () {
            if (currentPage < pageItems.length - 1) {
                currentPage++;
                updateActivePage();
            }
        });
    }

    pageItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            currentPage = index;
            updateActivePage();
        });
    });
});

function reloadCaptcha() {
    let img = document.getElementById('captcha');
    img.src = img.src.split('?')[0] + '?p=1&v=' + new Date().getTime();
}
