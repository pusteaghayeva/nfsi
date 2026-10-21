document.addEventListener("DOMContentLoaded", () => {
    initializeCustomSelects();
    initializeFilesInputs();
    initializeFormSubmission(); // Initialize AJAX form submission
});


function initializeCustomSelects() {
    const customSelects = document.querySelectorAll(".custom-select");

    customSelects.forEach((select) => {
        const trigger = select.querySelector(".custom-select-trigger");
        const options = select.querySelectorAll(".custom-option");
        const hiddenSelect = select.nextElementSibling;

        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = select.classList.contains("open");
            closeAllSelects();
            if (!isOpen) {
                select.classList.add("open");
            }
        });

        options.forEach((option) => {
            option.addEventListener("click", () => {
                if (!!option.closest(".tab1_value")) {
                    console.log(option)
                    disabledSelectForTab("#tab2", option);
                } else if (!!option.closest(".tab2_value")) {
                    disabledSelectForTab("#tab1", option);
                }
                const value = option.dataset.value;
                const text = option.textContent;

                trigger.textContent = text;
                hiddenSelect.value = value;
                select.classList.remove("open");
            });
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".custom-select")) {
            closeAllSelects();
        }
    });

    function closeAllSelects() {
        customSelects.forEach((select) => select.classList.remove("open"));
    }
}
function disabledSelectForTab(tabId, option) {
    document.querySelector(tabId).classList.add("disabled");

    if (option.dataset.value === "option0") {
        document.querySelector(tabId).classList.remove("disabled");
    }
}
function initializeFilesInputs() {
    const fileWrappers = document.querySelectorAll(".file_wrapper");

    fileWrappers.forEach((wrapper) => {
        const input = wrapper.querySelector('input[type="file"]');
        const fileNameDisplay = wrapper.querySelector(".cvFileName");
        const removeButton = wrapper.querySelector(".remove-button");
        const fileInfo = wrapper.querySelector(".file-info");
        const cvUpload = wrapper.querySelector(".cv-upload");
        const cvTitle = wrapper.querySelector(".cvTitle");

        input.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                fileNameDisplay.textContent = file.name;
                fileInfo.style.display = "flex";
                cvUpload.classList.add("no-after");
                cvTitle.classList.remove("error");
            }
        });

        removeButton.addEventListener("click", () => {
            input.value = "";
            fileInfo.style.display = "none";
            cvUpload.classList.remove("no-after");
        });
    });
}

function initializeFormSubmission() {
    const form = document.getElementById("form");

    if (!form) return; // Exit if the form element is not found

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);

        // Show loading state (optional)
        const submitButton = form.querySelector(".submit_btn");
        submitButton.disabled = true;
        submitButton.textContent = "Göndərilir...";

        fetch("/send-service-contact", {
            method: "POST",
            body: formData,
            credentials: 'same-origin',
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const success = data.success; //Emulasiya
                    const message = data.message;
                    showPopup(success,message);
                } else {
                    const success = data.success; //Emulasiya
                    const message = data.message;
                    showPopup(success,message);
                }
            })
            .catch((error) => {
                const success = false; //Emulasiya
                const message = error;
                showPopup(success,message);
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = "Göndər";
            });
    });
}

const phoneInput = document.getElementById("phone");

if (phoneInput) {
    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9+]/g, "");
    });
}

const applyButton = document.getElementById("apply-btn");
const serviceModal = document.querySelector(".service_modal");
const body = document.body;
const overlay = document.getElementById("overlay");
const closeImg = document.querySelector(".close_img");

function openModal() {
    serviceModal.classList.add("open");
    body.style.overflow = "hidden";
    overlay.classList.add("open");
}

function closeModal() {
    serviceModal.classList.remove("open");
    body.style.overflow = "";
    overlay.classList.remove("open");
}

if (applyButton && serviceModal && overlay && closeImg) {
    applyButton.addEventListener("click", openModal);
    overlay.addEventListener("click", closeModal);
    closeImg.addEventListener("click", closeModal);
}

const serviceForm = document.getElementById("form");
if (serviceForm) {
    serviceForm.addEventListener("submit", function (event) {
        event.preventDefault();
    });
}

//Input types
document.addEventListener("input", function (event) {
    if (
        (event.target.tagName === "INPUT" && event.target.type === "text") ||
        event.target.tagName === "TEXTAREA"
    ) {
        if (
            event.target.name === "captcha" ||
            event.target.id === "tin_enterprise" ||
            event.target.id === "bank" ||
            event.target.id !== "full_name"
        ) {
            return;
        }
        event.target.value = event.target.value.replace(
            /[^a-zA-Z\u0400-\u04FF\u0590-\u05FF\u0600-\u06FF\u0900-\u097F\u4E00-\u9FFFıüöəğçşİÜÖƏĞÇŞ\s"'\,\:\;\/]/g,
            ""
        );
    }
});

const tinInput = document.getElementById("tin_enterprise");
if (tinInput) {
    tinInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
    });
}

//Phone number
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("number");

    if (!input) {
        return;
    }

    input.addEventListener("input", (event) => {
        const fixedValue = "+994";
        const maxLength = 13;

        if (!event.target.value.startsWith(fixedValue)) {
            event.target.value = fixedValue;
        }

        if (event.target.value.length > maxLength) {
            event.target.value = event.target.value.slice(0, maxLength);
        }
    });

    input.addEventListener("focus", (event) => {
        const fixedValue = "+994";
        if (event.target.value.startsWith(fixedValue)) {
            event.target.setSelectionRange(fixedValue.length, fixedValue.length);
        }
    });
});

//Min symbols
document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".validate");

    inputs.forEach((input) => {
        const errorMessage = input.nextElementSibling;

        if (errorMessage && errorMessage.classList.contains("error-message")) {
            input.addEventListener("input", () => {
                if (input.value.length < 6) {
                    errorMessage.style.display = "block";
                } else {
                    errorMessage.style.display = "none";
                }
            });

            input.addEventListener("invalid", (event) => {
                event.preventDefault();
                if (input.value.length < 6) {
                    errorMessage.style.display = "block";
                }
            });
        }
    });
});

function toggler(event) {
    event.target.classList.toggle("activeTab");
}

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".linkedTab");
    links.forEach((link) => {
        link.addEventListener("click", toggler);
    });
});

function showPopup(success,message) {
    const overlay = document.getElementById("overlay");
    const popup = document.querySelector(".action_popup");
    const actionImg = popup.querySelector(".action_img img");
    const actionText = popup.querySelector(".action_text p");
    const closePopupContainer = popup.querySelector(".close_popup");

    // Saytı scroll etməyə mane olur
    document.body.classList.add("no-scroll");

    // Popup-u göstər
    overlay.classList.remove("hidden");
    popup.style.display = "block";

    // Success və Error üçün şəklin və mətnin dəyişdirilməsi
    if (success) {
        actionImg.src = "/site/assets/images/svg/success.svg";
        actionText.textContent = message;//"Məlumatlarınız müvəffəqiyyətlə göndərildi.";
        closePopupContainer.innerHTML = `
            <a href="">
                <img src="/site/assets/images/svg/close.svg" alt="close"/>
            </a>
        `;
    } else {
        actionImg.src = "/site/assets/images/svg/error.svg";
        actionText.textContent = message;//"Xəta baş verdi. Yenidən cəhd edin.";
        closePopupContainer.innerHTML = `
            <button type="button" class="close_button">
                <img src="/site/assets/images/svg/close.svg" alt="close"/>
            </button>
        `;
    }

    // Close düyməsini tap və klik funksiyasını əlavə et
    const closePopup = popup.querySelector(success ? "a" : ".close_button");
    closePopup.addEventListener("click", () => {
        document.body.style.overflow = "auto"; // Saytı scroll etmək aktivləşdirilir
        overlay.classList.add("hidden");
        popup.style.display = "none";
    });
}
