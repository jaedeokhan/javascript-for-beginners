
const clock = document.querySelector("h2#clock");

// intervals(간격, 몇 초마다), timeout(몇 초후에)

function fillZero(time){
    return (time < 10) ? `0${time}` : time;
}

function getClock(){
    const date = new Date();
    const hour = fillZero(date.getHours());
    const minutes = fillZero(date.getMinutes());
    const seconds = fillZero(date.getSeconds());

    const currentTime = `${hour}:${minutes}:${seconds}`
    
    clock.innerText = currentTime;
}

getClock();
setInterval(getClock, 1000);