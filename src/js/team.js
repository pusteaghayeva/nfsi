document.querySelectorAll(".team_member button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const parent = event.target.closest(".team_member");
    const id = parent.getAttribute("data-id");
    openShowMore(id);
  });
});

function openShowMore(id) {
  document.querySelectorAll(".show_more_team_member").forEach((member) => {
    member.style.right = "-100%";
  });

  const memberInfo = document.querySelector(
    `.show_more_team_member[data-id="${id}"]`
  );
  const overlay = document.getElementById("overlay");

  if (memberInfo) {
    memberInfo.style.right = "0";
    overlay.style.display = "block";
    document.body.classList.add("no_scroll");
  }
}

function closeShowMore() {
  document.querySelectorAll(".show_more_team_member").forEach((member) => {
    member.style.right = "-100%";
  });

  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  document.body.classList.remove("no_scroll");
}

const overlay = document.getElementById("overlay");
if (overlay) {
  overlay.addEventListener("click", closeShowMore);
}
document
  .querySelectorAll(".show_more_team_member .close")
  .forEach((closeBtn) => {
    closeBtn.addEventListener("click", closeShowMore);
  });
