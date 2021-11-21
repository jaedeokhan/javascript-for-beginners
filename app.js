const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const HIDDEN_CLASSNAME = "hidden";

function onLoginFormSubmit(event){
    event.preventDefault();
    const username = loginInput.value;

    loginForm.classList.add(HIDDEN_CLASSNAME);
    console.log(username);

    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerText = `Hello ${username} keep going`;
};

loginForm.addEventListener("submit", onLoginFormSubmit);
