"use strict";
function editNav() {
    let x = document.getElementById("myTopnav");
    x
        ? x.className === "topnav"
            ? (x.className += " responsive")
            : (x.className = "topnav")
        : console.error("Element with ID 'myTopnav' not found.");
}
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
function launchModal() {
    modalbg
        ? (modalbg.style.display = "block")
        : console.error("Element with class 'bground' not found.");
}
//# sourceMappingURL=modal.js.map