document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedback-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formStatusMessage = document.getElementById('form-status-message');
    const backToHomepageBtn = document.getElementById('back-to-homepage-btn');


    function validateField(inputElement, errorElement, validationFn) {
        const isValid = validationFn(inputElement.value);
        if (isValid) {
            errorElement.textContent = '';
            inputElement.classList.remove('invalid');
            inputElement.classList.add('valid');
        } else {
            errorElement.textContent = getErrorMessage(inputElement);
            inputElement.classList.remove('valid');
            inputElement.classList.add('invalid');
        }
        return isValid;
    }

    function isRequired(value) {
        return value.trim() !== '';
    }

    function isValidEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

    function isMinLength(value, min) {
        return value.length >= min;
    }

    function getErrorMessage(inputElement) {
        if (inputElement.validity.valueMissing) {
            return 'This field is required.';
        }
        if (inputElement.type === 'email' && inputElement.validity.typeMismatch) {
             return 'Please enter a valid email address.';
        }
        if (inputElement.validity.tooShort) {
             return `Please enter at least ${inputElement.minLength} characters.`;
        }
        return '';
    }


    if (nameInput) {
         nameInput.addEventListener('input', () => {
             validateField(nameInput, nameError, isRequired);
         });
    }

    if (emailInput) {
        emailInput.addEventListener('input', () => {
            validateField(emailInput, emailError, isValidEmail);
        });
    }

    if (messageInput) {
        messageInput.addEventListener('input', () => {
            validateField(messageInput, messageError, (value) => isMinLength(value, 10));
        });
    }


    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const isNameValid = validateField(nameInput, nameError, isRequired);
            const isEmailValid = validateField(emailInput, emailError, isValidEmail);
            const isMessageValid = validateField(messageInput, messageError, (value) => isMinLength(value, 10));

            if (isNameValid && isEmailValid && isMessageValid) {
                formStatusMessage.textContent = 'Feedback submitted successfully!';
                formStatusMessage.style.color = '#28a745';

                form.reset();
                 nameInput.classList.remove('valid', 'invalid');
                 emailInput.classList.remove('valid', 'invalid');
                 messageInput.classList.remove('valid', 'invalid');

            } else {
                formStatusMessage.textContent = 'Please fix the errors in the form.';
                formStatusMessage.style.color = '#d9534f';
            }
        });
    }

     if (backToHomepageBtn) {
         backToHomepageBtn.addEventListener('click', () => {
             window.location.href = 'index.html';
         });
     }

});