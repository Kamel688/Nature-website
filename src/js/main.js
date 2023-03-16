const burgerBtn = document.querySelector('.navbar__burger-btn');
const bars = document.querySelector('.navbar__bars');
const navbarMobileList = document.querySelector('.navbar__mobile-list');
const navbarMobileLinks = document.querySelectorAll('.navbar__mobile-list-item');

let shift = 0;
const sliderSpeed = 3000;

//wysuwanie nagigacji mobilnej i zmiana przycisku
const handleNav = ()=> {
    bars.classList.toggle('navbar__active');
    navbarMobileList.classList.toggle('navbar__mobile-list-active');
}


//chowanie nawigacji mobilnej i zmiana przycisku
navbarMobileLinks.forEach(navbarMobileLink => {
    navbarMobileLink.addEventListener('click', () => {
        bars.classList.remove('navbar__active');
        navbarMobileList.classList.remove('navbar__mobile-list-active');
    })
})




// window.addEventListener('scroll', resetInterval); // zatrzmany slider po zmianie szerokości
// window.addEventListener('scroll', changeImages); // po zmianie szerokości należy ponownie dokonać obliczeń (ponowne wywołanie funkcji)


