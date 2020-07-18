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

export default regex;
