const burgerBtn = document.querySelector('.navbar__burger-btn');
const bars = document.querySelector('.navbar__bars');
const navbarMobileList = document.querySelector('.navbar__mobile-list');
const navbarMobileLinks = document.querySelectorAll('.navbar__mobile-list-item');

const locationShadow = document.querySelector('.location__shadow');
const locationBtns = document.querySelectorAll('.location__box-btn');
const closeBtn = document.querySelector('.location__close-btn');
const locationMaps = document.querySelectorAll('iframe');

const offerCards = document.querySelectorAll('.offer__card');
const moreInfos = document.querySelectorAll('.offer__card-info');
const returnCardBtns = document.querySelectorAll('.offer__card-details-exit-btn');



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

//Offer card functions
const rotateCard = (e) => {
    const activeCard = e.target.closest('.offer__card');
    offerCards.forEach(offerCard => {
        offerCard.classList.remove('offer__rotate-card');
    })
    activeCard.classList.add('offer__rotate-card');
}
const returnToCard = (e) => {
    const activeCard = e.target.closest('.offer__card');
    activeCard.classList.remove('offer__rotate-card');
}

const clickOutsideCard = (e) => {
    const card = e.target.closest('.offer__card');
    offerCards.forEach(offerCard => {
        if(offerCard.classList.contains('offer__rotate-card') && !card){
            offerCard.classList.remove('offer__rotate-card');
        }
    })
}
//offer cards end

//Add event listeners
burgerBtn.addEventListener('click', handleNav);
locationBtns.forEach(locationBtn => {
    locationBtn.addEventListener('click', openLocation);
})

closeBtn.addEventListener('click', closeLocation);
moreInfos.forEach(moreInfo => {
    moreInfo.addEventListener('click', rotateCard);
})
returnCardBtns.forEach(returnCardBtn => {
    returnCardBtn.addEventListener('click', returnToCard);
})
window.addEventListener('click', clickOutsideCard);

// window.addEventListener('scroll', resetInterval); // zatrzmany slider po zmianie szerokości
// window.addEventListener('scroll', changeImages); // po zmianie szerokości należy ponownie dokonać obliczeń (ponowne wywołanie funkcji)

