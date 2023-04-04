const circleBox = document.querySelector('.header__circle-box');
const imagesBox = document.querySelector('.header__slider');
const images = document.querySelectorAll('.header__slider-img');

let shift = 0;
const sliderSpeed = 3000;

//Funkcja, która tworzy kółka na sliderze (w zależności ile jest zdjęć)
const createCircle = () => {
    let counter = 1; //licznik do nadania id dla circle
    images.forEach((image, index) => {
        const circle = document.createElement("div");
        circle.setAttribute("class","header__circle");
        circle.dataset.id = counter;
        circleBox.append(circle);
        counter++
    })
    circleBox.firstElementChild.classList.add('header__circle-active');
}

createCircle();
const circles = document.querySelectorAll('.header__circle');

//Funkcja, która dodaje tło do kółka oraz wybiera dla niego odpowiednie zdjęcie (shift)
const moveImageCircle = (e) => {
    const circles = document.querySelectorAll('.header__circle');
    circles.forEach(circle => {
        circle.classList.remove('header__circle-active')
    })
    e.target.classList.add('header__circle-active')
    shift = e.target.dataset.id - 1 ;
    resetInterval();
}

//Funkcja wywoływana przez interwał aby automatycznie zmieniać kółka
const changeCircle = () => {
    const activeCircle = document.querySelector('.header__circle-active');
    const nextCircle = activeCircle.nextElementSibling;
    //Jeśli ostatni circle jest aktywny to zabieramy mu klasę i nadajemy 1 elementowi, 
    //jeśli nie to dodajemy aktywną klasę następnemu elementowi za każdym razem w interwale i zabieramy poprzedniemu
    if(circleBox.lastElementChild.classList.contains('header__circle-active')){
        circleBox.lastElementChild.classList.remove('header__circle-active');
        circleBox.firstElementChild.classList.add('header__circle-active');
    }else{
        activeCircle.classList.remove('header__circle-active');
        nextCircle.classList.add('header__circle-active');
    }
}

const handleSlider = () => {
    shift++;
    changeImages();
    changeCircle();
}

const changeImages = () => {
    const imageWidth = images[0].clientWidth; //aktualna szerokosć zdjęcia
    if(shift < 0){
        shift = images.length - 1;
    }else if(shift > images.length -1){
        shift = 0;
    }
    imagesBox.style.transform = `translateX(${-(imageWidth * shift)}px)`
}

let startSlider = setInterval(handleSlider, sliderSpeed);

const resetInterval = () => {
    clearInterval(startSlider);
    changeImages();
    startSlider = setInterval(handleSlider, sliderSpeed);
}

circles.forEach(circle => {
    circle.addEventListener('click', moveImageCircle);
})

window.addEventListener('resize', resetInterval)