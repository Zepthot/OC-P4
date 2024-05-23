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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg
    ? (modalbg.style.display = "block")
    : console.error("Element with class 'bground' not found.");
}
