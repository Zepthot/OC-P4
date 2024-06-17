// DOM Elements
const form = document.querySelector("form[name='reserve']");
const modalForm = document.querySelector(".modal-form");
const modalConfirm = document.querySelector(".modal-confirm");
const texts = document.querySelectorAll("input[data-type='text']");
const numbers = document.querySelectorAll("input[data-type='number']");
const emails = document.querySelectorAll("input[data-type='email']");
const dates = document.querySelectorAll("input[data-type='date']");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const tournament = document.getElementById("quantity");
const nextEvent = document.getElementById("checkbox2");

function getSelectedRadioValue(name) {
  const radios = document.querySelectorAll(`input[name='${name}']`);
  for (const radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return null;
}

// submit event
form?.addEventListener("submit", submitForm);

// on submit
function submitForm(event) {
  event.preventDefault();
  if (validator()) {
    const validData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      birthdate: birthdate.value,
      tournamentQty: tournament.value,
      location: getSelectedRadioValue("location"),
      nextEventNotification: nextEvent.checked,
    };
    switchToConfirmModal();
    form?.reset();
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

// error display
function showError(element) {
  const formData = element.closest(".formData");
  if (formData) {
    formData.setAttribute("data-error-visible", "true");
  }
}

// error masking
function hideError(element) {
  const formData = element.closest(".formData");
  if (formData) {
    formData.setAttribute("data-error-visible", "false");
  }
}

function validateEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

function calculateAge(birthdate) {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDifference = today.getMonth() - birthdate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }
  return age;
}

function validator() {
  let isValid = true;
  texts.forEach((input) => {
    const min = input.dataset.min ? Number(input.dataset.min) : null;
    const max = input.dataset.max ? Number(input.dataset.max) : null;

    const valueLength = input.value.length;

    if (min !== null && valueLength < min) {
      showError(input);
      isValid = false;
    } else if (max !== null && valueLength > max) {
      showError(input);
      isValid = false;
    } else {
      hideError(input);
    }
  });

  numbers.forEach((input) => {
    const min = input.dataset.min ? Number(input.dataset.min) : null;
    const max = input.dataset.max ? Number(input.dataset.max) : null;

    const value = Number(input.value);

    if (isNaN(value) || !input.value) {
      showError(input);
      isValid = false;
      return;
    }

    if (min !== null && value < min) {
      showError(input);
      isValid = false;
    } else if (max !== null && value > max) {
      showError(input);
      isValid = false;
    } else {
      hideError(input);
    }
  });

  emails.forEach((input) => {
    if (!validateEmail(input.value)) {
      showError(input);
      isValid = false;
    } else {
      hideError(input);
    }
  });

  dates.forEach((input) => {
    const birthdate = new Date(input.value);
    const age = calculateAge(birthdate);

    if (isNaN(age)) {
      showError(input);
      isValid = false;
      return;
    }

    if (age < 18) {
      showError(input);
      isValid = false;
    } else {
      hideError(input);
    }
  });

  const radioGroup = document.querySelector(".formData[data-radio='true']");
  if (radioGroup) {
    const radios = radioGroup.querySelectorAll("input[type='radio']");
    const isSelected = Array.from(radios).some((radio) => radio.checked);

    if (!isSelected) {
      showError(radioGroup);
      isValid = false;
    } else {
      hideError(radioGroup);
    }
  }

  checkboxes.forEach((input) => {
    const formData = input.closest(".formData");
    if (formData && input.dataset.required === "true" && !input.checked) {
      showError(formData);
      isValid = false;
    } else if (formData && input.dataset.required === "true" && input.checked) {
      hideError(formData);
    }
  });

  return isValid;
}
