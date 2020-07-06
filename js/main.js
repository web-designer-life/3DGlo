
window.addEventListener('DOMContentLoaded', () => {
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        }

        function updateClock() {
            const timer = getTimeRemaining(),
                idInterval = setInterval(updateClock, 1000);

            if (timer.timeRemaining < 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            } else {
                if (timer.hours >= 10) {
                    timerHours.textContent = timer.hours;
                } else {
                    timerHours.textContent = '0' + timer.hours;
                }
                if (timer.minutes >= 10) {
                    timerMinutes.textContent = timer.minutes;
                } else {
                    timerMinutes.textContent = '0' + timer.minutes;
                }
                if (timer.seconds >= 10) {
                    timerSeconds.textContent = timer.seconds;
                } else {
                    timerSeconds.textContent = '0' + timer.seconds;
                }
            }

            if (timer.timeRemaining > 0) {
                setInterval(updateClock, 1000);
            } else {
                clearInterval(idInterval);
            }
        }

        setTimeout(updateClock(), 1000);
    }
    countTimer('7 july 2020');
});
