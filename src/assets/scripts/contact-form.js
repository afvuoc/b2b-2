/**
 * Import dependencies from node_modules
 * see commented examples below
 */

/**
 * Write any other JavaScript below
 */

/* Contact form */
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message');

/* Show input error message */
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
  return false;
}

/* Show success outline */
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
  return true;
}

/* Check email is valid */
function checkEmail(input) {
  const remail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (remail.test(input.value.trim())) {
    return showSuccess(input);
  } else {
    return showError(input, 'Este email no es válido');
  }
}

/* Check phone is valid */
function checkPhone(input) {
  const rephone = /(\+34|0034|34)?[ -]*(6|7|9)([0-9]){2}[ -]?(([0-9]){2}[ -]?([0-9]){2}[ -]?([0-9]){2}|([0-9]){3}[ -]?([0-9]){3})/;
  if (rephone.test(input.value.trim())) {
    return showSuccess(input);
  } else {
    return showError(input, 'Este teléfono no es válido');
  }
}

/* Check required fields */
function checkRequired(inputArr) {
  const success = true;
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      success &= showError(input, 'Este campo es obligatorio');
    } else {
      success &= showSuccess(input);
    }
  });
  return success;
}

/* Check input length */
function checkLength(input, min, max) {
  if (input.value.length < min) {
    return showError(input, `Este campo debe tener más de ${min} caracteres`);
  } else if (input.value.length > max) {
    return showError(input, `Este campo debe tener menos de ${max} caracteres`);
  } else {
    return showSuccess(input);
  }
}

/* Get fieldname */
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

/* Event listeners */
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const success = checkRequired([username, email, phone, message]) &&
    checkLength(username, 3, 15) &&
    checkPhone(phone) &&
    checkEmail(email) &&
    checkLength(message, 6, 100);

  if (success) {
    form.submit();
  }
});
