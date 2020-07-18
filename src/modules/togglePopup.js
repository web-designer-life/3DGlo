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

export default togglePopup;
