const cardBox = document.querySelector('.location__boxes');
const cards = document.querySelectorAll('.location__box');
const cardStyles = cards[0].currentStyle || window.getComputedStyle(cards[0]);
const leftArrow = document.querySelector('.location__left-arrow');
const rightArrow = document.querySelector('.location__right-arrow');


const sliderSpeed = 3000;
let cardShift = 0;

const handleCardSlider = () => {
    //Jeśli sprawdzana jest lokalizacja przez użytkownika to zatrzymany zostanie slider
    if(!locationShadow.classList.contains("location__open-shadow")){
        cardShift++;
        changeCard();
    }else{
        resetCardInterval();
    }
}
let startCardSlider = setInterval(handleCardSlider, sliderSpeed);

const changeCard = () => {
    const cardWidth = cards[0].clientWidth;
    const cardMargin = parseInt(cardStyles.marginLeft) + parseInt(cardStyles.marginRight); // suma lewego i prawego marginesu
    const pageWidth = window.innerWidth;
    cardBox.style.transition = 'transform 0.3s';
    if(pageWidth < 768){
        if(cardShift < 0){
            cardShift = cards.length - 1;
        }else if(cardShift > cards.length - 1){
            cardShift = 0;
        }
    }else if(pageWidth < 992){
        if(cardShift < 0){
            cardShift = cards.length - 2;
        }else if(cardShift > cards.length - 2){
            cardShift = 0;
        }
    }else if(pageWidth >= 992){
        if(cardShift < 0){
            cardShift = cards.length - 3;
        }else if(cardShift > cards.length - 3){
            cardShift = 0;
        }
    }
    cardBox.style.transform = `translateX(${-(cardWidth + cardMargin) * cardShift}px)`
}

const resetCardInterval = () => {
    clearInterval(startCardSlider);
    changeCard();
    startCardSlider = setInterval(handleCardSlider, sliderSpeed);
}

const handleleftArrow = () => {
    cardShift--;
    resetCardInterval();
}
const handleRightArrow = () => {
    cardShift++;
    resetCardInterval();
}

window.addEventListener('resize', resetCardInterval); //Zatrzymanie slidera w trakcie zmiany szerokości przeglądarki
leftArrow.addEventListener('click', handleleftArrow);
rightArrow.addEventListener('click', handleRightArrow);
