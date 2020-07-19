const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        inputMessage = 'Вы ввели не все данные!',
        loadMessange = 'Загрузка...',
        successMesage = 'Спасибо! Мы скоро с вами свяжемся!',
        mainForm = document.getElementById('form1'),
        footerForm = document.getElementById('form2'),
        modalForm = document.getElementById('form3'),
        statusMessange = document.createElement('div');

    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    function checkArray(body) {
        for (const key in body) {
            if (body[key] === '') {
                return false;
            }
        }
        return true;
    }

    statusMessange.style.cssText = 'font-size: 2rem; color: white';

    const formListener = form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            const body = {};
            formData.forEach((val, key) => {
                val = val.replace(/^\s*/, '').replace(/\s*$/, '');
                body[key] = val;
            });
            if (checkArray(body)) {
                statusMessange.textContent = loadMessange;
                form.appendChild(statusMessange);
                postData(body)
                    .then(() => {
                        statusMessange.textContent = successMesage;
                        form.reset();
                    })
                    .catch(error => {
                        statusMessange.textContent = errorMessage;
                        form.reset();
                        console.log(error);
                    });
            } else {
                statusMessange.textContent = inputMessage;
                form.appendChild(statusMessange);
            }
        });
    };

    formListener(mainForm);
    formListener(footerForm);
    formListener(modalForm);
};

export default sendForm;

