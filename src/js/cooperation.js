document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".news_text h5").forEach((h5) => {
        const maxLength = 115;
        const originalText = h5.textContent;

        if (originalText.length > maxLength) {
            h5.textContent = originalText.slice(0, maxLength) + "...";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
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
});

// document.addEventListener("DOMContentLoaded", function () {
//   const pageItems = document.querySelectorAll("#pagination .page-item");
//   const arrowPrev = document.querySelector(".arrow_prev");
//   const arrowNext = document.querySelector(".arrow_next");
//   let currentPage = 0;

//   function updateActivePage() {
//     pageItems.forEach((item, index) => {
//       if (index === currentPage) {
//         item.classList.add("active");
//       } else {
//         item.classList.remove("active");
//       }
//     });
//   }

//   arrowPrev.addEventListener("click", function () {
//     if (currentPage > 0) {
//       currentPage--;
//       updateActivePage();
//     }
//   });

//   arrowNext.addEventListener("click", function () {
//     if (currentPage < pageItems.length - 1) {
//       currentPage++;
//       updateActivePage();
//     }
//   });

//   pageItems.forEach((item, index) => {
//     item.addEventListener("click", function () {
//       currentPage = index;
//       updateActivePage();
//     });
//   });
// });
