const burgerBtn = document.querySelector('.navbar__burger-btn');
const bars = document.querySelector('.navbar__bars');
const navbarMobileList = document.querySelector('.navbar__mobile-list');
const navbarMobileLinks = document.querySelectorAll('.navbar__mobile-list-item');

const locationShadow = document.querySelector('.location__shadow');
const locationBtns = document.querySelectorAll('.location__box-btn');
const closeBtn = document.querySelector('.location__close-btn');
const locationMaps = document.querySelectorAll('iframe');


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

const openLocation = (e) => {
    const locationName = e.target.closest('.location__box').querySelector('.location__box-title').textContent.toLowerCase();
    const activeMap = document.querySelector(`.location__${locationName}`);
    locationShadow.classList.add('location__open-shadow');
    //activeMap.classList.add('location__open-map');
    activeMap.style.display = 'inline';
    
}
const closeLocation = () => {
    locationShadow.classList.remove('location__open-shadow')
    locationMaps.forEach(locationMap => {
        locationMap.style.removeProperty('display'); // usunięcie displaya ze wszystkich map aby standardowo miały one display: none
    })
}

burgerBtn.addEventListener('click', handleNav);
locationBtns.forEach(locationBtn => {
    locationBtn.addEventListener('click', openLocation);
})
closeBtn.addEventListener('click', closeLocation);



// window.addEventListener('scroll', resetInterval); // zatrzmany slider po zmianie szerokości
// window.addEventListener('scroll', changeImages); // po zmianie szerokości należy ponownie dokonać obliczeń (ponowne wywołanie funkcji)

