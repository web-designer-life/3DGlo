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

    countTimer('30 july 2020');

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

    //slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            dotsList = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const addDots = () => {
            for (let i = 0; i < slide.length; i++) {
                const dot = document.createElement('li');
                dot.classList.add('dot');
                if (i === 0) {
                    dot.classList.add('dot-active');
                }
                dotsList.append(dot);
            }
        };

        addDots();

        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = () => {
            interval = setInterval(autoPlaySlide, 3000);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide();
    };

    slider();

    //data attributes
    const dataImage = () => {
        const img = document.querySelectorAll('.command__photo');

        img.forEach(elem => {
            const defaultImage = elem.src;
            elem.addEventListener('mouseenter', event => {
                event.target.src = event.target.dataset.img;
            });
            elem.addEventListener('mouseout', event => {
                event.target.src = defaultImage;
            });
        });
    };

    dataImage();

    //regex
    const regex = () => {
        const calcItem = document.querySelectorAll('.calc-item[type=text]'),
            inputPhone = document.querySelectorAll('input[type=tel]'),
            inputName = document.querySelectorAll('input[placeholder="Ваше имя"]'),
            inputMessage = document.getElementById('form2-message');

        calcItem.forEach(elem => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^0-9]/ig, '');
            });
        });

        inputPhone.forEach(elem => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^+0-9]/ig, '');
            });
        });

        inputName.forEach(elem => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^а-яёА-ЯЁ ]/ig, '');
            });
        });

        inputMessage.addEventListener('input', () => {
            inputMessage.value = inputMessage.value.replace(/[^а-яёА-ЯЁ ]/ig, '');
        });
    };

    regex();

    //calculator
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
            let total = 0,
                countValue = 1,
                dayValue = 1;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                let step = 0;
                total = Math.round(price * typeValue * squareValue * countValue * dayValue);
                const totalValueSteps = setInterval(() => {
                    if (step < total) {
                        step++;
                        totalValue.textContent = step;
                    } else {
                        clearInterval(totalValueSteps);
                    }
                }, 1);
            }
        };

        calcBlock.addEventListener('input', event => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };

    calc(100);

    //form-ajax-send
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessange = 'Загрузка...',
            successMesage = 'Спасибо! Мы скоро с вами свяжемся!',
            mainForm = document.getElementById('form1'),
            footerForm = document.getElementById('form2'),
            modalForm = document.getElementById('form3'),
            statusMessange = document.createElement('div');

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        };

        statusMessange.style.cssText = 'font-size: 2rem; color: white';

        const formListener = form => {
            form.addEventListener('submit', event => {
                event.preventDefault();
                statusMessange.textContent = loadMessange;
                form.appendChild(statusMessange);
                const formData = new FormData(form),
                    body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body, () => {
                    statusMessange.textContent = successMesage;
                    form.reset();
                },
                error => {
                    statusMessange.textContent = errorMessage;
                    form.reset();
                    console.error(error);
                });
            });
        };

        formListener(mainForm);
        formListener(footerForm);
        formListener(modalForm);
    };

    sendForm();
});
