function isValidStudentNumber(value) {
    return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}

function isValidPassword(value) {
    return /^(?=\S{8,}$)(?=.*[A-Z])(?=.*\d)(?=.*[@$!]).*$/.test(value);
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}

const form = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const studentNumber = document.getElementById("studentNumber");
const email = document.getElementById("email");
const mobileNumber = document.getElementById("mobileNumber");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const course = document.getElementById("course");
const terms = document.getElementById("terms");

const fullNameError = document.getElementById("fullNameError");
const studentNumberError = document.getElementById("studentNumberError");
const emailError = document.getElementById("emailError");
const mobileNumberError = document.getElementById("mobileNumberError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const courseError = document.getElementById("courseError");
const termsError = document.getElementById("termsError");

const passwordFeedback = document.getElementById("passwordFeedback");
const successMessage = document.getElementById("successMessage");
const registrationSummary = document.getElementById("registrationSummary");

const summaryName = document.getElementById("summaryName");
const summaryStudentNumber = document.getElementById("summaryStudentNumber");
const summaryEmail = document.getElementById("summaryEmail");
const summaryMobileNumber = document.getElementById("summaryMobileNumber");
const summaryCourse = document.getElementById("summaryCourse");

function setError(field, errorElement, message) {
    errorElement.textContent = message;
    field.setAttribute("aria-invalid", "true");
}

function clearError(field, errorElement) {
    errorElement.textContent = "";
    field.setAttribute("aria-invalid", "false");
}

function validateFullName() {
    const value = fullName.value.trim();

    if (value.length < 2) {
        setError(
            fullName,
            fullNameError,
            "Enter a full name with at least two characters."
        );
        return false;
    }

    clearError(fullName, fullNameError);
    return true;
}

function validateStudentNumber() {
    const value = studentNumber.value.trim();

    if (!value) {
        setError(
            studentNumber,
            studentNumberError,
            "Student number is required."
        );
        return false;
    }

    if (!isValidStudentNumber(value)) {
        setError(
            studentNumber,
            studentNumberError,
            "Enter a student number in the format 24-1234-123."
        );
        return false;
    }

    clearError(studentNumber, studentNumberError);
    return true;
}

function validateEmail() {
    const value = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]*\.[^\s@]+$/;

    if (!value) {
        setError(
            email,
            emailError,
            "Email address is required."
        );
        return false;
    }

    if (!emailPattern.test(value)) {
        setError(
            email,
            emailError,
            "Enter a valid email address."
        );
        return false;
    }

    clearError(email, emailError);
    return true;
}

function validateMobileNumber() {
    const value = mobileNumber.value.trim();
    const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

    if (!value) {
        setError(
            mobileNumber,
            mobileNumberError,
            "Mobile number is required."
        );
        return false;
    }

    if (!mobilePattern.test(value)) {
        setError(
            mobileNumber,
            mobileNumberError,
            "Enter a valid Philippine mobile number."
        );
        return false;
    }

    clearError(mobileNumber, mobileNumberError);
    return true;
}

function validatePassword() {
    const value = password.value;

    if (!value) {
        setError(
            password,
            passwordError,
            "Password is required."
        );
        passwordFeedback.textContent = "";
        return false;
    }

    if (!isValidPassword(value)) {
        setError(
            password,
            passwordError,
            "Password must have at least 8 characters, one uppercase letter, one digit, and one of @, $, or !, with no spaces."
        );
        passwordFeedback.textContent =
            "Password does not meet all required rules.";
        return false;
    }

    clearError(password, passwordError);
    passwordFeedback.textContent =
        "Password meets all required rules.";
    return true;
}

function validateConfirmPassword() {
    const value = confirmPassword.value;

    if (!value) {
        setError(
            confirmPassword,
            confirmPasswordError,
            "Please confirm your password."
        );
        return false;
    }

    if (value !== password.value) {
        setError(
            confirmPassword,
            confirmPasswordError,
            "Passwords do not match."
        );
        return false;
    }

    clearError(confirmPassword, confirmPasswordError);
    return true;
}

function validateCourse() {
    if (course.value !== "BSIT" && course.value !== "BSCS") {
        setError(
            course,
            courseError,
            "Please select BSIT or BSCS."
        );
        return false;
    }

    clearError(course, courseError);
    return true;
}

function validateTerms() {
    if (!terms.checked) {
        setError(
            terms,
            termsError,
            "You must agree to the terms."
        );
        return false;
    }

    clearError(terms, termsError);
    return true;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const validFullName = validateFullName();
    const validStudentNumber = validateStudentNumber();
    const validEmail = validateEmail();
    const validMobileNumber = validateMobileNumber();
    const validPassword = validatePassword();
    const validConfirmPassword = validateConfirmPassword();
    const validCourse = validateCourse();
    const validTerms = validateTerms();

    const valid =
        validFullName &&
        validStudentNumber &&
        validEmail &&
        validMobileNumber &&
        validPassword &&
        validConfirmPassword &&
        validCourse &&
        validTerms;

    if (!valid) {
        successMessage.textContent = "";
        registrationSummary.hidden = true;
        return;
    }

    successMessage.textContent =
        "Registration details validated successfully!";

    summaryName.textContent = fullName.value.trim();
    summaryStudentNumber.textContent = studentNumber.value.trim();
    summaryEmail.textContent = email.value.trim();
    summaryMobileNumber.textContent = mobileNumber.value.trim();
    summaryCourse.textContent = course.value;

    registrationSummary.hidden = false;
});

password.addEventListener("input", validatePassword);

fullName.addEventListener("blur", validateFullName);

course.addEventListener("change", validateCourse);

terms.addEventListener("change", validateTerms);

form.addEventListener("reset", function() {
    setTimeout(function() {
        clearError(fullName, fullNameError);
        clearError(studentNumber, studentNumberError);
        clearError(email, emailError);
        clearError(mobileNumber, mobileNumberError);
        clearError(password, passwordError);
        clearError(confirmPassword, confirmPasswordError);
        clearError(course, courseError);
        clearError(terms, termsError);

        passwordFeedback.textContent = "";
        successMessage.textContent = "";
        registrationSummary.hidden = true;

        summaryName.textContent = "";
        summaryStudentNumber.textContent = "";
        summaryEmail.textContent = "";
        summaryMobileNumber.textContent = "";
        summaryCourse.textContent = "";
    }, 0);
});