document.addEventListener("DOMContentLoaded", () => {
  initializeTabs();
  updateSliders();
});

function updateSliders() {
  document.querySelectorAll(".slider").forEach((slider) => {
    slider.addEventListener("input", function () {
      document.getElementById(
        "value" + this.id.replace("slider", "")
      ).innerText = this.value;
    });
  });
}

function initializeTabs() {
  const tabs = document.querySelectorAll(".tab");
  const tab1Content = document.querySelector(".tab1_value");
  const tab2Content = document.querySelector(".tab2_value");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () =>
      switchTab(tab, tab1Content, tab2Content, tabs)
    );
  });
}

function switchTab(tab, tab1Content, tab2Content, tabs) {
  tab1Content.classList.add("hidden");
  tab2Content.classList.add("hidden");

  tabs.forEach((t) => t.classList.remove("active"));

  if (tab.id === "tab1") {
    tab1Content.classList.remove("hidden");
    clearSelectForTab(tab2Content);
  } else if (tab.id === "tab2") {
    tab2Content.classList.remove("hidden");
    clearSelectForTab(tab1Content);
  }

  tab.classList.add("active");
}

function clearSelectForTab(tab) {
  const customSelects = tab.querySelectorAll(
    ".service_type_form div.input .custom-select"
  );

  customSelects.forEach((select) => {
    const trigger = select.querySelector(".custom-select-trigger");
    const hiddenSelect = select.nextElementSibling;

    trigger.innerHTML =
      'Seç <div class="custom-select-arrow"><img src="../assets/images/svg/dropdown.svg" alt="" /></div>';
    hiddenSelect.value = "option0";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const sliders = {
    slider3: document.getElementById("slider3"),
    slider4: document.getElementById("slider4"),
    slider2: document.getElementById("slider2"),
    slider1: document.getElementById("slider1"),
  };

  const h6Inputs = {
    value3: document.getElementById("value3"),
    value4: document.getElementById("value4"),
    value2: document.getElementById("value2"),
    value1: document.getElementById("value1"),
  };

  Object.keys(sliders).forEach((key) => {
    const slider = sliders[key];
    const h6 = h6Inputs[`value${key.replace("slider", "")}`];

    slider.addEventListener("input", () => {
      h6.textContent = slider.value;
      calculateResult();
    });

    h6.addEventListener("input", () => {
      let val = parseInt(h6.textContent, 10);
      if (isNaN(val)) return;
      if (val < slider.min) val = slider.min;
      if (val > slider.max) val = slider.max;
      h6.textContent = val;
      slider.value = val;
      calculateResult();
    });

    h6.addEventListener("keypress", (e) => {
      if (!/\d/.test(e.key)) {
        e.preventDefault();
      }
    });

    h6.addEventListener("blur", () => {
      if (h6.textContent.trim() === "") {
        h6.textContent = slider.value;
      }
    });
  });

  const selects = {
    TY: document.querySelector("#TY .custom-options"),
    CC: document.querySelector("#CC .custom-options"),
    Certificate: document.querySelector(".custom-options-certificate"),
  };

  const perPersonSpan = document.querySelector(".person_per_day-amount-count");
  const totalAmountSpan = document.querySelector(".total-result span");

  function getSlider2Coefficient(value) {
    if (value >= 1 && value <= 19) return 0.5;
    if (value >= 20 && value <= 49) return 1;
    if (value >= 50 && value <= 79) return 1.5;
    if (value >= 80 && value <= 199) return 2;
    if (value >= 200 && value <= 499) return 2.5;
    if (value >= 500 && value <= 899) return 3;
    if (value >= 900 && value <= 1299) return 3.5;
    if (value >= 1300 && value <= 1699) return 4;
    if (value >= 1700 && value <= 2999) return 4.5;
    if (value >= 3000 && value <= 5000) return 5;
    if (value > 5000) return 5.5;
    return 0;
  }

  function getSlider4Coefficient(value) {
    if (value >= 1 && value <= 3) return 0.5;
    if (value >= 4 && value <= 6) return 1;
    if (value >= 7 && value <= 10) return 1.5;
    if (value >= 11 && value <= 20) return 2;
    if (value > 20) return 3;
    return 0;
  }

  function formatToTwoDecimalPlaces(number) {
    return number.toFixed(2).replace(".", ",");
  }

  function roundToNearestHalf(number) {
    return Math.round(number * 2) / 2;
  }

  function calculateResult() {
    const slider3Value = parseFloat(sliders.slider3.value, 10) * 0.5;
    const slider4Value = getSlider4Coefficient(
      parseFloat(sliders.slider4.value, 10)
    );
    const slider2Value = getSlider2Coefficient(
      parseFloat(sliders.slider2.value, 10)
    );

    const TYWeight = parseFloat(
      selects.TY.querySelector(".custom-option.selected")?.dataset.weight ||
        "0",
      10
    );
    const CCWeight = parseFloat(
      selects.CC.querySelector(".custom-option.selected")?.dataset.weight ||
        "0",
      10
    );

    const selectedCertificateOption = selects.Certificate.querySelector(
      ".custom-option.selected"
    );

    let CertificateWeight;
    const certType = selectedCertificateOption?.dataset.value;

    if (certType === "option1") {
      CertificateWeight = 767;
    } else if (certType === "option2" || certType === "option3") {
      CertificateWeight = 472;
    } else {
      CertificateWeight = parseFloat(
        selectedCertificateOption?.dataset.weight || "0",
        10
      );
    }

    if (
      certType === "option4" ||
      certType === "option5" ||
      certType === "option6" 
    ) {
      const selectedWeight = parseFloat(
        selectedCertificateOption.dataset.weight,
        10
      );
      totalAmountSpan.textContent = formatToTwoDecimalPlaces(selectedWeight);
      perPersonSpan.textContent = "0,00";
      return;
    }

    function customRound(value) {
      const decimal = value - Math.floor(value);
      if (decimal <= 0.5) {
        return Math.floor(value);
      } else {
        return Math.ceil(value);
      }
    }

    let Tm = TYWeight + slider3Value + (slider4Value + slider2Value) * CCWeight;

   const branchCount = parseInt(sliders.slider1.value, 10);
const baseTm = Tm; 
if (branchCount > 0) {
  Tm += 0.5 * branchCount * baseTm;
}

    const roundedTm = customRound(Tm); // 6.51 => 7

    perPersonSpan.textContent = formatToTwoDecimalPlaces(roundedTm);

    const totalAmount = roundedTm * CertificateWeight + 590 + 590;

    totalAmountSpan.textContent = formatToTwoDecimalPlaces(totalAmount);
  }

  Object.values(sliders).forEach((slider) =>
    slider.addEventListener("input", calculateResult)
  );

  Object.values(selects).forEach((select) => {
    select.addEventListener("click", (event) => {
      if (event.target.classList.contains("custom-option")) {
        select
          .querySelectorAll(".custom-option")
          .forEach((option) => option.classList.remove("selected"));
        event.target.classList.add("selected");
        calculateResult();
      }
    });
  });

  calculateResult();
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".custom-select").forEach((selectWrapper) => {
    const trigger = selectWrapper.querySelector(".custom-select-trigger");
    const arrow = trigger.querySelector(".custom-select-arrow");
    const options = selectWrapper.querySelectorAll(".custom-option");

    function truncateText(text, maxLength) {
      return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    function updateTriggerText(text) {
      trigger.innerHTML = `${truncateText(text, 30)}`;
      trigger.appendChild(arrow);
    }

    updateTriggerText(trigger.textContent.trim());

    options.forEach((option) => {
      option.addEventListener("click", function () {
        updateTriggerText(this.textContent.trim());
      });
    });
  });
});
