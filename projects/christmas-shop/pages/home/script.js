document.addEventListener('DOMContentLoaded', function () {
    const burgerButton = document.getElementById('burgerButton');
    const burgerMenu = document.getElementById('burgerMenu');

    function toggleMenu() {
        burgerMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        burgerButton.classList.toggle('rotated');

        function removeActiveClassOnResize() {
            if (window.innerWidth > 768) {
                burgerMenu.classList.remove('active');
                burgerButton.classList.remove('rotated');
                document.body.classList.remove('no-scroll');
            }
        }

        window.addEventListener('resize', removeActiveClassOnResize);

        removeActiveClassOnResize();
    }

    burgerButton.addEventListener('click', toggleMenu)

    burgerMenu.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            toggleMenu()
        }
    });

    // Слайдер

    const slider = document.querySelector('.slider-carousel')
    const sliderButtonLeft = document.getElementById('sliderButtonLeft');
    const sliderButtonRight = document.getElementById('sliderButtonRight');
 
    let currentOffset = 0;
    let stepsToScroll = getStepsToScroll();
    
    function getStepsToScroll() {
        if (window.innerWidth <= 767 && window.innerWidth >= 380) {
            return 6;
        } else {
            return 3;
        }
    }

    function calculateStepWidth() {
        const totalWidth = slider.scrollWidth;
        const visibleWidth = slider.offsetWidth;

        return (totalWidth - visibleWidth) / stepsToScroll;
    }

    function updateButtonStates() {
        const totalWidth = slider.scrollWidth;
        const visibleWidth = slider.offsetWidth;

        
        if (currentOffset <= 0) {
            sliderButtonLeft.classList.add('slider-button_inactive');
            sliderButtonLeft.classList.remove('slider-button_active');
        } else {
            sliderButtonLeft.classList.add('slider-button_active');
            sliderButtonLeft.classList.remove('slider-button_inactive');
        }

        if (currentOffset >= totalWidth - visibleWidth) {
            sliderButtonRight.classList.add('slider-button_inactive');
            sliderButtonRight.classList.remove('slider-button_active');
        } else {
            sliderButtonRight.classList.add('slider-button_active');
            sliderButtonRight.classList.remove('slider-button_inactive');
        }
    }

    function resetSliderPosition() {
        currentOffset = 0;
        slider.style.transform = `translateX(0px)`;
        stepsToScroll = getStepsToScroll();
        updateButtonStates();
    }

    sliderButtonRight.addEventListener('click', () => {
        const stepWidth = calculateStepWidth();
        const totalWidth = slider.scrollWidth;
        const visibleWidth = slider.offsetWidth;


        if (currentOffset + stepWidth < totalWidth - visibleWidth) {
            currentOffset += stepWidth;
        } else {
            currentOffset = totalWidth - visibleWidth;
        }

        slider.style.transform = `translateX(-${currentOffset}px)`;
        updateButtonStates();
    });

    sliderButtonLeft.addEventListener('click', () => {
        const stepWidth = calculateStepWidth();

        if (currentOffset - stepWidth >= 1) {
            currentOffset -= stepWidth;
        } else {
            currentOffset = 0;
        }

        slider.style.transform = `translateX(-${currentOffset}px)`;
        updateButtonStates();
    });

    window.addEventListener('resize', () => {
        resetSliderPosition();
    });

    updateButtonStates();

    slider.style.transition = 'transform 0.5s ease';
});