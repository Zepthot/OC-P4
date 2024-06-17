// DOM Elements
const form = document.querySelector<HTMLFormElement>("form[name='reserve']");
const modalForm = document.querySelector(".modal-form") as HTMLElement;
const modalConfirm = document.querySelector(".modal-confirm") as HTMLElement;
const texts = document.querySelectorAll<HTMLInputElement>(
  "input[data-type='text']"
);
const numbers = document.querySelectorAll<HTMLInputElement>(
  "input[data-type='number']"
);
const emails = document.querySelectorAll<HTMLInputElement>(
  "input[data-type='email']"
);
const dates = document.querySelectorAll<HTMLInputElement>(
  "input[data-type='date']"
);
const checkboxes = document.querySelectorAll<HTMLInputElement>(
  "input[type='checkbox']"
);
const firstName = document.getElementById("first") as HTMLInputElement;
const lastName = document.getElementById("last") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const birthdate = document.getElementById("birthdate") as HTMLInputElement;
const tournament = document.getElementById("quantity") as HTMLInputElement;
const nextEvent = document.getElementById("checkbox2") as HTMLInputElement;

function getSelectedRadioValue(name: string): string | null {
  const radios = document.querySelectorAll<HTMLInputElement>(
    `input[name='${name}']`
  );
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
function submitForm(event: SubmitEvent) {
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
function showError(element: HTMLElement) {
  const formData = element.closest(".formData");
  if (formData) {
    formData.setAttribute("data-error-visible", "true");
  }
}

// error masking
function hideError(element: HTMLElement) {
  const formData = element.closest(".formData");
  if (formData) {
    formData.setAttribute("data-error-visible", "false");
  }
}

function validateEmail(email: string): boolean {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

function calculateAge(birthdate: Date): number {
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

function validator(): boolean {
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
    const isSelected = Array.from(radios).some(
      (radio) => (radio as HTMLInputElement).checked
    );

    if (!isSelected) {
      showError(radioGroup as HTMLElement);
      isValid = false;
    } else {
      hideError(radioGroup as HTMLElement);
    }
  }

  checkboxes.forEach((input) => {
    const formData = input.closest(".formData");
    if (formData && input.dataset.required === "true" && !input.checked) {
      showError(formData as HTMLElement);
    } else if (formData && input.dataset.required === "true" && input.checked) {
      hideError(formData as HTMLElement);
    }
  });

  return isValid;
}
