const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
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

    statusMessange.style.cssText = 'font-size: 2rem; color: white';

    const formListener = form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            statusMessange.textContent = loadMessange;
            form.appendChild(statusMessange);
            const formData = new FormData(form);
            const body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
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
        });
    };

    formListener(mainForm);
    formListener(footerForm);
    formListener(modalForm);
};

export default sendForm;

