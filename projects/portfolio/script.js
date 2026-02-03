const bodyElement = document.body;
const burgerButton = document.querySelector('.burger-button');
const navigation = document.querySelector('.navigation');

        // Меню навигации (бургер-меню)
burgerButton.addEventListener('click', () => {
    switchNavMenu();
    switchVertikalScroll();
    console.log('Кликнули по бургер-кнопке');
});

const navigationUl = navigation.querySelector('ul');

navigationUl.addEventListener('click', () => {
    navigation.classList.remove('active');
    burgerButton.classList.remove('active');
    switchVertikalScroll();
    console.log('нажали на ссылку в меню навигации');
});

    // Функция переключения бургер-меню и бургер-кнопки
function switchNavMenu() {
    burgerButton.classList.toggle('active');
    navigation.classList.toggle('active');
}

    // Функция переключения вертикальной полосы прокрутки
    //  при включённом или отключённом бургер-меню
function switchVertikalScroll() {
    if (navigation.classList.contains('active')) {
        bodyElement.classList.add('no-scroll');
    } else {
        bodyElement.classList.remove('no-scroll');
    }
}

                // Слайдер

const bodyWidth = bodyElement.clientWidth;
const sliderElement = document.querySelector('.slider');
// const sliderTrackElement = document.querySelector('.slider-track');
const sliderTrackElement = sliderElement.querySelector('.slider-track');
// console.log(bodyWidth);
// console.log(bodyWidth * 0.3);

sliderElement.addEventListener('mousemove', (e) => {
//     console.log(`x: ${e.clientX}, y: ${e.clientY}`);
    if (e.clientX > 0 || e.clientX < bodyWidth * 0.3) {
        sliderTrackElement.style.transform = 'translateX(-3000)';
    }
});

// console.log(sliderTrackElement.style.transform);

