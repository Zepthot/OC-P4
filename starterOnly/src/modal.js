// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const btnClose = document.querySelector(".close");
const btnCloseConfirm = document.getElementById("btn-close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal events
btnClose?.addEventListener("click", closeModal);
btnCloseConfirm?.addEventListener("click", closeModal);
window.addEventListener("click", closeModalOnClickOutside);

// launch modal form
function launchModal(event) {
  modalbg
    ? (modalbg.style.display = "block")
    : console.error("Element with class 'bground' not found.");

  event.stopPropagation();
}

// close modal button
function closeModal() {
  modalbg
    ? (modalbg.style.display = "none")
    : console.error("Element with class 'bground' not found.");
}

// close modal on click outside
function closeModalOnClickOutside(event) {
  const target = event.target;
  if (
    modalbg &&
    modalbg.style.display === "block" &&
    !target.closest(".content")
  ) {
    modalbg.style.display = "none";
  }
}
