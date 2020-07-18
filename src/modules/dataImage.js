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

export default dataImage;
