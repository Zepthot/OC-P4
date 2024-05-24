"use strict";
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const btnClose = document.querySelector(".close");
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
btnClose === null || btnClose === void 0 ? void 0 : btnClose.addEventListener("click", closeModal);
window.addEventListener("click", closeModalOnClickOutside);
function launchModal(event) {
    modalbg
        ? (modalbg.style.display = "block")
        : console.error("Element with class 'bground' not found.");
    event.stopPropagation();
}
function closeModal() {
    modalbg
        ? (modalbg.style.display = "none")
        : console.error("Element with class 'bground' not found.");
}
function closeModalOnClickOutside(event) {
    const target = event.target;
    if (modalbg &&
        modalbg.style.display === "block" &&
        !target.closest(".content")) {
        modalbg.style.display = "none";
    }
}
//# sourceMappingURL=modal.js.map