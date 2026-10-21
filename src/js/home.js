document.addEventListener("DOMContentLoaded", () => {
    initialMainSlider();
    initialCounter();
    if (typeof $ === "function" && document.getElementById("az-map")) {
        $(function () {
            $("#az-map").JSMaps({
            map: "azerbaijan",
            reponsive: true,
            selectElement: false,
            preloaderText: "Yüklənir...",
            offColor: "transparent",
            offStrokeColor: "#808080",

            mapWidth: 700.4,
            mapHeight: 539.9,
            displayAbbreviations: false,
            textPosition: "bottom",
            onStateClick: function (state) {
                const mapInfoDiv = document.querySelector(
                    `.map_info_content[data-abbreviation="${state.abbreviation}"]`
                );

                if (mapInfoDiv) {
                    const link = mapInfoDiv.getAttribute("data-link");

                    if (link) {
                        window.location.href = link;
                        return;
                    }
                }
                setDataForMapFrame(state.abbreviation);
            },
            });
        });
    }
    closeLabInfo();
    truncateTextOnHover();
    setEqualMinHeight(".tariff");
});

function setDataForMapFrame(abbreviation) {
    const mapInfoDiv = document.querySelector(
        `.map_info_content[data-abbreviation="${abbreviation}"]`
    );

    if (mapInfoDiv === null) return;

    const updateLabInfo = (labWrapper) => {
        if (!labWrapper) return;

        const title = labWrapper.querySelector(".lab_text h6");
        const text = labWrapper.querySelector(".lab_text p");
        const linksContainer = labWrapper.querySelector(
            ".lab_text .buttons_module"
        );

        title.textContent = mapInfoDiv.querySelector(".map_info_title").textContent;
        text.textContent = mapInfoDiv.querySelector(".map_info_text").textContent;

        linksContainer.innerHTML = "";

        const allLinks = mapInfoDiv.querySelectorAll(
            ".map_info_link a, .map_info_link_all a"
        );

        allLinks.forEach((linkEl) => {
            const newLink = document.createElement("a");
            newLink.textContent = linkEl.textContent;
            newLink.setAttribute("href", linkEl.getAttribute("href"));
            newLink.setAttribute("target", linkEl.getAttribute("target") || "_self");
            linksContainer.appendChild(newLink);
        });

        labWrapper.style.zIndex = 10;
        labWrapper.style.opacity = 1;
    };

    updateLabInfo(document.querySelector(".lab_info"));
}

function closeLabInfo() {
    const backButton = document.querySelector(".back");
    if (!backButton) return;

    backButton.addEventListener("click", () => {
        const labWrapper = document.querySelector(".lab_info");
        if (!labWrapper) return;
        labWrapper.style.zIndex = -1;
        labWrapper.style.opacity = 0;
    });
}

function initialMainSlider() {
    const contents = document.querySelectorAll(".main_content");
    const points = document.querySelectorAll(".point_line");
    if (!contents.length || !points.length) return;

    let currentIndex = 0;
    let autoSlideInterval;

    function showContent(index) {
        contents.forEach((content, idx) => {
            content.classList.remove("active");
            content.style.opacity = "0";
        });

        contents[index].classList.add("active");
        setTimeout(() => {
            contents[index].style.opacity = "1";
        }, 50);

        points.forEach((point) => point.classList.remove("active"));
        points[index].classList.add("active");

        currentIndex = index;
    }

    function nextContent() {
        let nextIndex = (currentIndex + 1) % contents.length;
        showContent(nextIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextContent, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    points.forEach((point) => {
        point.addEventListener("click", function () {
            stopAutoSlide();
            const index = parseInt(this.getAttribute("data-index"));
            showContent(index);
            startAutoSlide();
        });
    });

    startAutoSlide();
    showContent(0);
}

function initialCounter() {
    function countUp(element, start, end, duration) {
        const range = end - start;
        let stepDuration = Math.max(10, duration / Math.abs(range));
        const steps = Math.round(duration / stepDuration);
        const increment = range / steps;

        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (
                (increment > 0 && current > end) ||
                (increment < 0 && current < end)
            ) {
                current = end;
            }
            element.textContent = Math.round(current);
            if (current === end) {
                clearInterval(timer);
            }
        }, stepDuration);
    }

    function activateCounters(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector("span");
                const endValue = parseInt(counter.textContent, 10);
                const duration = 5000;

                const stepDuration = duration / endValue;

                countUp(counter, 0, endValue, duration);
                observer.unobserve(entry.target);
            }
        });
    }

    const counters = document.querySelectorAll(".counter");

    const observerOptions = {
        root: null,
        threshold: 0.5,
    };

    const observer = new IntersectionObserver(activateCounters, observerOptions);

    counters.forEach((counter) => {
        observer.observe(counter);
    });
}

const swiper = new Swiper(".swiper", {
    spaceBetween: 40,
    speed: 500,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
    },
});

function addHoverEffect(cards, imageElement, defaultImageSrc) {
    cards.forEach((card) => {
        card.addEventListener("mouseover", () => {
            const newImage = card.getAttribute("data-image");
            if (imageElement.src !== newImage) {
                imageElement.classList.add("fade-out");
                setTimeout(() => {
                    imageElement.src = newImage;
                    imageElement.classList.remove("fade-out");
                }, 500);
            }
        });

        card.addEventListener("mouseout", () => {
            imageElement.classList.add("fade-out");
            setTimeout(() => {
                imageElement.src = defaultImageSrc;
                imageElement.classList.remove("fade-out");
            }, 500);
        });
    });
}

const serviceCards = document.querySelectorAll(".service_card");
const serviceImage = document.getElementById("serviceImage");
const dietCards = document.querySelectorAll(".diet_card");
const dietImage = document.getElementById("dietImage");

addHoverEffect(
    serviceCards,
    serviceImage,
    "src/img/services_default.png"
);
addHoverEffect(dietCards, dietImage, "src/img/diet.png");

document.querySelectorAll(".news_info").forEach((element) => {
    element.addEventListener("mouseenter", () => {
        const h5Element = element.querySelector(".news_text h5");
        const movingTextElement = element.querySelector(".moving_text");

        if (h5Element && movingTextElement) {
            const testtestHeight = movingTextElement.offsetHeight;
            h5Element.style.transform = `translateY(-${testtestHeight - 38}px)`;
        }
    });

    element.addEventListener("mouseleave", () => {
        const h5Element = element.querySelector(".news_text h5");

        if (h5Element) {
            h5Element.style.transform = "translateY(0)";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".education_card");

    const trimAndSetText = (elements, maxLength) => {
        elements.forEach((element) => {
            const fullText = element.textContent.trim();
            const trimmedText = trimText(fullText, maxLength);
            element.setAttribute("data-full-text", fullText);
            element.textContent = trimmedText;
        });
    };

    trimAndSetText(document.querySelectorAll(".education_text p"), 205);

    cards.forEach((card, index) => {
        const textBlock = card.querySelector(".education_text");
        const span = textBlock.querySelector("span");
        const paragraph = textBlock.querySelector("p");
        const title = textBlock.querySelector("h5");

        const translateHeight = -(
            span.offsetHeight +
            paragraph.offsetHeight +
            title.offsetHeight -
            70
        );

        card.style.setProperty(`--translate-height`, `${translateHeight}px`);
    });

    cards.forEach((card) => {
        const title = card.querySelector(".education_text h5");
        if (title) {
            card.addEventListener("mouseenter", () => {
                title.textContent = title.getAttribute("data-full-text");
            });

            card.addEventListener("mouseleave", () => {
                title.textContent = trimText(title.getAttribute("data-full-text"), 90);
            });
        }
    });

    trimAndSetText(document.querySelectorAll(".education_text h5"), 90);
});

function trimText(text, maxLength) {
    return text.length <= maxLength
        ? text
        : text.slice(0, text.lastIndexOf(" ", maxLength)) + "…";
}

function truncateTextOnHover() {
    document.querySelectorAll(".tariff_text").forEach((textElement) => {
        const fullText = textElement.textContent.trim();

        if (fullText.length > 150) {
            const truncatedText = fullText.substring(0, 80) + "...";
            textElement.textContent = truncatedText;

            textElement.closest(".tariff").addEventListener("mouseenter", () => {
                textElement.textContent = fullText;
            });

            textElement.closest(".tariff").addEventListener("mouseleave", () => {
                textElement.textContent = truncatedText;
            });
        }
    });
}

function setEqualMinHeight(selector) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    let maxHeight = 0;
    elements.forEach((element) => {
        const height = element.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });

    elements.forEach((element) => {
        element.style.minHeight = `${maxHeight}px`;
    });
}
