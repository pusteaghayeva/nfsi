const countdownElement = document.getElementById("countdown");
const deadlineTime = countdownElement.getAttribute("data-time");

const deadline = new Date(deadlineTime).getTime();

const countdown = setInterval(function () {
    const now = new Date().getTime();
    const timeLeft = deadline - now;

    if (timeLeft < 0) {
        clearInterval(countdown);
        countdownElement.innerHTML = "Vaxt bitdi";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}, 1000);


// single lots carousel

var sliderThumbnail = new Swiper('.slider-thumbnail', {
    slidesPerView: 3,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
});

var slider = new Swiper('.slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: sliderThumbnail
    }
});
