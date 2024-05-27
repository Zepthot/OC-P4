// DOM Elements
const form = document.querySelector<HTMLFormElement>("form[name='reserve']");
const firstName = document.getElementById("first") as HTMLInputElement;
const lastName = document.getElementById("last") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const birthdate = document.getElementById("birthdate") as HTMLInputElement;
const tournament = document.getElementById("quantity") as HTMLInputElement;
const locations = document.querySelectorAll<HTMLInputElement>(
  "input[name='location']"
);
let selectedLocation: string;
const checkToS = document.getElementById("checkbox1") as HTMLInputElement;
const nextEvent = document.getElementById("checkbox2") as HTMLInputElement;
const modalForm = document.querySelector(".modal-form") as HTMLElement;
const modalConfirm = document.querySelector(".modal-confirm") as HTMLElement;

// submit event
form?.addEventListener("submit", submitForm);

// on submit
function submitForm(event: SubmitEvent) {
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
    console.log("Form submitted with ", validData);
  } else {
    console.log("Form validation failed.");
  }
}

// update submit button to a close button
function switchToConfirmModal() {
  modalForm.style.display = "none";
  modalConfirm.style.display = "flex";
}

// validate inputs
function validate(): boolean {
  let isValid = true;
  // firstname
  if (!firstName.value || firstName.value.length < 2) {
    showError(firstName, "Le prénom doit contenir au moins 2 caractères.");
    isValid = false;
  } else {
    hideError(firstName);
  }
  // lastname
  if (!lastName.value || lastName.value.length < 2) {
    showError(lastName, "Le nom doit contenir au moins 2 caractères.");
    isValid = false;
  } else {
    hideError(lastName);
  }
  // email
  if (!email.value || !validateEmail(email.value)) {
    showError(email, "Veuillez entrer un e-mail valide.");
    isValid = false;
  } else {
    hideError(email);
  }
  // birthdate
  if (!birthdate.value) {
    showError(birthdate, "Veuillez entrer une date de naissance valide.");
    isValid = false;
  } else {
    hideError(birthdate);
  }
  // tournament quantity
  if (!tournament.value || isNaN(Number(tournament.value))) {
    showError(tournament, "Veuillez entrer un nombre valide.");
    isValid = false;
  } else {
    hideError(tournament);
  }
  // tournament location
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
  } else {
    hideError(locations[0]);
  }
  // terms of service
  if (!checkToS.checked) {
    showError(checkToS, "Vous devez accepter les conditions d'utilisation.");
    isValid = false;
  } else {
    hideError(checkToS);
  }
  return isValid;
}

// error display
function showError(element: HTMLElement, message: string) {
  const formData = element.closest(".formData");
  if (formData) {
    formData.setAttribute("data-error", message);
    formData.setAttribute("data-error-visible", "true");
  }
}

// error masking
function hideError(element: HTMLElement) {
  const formData = element.closest(".formData");
  if (formData) {
    formData.removeAttribute("data-error");
    formData.setAttribute("data-error-visible", "false");
  }
}

function validateEmail(email: string): boolean {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}
