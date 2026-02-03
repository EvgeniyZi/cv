const bodyElement = document.querySelector('body');
const burgerButtonElement = document.getElementById('burgerButton');

burgerButtonElement.addEventListener('click', function() {
    burgerMenuSwitch();
    
    console.log('Ты нажал Бургер-кнопку! Поздравляю!!! :)');
});

// function clickOnBody() {
//     bodyElement.addEventListener('click', function() {
//         burgerMenuSwitch();
//         console.log('Ты нажал на BODY когда открыто меню');
//     })
// }



function burgerMenuSwitch() {
    const burgerMenuElement = document.querySelector('.burger-menu');
    
    const welcomContentElement = document.querySelector('.welcom_content');
    const welcomeH1Element = welcomContentElement.querySelector('h1');
    const welcomePElement = welcomContentElement.querySelector('p');
    const welcomeButtonElement = welcomContentElement.querySelector('button');
    
    
    burgerButtonElement.classList.toggle('pressed');
    burgerMenuElement.classList.toggle('active');
    welcomeH1Element.classList.toggle('not_visible');
    welcomePElement.classList.toggle('not_visible');
    welcomeButtonElement.classList.toggle('not_visible');
    bodyElement.classList.toggle('no_scroll');

}