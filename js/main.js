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
                idInterval = setTimeout(updateClock, 1000);

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

            if (timer.timeRemaining <= 0) {
                clearInterval(idInterval);
            }
        }
        setTimeout(updateClock(), 1000);
    }

    countTimer('10 july 2020');

    const anchors = document.querySelectorAll('a[href*="#"]');

    for (const anchor of anchors) {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const blockID = anchor.getAttribute('href').substr(1);
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    //menu
    const toogleMenu = () => {
        const menu = document.querySelector('menu'),
            handlerMenu = () => menu.classList.toggle('active-menu');

        document.body.addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('close-btn') || target.closest('menu li') || target.closest('.menu')) {
                handlerMenu();
            } else if (target.tagName !== 'MENU') {
                menu.classList.remove('active-menu');
            }
        });
    };
    toogleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');

        let count = 0;

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.opacity = 0;
                const width = document.documentElement.scrollWidth;
                if (width >= 768) {
                    const opacityInterval = setInterval(() => {
                        if (count < 1) {
                            count += 0.05;
                            popup.style.opacity = count;
                        } else {
                            count = 0;
                            clearInterval(opacityInterval);
                        }
                    }, 20);
                } else {
                    popup.style.opacity = 1;
                }
                popup.style.display = 'block';
            });
        });

        popup.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
                popup.style.opacity = count;
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                    popup.style.opacity = count;
                }
            }
        });
    };

    togglePopup();

    //tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;

            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();
});
