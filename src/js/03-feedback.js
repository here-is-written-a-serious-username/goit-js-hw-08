var throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const email = document.querySelector('[name="email"]');
const message = document.querySelector('[name="message"]');
const submit = document.querySelector('[type="submit"]');
const FORM_KEY = 'feedback-form-state';
const formValue = {};


form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

afterPageReload();

function onFormInput() {
    formValue.email = email.value;
    formValue.message = message.value;
    localStorage.setItem(FORM_KEY, JSON.stringify(formValue));
}

function onFormSubmit(event) {
    event.preventDefault();
    console.log(formValue);
    event.target.reset();
    localStorage.removeItem(FORM_KEY);    
};

function afterPageReload() {
    let someThing={};
    try {
        someThing = localStorage.getItem(FORM_KEY) === null ? undefined : JSON.parse(localStorage.getItem(FORM_KEY));
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
    
    if (someThing) {
        email.value = someThing.email;
        message.value = someThing.message;
    }
}


