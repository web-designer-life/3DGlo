window.addEventListener('DOMContentLoaded', () => {

    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerminutes = document.querySelector('#timer-minutes'),
            timerseconds = document.querySelector('#timer-seconds'),
            dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);

        console.log(seconds);
        console.log(minutes);
        console.log(hours);
    }

    countTimer('10 july 2020');

});
