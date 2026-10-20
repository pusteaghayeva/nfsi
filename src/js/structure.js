document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  document.querySelectorAll(".structure_block img").forEach((img) => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImage.src = img.src;
    });
  });

  modal.addEventListener("click", () => {
    modal.style.display = "none";
    modalImage.src = "";
  });
});
