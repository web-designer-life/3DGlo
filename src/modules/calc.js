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
                    if (total - step > 10000000) {
                        step += 5000000;
                    } else if (total - step > 1000000) {
                        step += 500000;
                    } else if (total - step > 100000) {
                        step += 50000;
                    } else if (total - step > 10000) {
                        step += 5000;
                    } else if (total - step > 1000) {
                        step += 500;
                    } else if (total - step > 100) {
                        step += 50;
                    } else if (total - step > 10) {
                        step += 5;
                    } else if (total - step >= 1) {
                        step++;
                    }
                    totalValue.textContent = step;
                } else {
                    clearInterval(totalValueSteps);
                }
            }, 1);
        }
    };

    calcBlock.addEventListener('input', event => {
        const target = event.target;
        totalValue.textContent = 0;
        if (target.matches('select') || target.matches('input')) {
            countSum();
        }
    });
};

export default calc;
