


// Get form and input elements
const form = document.getElementById('billing-form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const usernameInput = document.getElementById('username');
const usernameError = document.getElementById('username-error');
const emailInput = document.getElementById('email');
const address = document.getElementById('address');
const paymentOptions = document.getElementsByName('optradio');
const paymentError = document.getElementById('payment-error');
const cardnameInput = document.getElementById('cardname');
const cardnumberInput = document.getElementById('cardnumber');
const expirationInput = document.getElementById('expiration');
const cvvInput = document.getElementById('cvv');
const selector1Input = document.getElementById("selector1");
const selector2Input = document.getElementById("selector2");
const errorMsg1 = document.getElementById("selector1-error");
const errorMsg2 = document.getElementById("selector2-error");
const zipcodeInput = document.getElementById('zipcode');
const zipcodeError = document.getElementById('zipcode-error');

// Handle form submit
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const isFormValid = checkInputs();

    if (isFormValid) {
        alert(" Form submitted successfully!");
        form.reset(); 
        clearValidation(); 
    }
});

// Validate inputs
function checkInputs() {
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = emailInput.value.trim();
    const addressValue = address.value.trim();
    const cardnameValue = cardnameInput.value.trim();
    const cardnumberValue = cardnumberInput.value.trim();
    const expirationValue = expirationInput.value.trim();
    const cvvValue = cvvInput.value.trim();

    let isValid = true;
    let paymentSelected = false;

    // Firstname
    if (firstnameValue === '') {
        setErrorFor(firstname);
        isValid = false;
    } else {
        setSuccessFor(firstname);
    }

    // Lastname
    if (lastnameValue === '') {
        setErrorFor(lastname, "Name cannot be blank");
        isValid = false;
    } else {
        setSuccessFor(lastname);
    }

    // Username
    if (usernameInput.value.trim() === "") {
        setErrorFor(usernameInput, "Username cannot be blank");
        usernameError.innerText = "Username is required.";
        isValid = false;
    } else if (!isValidUsername(usernameInput.value.trim())) {
        setErrorFor(usernameInput, "Username must be 3–16 characters");
        usernameError.innerText = "Invalid username.";
        isValid = false;
    } else {
        setSuccessFor(usernameInput);
        usernameError.innerText = "";
    }

    // Email
    if (emailValue === '') {
        setErrorFor(emailInput, "Email cannot be blank");
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setErrorFor(emailInput, "Enter a valid email address");
        isValid = false;
    } else {
        setSuccessFor(emailInput);
    }

    // Address
    if (addressValue === '') {
        setErrorFor(address, "Address cannot be blank");
        isValid = false;
    } else {
        setSuccessFor(address);
    }

    // Country
    if (selector1Input.value === '') {
        selector1Input.classList.add("is-invalid");
        selector1Input.classList.remove("is-valid");
        errorMsg1.textContent = "Please select a country.";
        isValid = false;
    } else {
        selector1Input.classList.remove("is-invalid");
        selector1Input.classList.add("is-valid");
        errorMsg1.textContent = "";
    }

    // State
    if (selector2Input.value === '') {
        selector2Input.classList.add("is-invalid");
        selector2Input.classList.remove("is-valid");       
        isValid = false;
    } else {
        selector2Input.classList.remove("is-invalid");
        selector2Input.classList.add("is-valid");
        errorMsg2.textContent = "";
    }

    // Zipcode
    if (zipcodeInput.value.trim() === '') {
        setErrorFor(zipcodeInput, "Cannot be blank");
        isValid = false;
    } else {
        setSuccessFor(zipcodeInput);
    }

    // Payment Method
    for (let i = 0; i < paymentOptions.length; i++) {
        if (paymentOptions[i].checked) {
            paymentSelected = true;
            break;
        }
    }

    if (!paymentSelected) {
        paymentError.innerText = "Please select a payment method.";
        isValid = false;
    } else {
        paymentError.innerText = "";
    }

    // Card name
    if (cardnameValue === '') {
        setErrorFor(cardnameInput, "Name on card is required");
        isValid = false;
    } else {
        setSuccessFor(cardnameInput);
    }

    // Card number
    if (cardnumberValue === '') {
        setErrorFor(cardnumberInput, "Card number cannot be blank");
        isValid = false;
    } else {
        setSuccessFor(cardnumberInput);
    }

    // Expiration
    if (expirationValue === '') {
        setErrorFor(expirationInput, "Expiration is required");
        isValid = false;
    } else {
        setSuccessFor(expirationInput);
    }

    // CVV
    if (cvvValue === '') {
        setErrorFor(cvvInput, "CVV cannot be blank");
        isValid = false;
    } else {
        setSuccessFor(cvvInput);
    }

    return isValid;
}

// Set error
function setErrorFor(input, message = '') {
    const container = input.closest('.container') || input.closest('.col');
    if (!container) return;
    const small = container.querySelector('small');
    if (small) small.innerText = message;
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
}

// Set success
function setSuccessFor(input) {
    const container = input.closest('.container') || input.closest('.col');
    if (!container) return;
    const small = container.querySelector('small');
    if (small) small.innerText = '';
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

// Clear all validation styles
function clearValidation() {
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
    });

    // Clear error messages
    const errorMessages = form.querySelectorAll('small');
    errorMessages.forEach(small => {
        small.textContent = '';
    });

    paymentError.innerText = '';
}

// Validators
function isValidUsername(username) {
    return /^[a-zA-Z0-9]{3,16}$/.test(username);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
