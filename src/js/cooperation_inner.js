document.addEventListener("DOMContentLoaded", () => {
    const mainImage = document.querySelector(".slide_show_main_image img");
    const slideImages = document.querySelectorAll(".slide_show_image img");
    let currentIndex = 0;
    let isPaused = false;

    const changeImage = (index) => {
        if (index < 0 || index >= slideImages.length) return;

        mainImage.classList.remove("active");

        setTimeout(() => {
            const { src, alt } = slideImages[index];
            mainImage.src = src;
            mainImage.alt = alt;

            mainImage.classList.add("active");
        }, 500);
    };

    const autoSlideShow = () => {
        if (!isPaused && slideImages.length > 0) {
            currentIndex = (currentIndex + 1) % slideImages.length;
            changeImage(currentIndex);
        }
    };

    slideImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            isPaused = true;
            currentIndex = index;
            changeImage(currentIndex);

            setTimeout(() => {
                isPaused = false;
            }, 3000);
        });
    });

    if (slideImages.length > 0) {
        setInterval(autoSlideShow, 5000);
        changeImage(currentIndex);
    } else {
        console.warn("No images found for the slideshow.");
    }
});
