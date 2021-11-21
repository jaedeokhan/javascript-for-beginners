
const clock = document.querySelector("h2#clock");

// intervals(간격, 몇 초마다), timeout

function sayHello(){
    console.log("hello");
}

setInterval(sayHello, 5000);