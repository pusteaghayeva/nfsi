document.querySelector("#form").addEventListener("submit", function (event) {
    event.preventDefault();  // Prevent form from submitting the usual way

    const overlay = document.getElementById("overlay");
    const popup = document.querySelector(".action_popup");
    const popupImage = popup.querySelector(".action_img img");
    const popupText = popup.querySelector(".action_text p");

    // Serialize form data
    let formData = new FormData(this);

    // Show overlay while submitting
    overlay.classList.remove("hidden");
    overlay.classList.add("visible");
    document.body.style.overflow = "hidden";  // Prevent scrolling while the popup is shown

    // Send AJAX request
    fetch('/send-contact', {  // Replace with your contact form submission URL
        method: "POST",
        body: formData,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                popupImage.src = "/site/assets/images/svg/success.svg";
                popupText.textContent =  data.message;//"Məlumatlarınız müvəffəqiyyətlə göndərildi.";  // Success message
            } else {
                popupImage.src = "/site/assets/images/svg/error.svg";
                popupText.textContent =data.message || "Xəta baş verdi. Yenidən cəhd edin.";  // Error message
            }

            // Display the popup
            popup.style.display = "block";
        })
        .catch(error => {
            // In case of any error with the fetch request
            popupImage.src = "/site/assets/images/svg/error.svg";
            popupText.textContent = "Xəta baş verdi. Yenidən cəhd edin.";  // Error message
            popup.style.display = "block";
        })
        .finally(() => {
            // Always hide overlay and enable scrolling after the request completes
            document.body.style.overflow = "auto";
            overlay.classList.remove("visible");
            overlay.classList.add("hidden");
        });

    // Close popup action
    document.querySelector(".close_popup").addEventListener("click", function () {
        document.body.style.overflow = "auto";
        overlay.classList.remove("visible");
        overlay.classList.add("hidden");
        popup.style.display = "none";
    });
});

//Form submitted without clearing
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
});

//Input types
document.addEventListener("input", function (event) {
    if (
        (event.target.tagName === "INPUT" && event.target.type === "text" && event.target.name !== "captcha")) {
        event.target.value = event.target.value.replace(
            /[^a-zA-Z\u0400-\u04FF\u0590-\u05FF\u0600-\u06FF\u0900-\u097F\u4E00-\u9FFFıüöəğçşİÜÖƏĞÇŞ\s"'\,\:\;\/]/g,
            ""
        );
    }
});

//Phone number
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("phone");

    if (!input) {
        return;
    }

    input.addEventListener("input", (event) => {
        const fixedValue = "+994";
        const maxLength = 13;

        if (!event.target.value.startsWith(fixedValue)) {
            event.target.value = fixedValue;
        }

        event.target.value =
            fixedValue +
            event.target.value.slice(fixedValue.length).replace(/\D/g, "");

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
