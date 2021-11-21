const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const HIDDEN_CLASSNAME = "hidden";

function onLoginFormSubmit(event){
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem("username", username);

    loginForm.classList.add(HIDDEN_CLASSNAME);

    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerText = `Hello ${localStorage.getItem("username")} keep going`;
};

function checkLoginUser(){
    const loginUser = localStorage.getItem("username");

    if (loginUser !== null){
        loginForm.classList.add(HIDDEN_CLASSNAME);
        greeting.classList.remove(HIDDEN_CLASSNAME);
        greeting.innerText = `Hello ${loginUser} keep going`;
    }
};

loginForm.addEventListener("submit", onLoginFormSubmit);
window.addEventListener("load", checkLoginUser);
