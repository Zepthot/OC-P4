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
const btnClose = document.querySelector(".close");
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
function launchModal(event) {
    modalbg
        ? (modalbg.style.display = "block")
        : console.error("Element with class 'bground' not found.");
    event.stopPropagation();
}
btnClose === null || btnClose === void 0 ? void 0 : btnClose.addEventListener("click", closeModal);
function closeModal() {
    modalbg
        ? (modalbg.style.display = "none")
        : console.error("Element with class 'bground' not found.");
}
window.onclick = (event) => {
    const target = event.target;
    if (modalbg &&
        modalbg.style.display === "block" &&
        !target.closest(".content")) {
        modalbg.style.display = "none";
    }
};
//# sourceMappingURL=modal.js.map