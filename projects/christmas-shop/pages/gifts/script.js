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
        if (event.target.tagName === 'A' || event.target.tagName === 'P') {
            toggleMenu()
        }
    });
});