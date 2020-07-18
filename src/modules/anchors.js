const anchorsBody = () => {
    const scroll = document.querySelector('a[href="#service-block"]'),
        anchors = document.querySelectorAll('menu>ul>li>a[href*="#"]');

    scroll.addEventListener('click', e => {
        e.preventDefault();
        const blockID = scroll.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

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
};

export default anchorsBody;
