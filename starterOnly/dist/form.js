"use strict";
const form = document.querySelector("form[name='reserve']");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const tournament = document.getElementById("quantity");
const locations = document.querySelectorAll("input[name='location']");
let selectedLocation;
const checkToS = document.getElementById("checkbox1");
const nextEvent = document.getElementById("checkbox2");
const modalForm = document.querySelector(".modal-form");
const modalConfirm = document.querySelector(".modal-confirm");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", submitForm);
function submitForm(event) {
    event.preventDefault();
    if (validate()) {
        const validData = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            birthdate: birthdate.value,
            tournamentQty: tournament.value,
            location: selectedLocation,
            nextEvent: nextEvent.checked,
        };
        switchToConfirmModal();
        form === null || form === void 0 ? void 0 : form.reset();
        console.log("Form submitted with ", validData);
    }
    else {
        console.log("Form validation failed.");
    }
}
function switchToConfirmModal() {
    modalForm.style.display = "none";
    modalConfirm.style.display = "flex";
}
function validate() {
    let isValid = true;
    if (!firstName.value || firstName.value.length < 2) {
        showError(firstName, "Le prénom doit contenir au moins 2 caractères.");
        isValid = false;
    }
    else {
        hideError(firstName);
    }
    if (!lastName.value || lastName.value.length < 2) {
        showError(lastName, "Le nom doit contenir au moins 2 caractères.");
        isValid = false;
    }
    else {
        hideError(lastName);
    }
    if (!email.value || !validateEmail(email.value)) {
        showError(email, "Veuillez entrer un e-mail valide.");
        isValid = false;
    }
    else {
        hideError(email);
    }
    if (!birthdate.value) {
        showError(birthdate, "Veuillez entrer une date de naissance valide.");
        isValid = false;
    }
    else {
        hideError(birthdate);
    }
    if (!tournament.value || isNaN(Number(tournament.value))) {
        showError(tournament, "Veuillez entrer un nombre valide.");
        isValid = false;
    }
    else {
        hideError(tournament);
    }
    let anyLocationSelected = false;
    locations.forEach((input) => {
        if (input.checked) {
            selectedLocation = input.value;
            anyLocationSelected = true;
        }
    });
    if (!anyLocationSelected) {
        showError(locations[0], "Veuillez sélectionner un tournoi.");
        isValid = false;
    }
    else {
        hideError(locations[0]);
    }
    if (!checkToS.checked) {
        showError(checkToS, "Vous devez accepter les conditions d'utilisation.");
        isValid = false;
    }
    else {
        hideError(checkToS);
    }
    return isValid;
}
function showError(element, message) {
    const formData = element.closest(".formData");
    if (formData) {
        formData.setAttribute("data-error", message);
        formData.setAttribute("data-error-visible", "true");
    }
}
function hideError(element) {
    const formData = element.closest(".formData");
    if (formData) {
        formData.removeAttribute("data-error");
        formData.setAttribute("data-error-visible", "false");
    }
}
function validateEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}
//# sourceMappingURL=form.js.map