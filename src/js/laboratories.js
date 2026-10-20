document.addEventListener("DOMContentLoaded", () => {
  const trimAndUpdateText = (elements, maxLength) => {
    elements.forEach((element) => {
      element.textContent = trimText(element.textContent, maxLength);
    });
  };

  const labDescriptions = document.querySelectorAll(".lab_name p");
  const labTitles = document.querySelectorAll(".lab h5");

  trimAndUpdateText(labDescriptions, 150);
  trimAndUpdateText(labTitles, 50);
});

function trimText(text, maxLength) {
  const trimmed = text.trim();
  return trimmed.length <= maxLength
    ? trimmed
    : trimmed.substring(0, trimmed.lastIndexOf(" ", maxLength)) + "…";
}
