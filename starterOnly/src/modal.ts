// DOM Elements
const modalbg = document.querySelector<HTMLElement>(".bground");
const modalBtn = document.querySelectorAll<HTMLElement>(".modal-btn");
const btnClose = document.querySelector<HTMLElement>(".close");
const btnCloseConfirm = document.getElementById("btn-close") as HTMLElement;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal events
btnClose?.addEventListener("click", closeModal);
btnCloseConfirm?.addEventListener("click", closeModal);
window.addEventListener("click", closeModalOnClickOutside);

// launch modal form
function launchModal(event: Event) {
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
function closeModalOnClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (
    modalbg &&
    modalbg.style.display === "block" &&
    !target.closest(".content")
  ) {
    modalbg.style.display = "none";
  }
}
