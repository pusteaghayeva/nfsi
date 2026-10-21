document.addEventListener("DOMContentLoaded", () => {
    const mainImage = document.querySelector(".slide_show_main_image img");
    const thumbnails = document.getElementById("newsThumbnails");
    if (!mainImage || !thumbnails) return;

    let currentIndex = 0;
    let isPaused = false;
    let pauseTimer;
    const slideImages = () => [...thumbnails.querySelectorAll(".slide_show_image img")];

    const changeImage = (index) => {
        const images = slideImages();
        if (index < 0 || index >= images.length) return;

        currentIndex = index;
        const { src, alt } = images[index];
        mainImage.classList.remove("active");
        window.setTimeout(() => {
            mainImage.src = src;
            mainImage.alt = alt;
            mainImage.classList.add("active");
        }, 180);
    };

    thumbnails.addEventListener("click", (event) => {
        const image = event.target.closest(".slide_show_image img");
        if (!image) return;

        const index = slideImages().indexOf(image);
        if (index === -1) return;

        isPaused = true;
        window.clearTimeout(pauseTimer);
        changeImage(index);
        pauseTimer = window.setTimeout(() => { isPaused = false; }, 3000);
    });

    window.setInterval(() => {
        const images = slideImages();
        if (isPaused || images.length < 2) return;
        changeImage((currentIndex + 1) % images.length);
    }, 5000);
});
