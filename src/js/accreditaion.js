function openCertificateBySrc(imgSrc) {
    const popUp = document.querySelector(".pop_up_certificate");
    const popUpImg = popUp.querySelector(".certificate_full img");

    if (!popUp || !popUpImg) {
        console.error("Pop-up elements not found");
        return;
    }

    popUpImg.src = imgSrc;
    popUp.style.display = "flex";
}

function closeCertificate() {
    const popUp = document.querySelector(".pop_up_certificate");
    if (popUp) {
        popUp.style.display = "none";
    }
}

document
    .querySelectorAll(".accrediation_card .certificate_img img")
    .forEach((img) => {
        img.addEventListener("click", (event) => {
            event.stopPropagation();
            openCertificateBySrc(img.src);
        });
    });

document
    .querySelector(".pop_up_certificate")
    .addEventListener("click", function (event) {
        if (!event.target.closest(".certificate_full img")) {
            closeCertificate();
        }
    });
