function editNav() {
  let x = document.getElementById("myTopnav");
  x
    ? x.className === "topnav"
      ? (x.className += " responsive")
      : (x.className = "topnav")
    : console.error("Element with ID 'myTopnav' not found.");
}

// DOM Elements
const modalbg = document.querySelector<HTMLElement>(".bground");
const modalBtn = document.querySelectorAll<HTMLElement>(".modal-btn");
const formData = document.querySelectorAll<HTMLElement>(".formData");

const btnClose = document.querySelector<HTMLElement>(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal(event: Event) {
  modalbg
    ? (modalbg.style.display = "block")
    : console.error("Element with class 'bground' not found.");

  event.stopPropagation();
}

// close modal event
btnClose?.addEventListener("click", closeModal);

// close modal button
function closeModal() {
  modalbg
    ? (modalbg.style.display = "none")
    : console.error("Element with class 'bground' not found.");
}

// close modal beside
window.onclick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (
    modalbg &&
    modalbg.style.display === "block" &&
    !target.closest(".content")
  ) {
    modalbg.style.display = "none";
  }
};
