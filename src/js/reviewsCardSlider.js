const reviewsCardBox = document.querySelector(".reviews__cards");
const reviewsCards = document.querySelectorAll(".reviews__card");
const cardStyles = reviewsCards[0].currentStyle || window.getComputedStyle(reviewsCards[0]);
const reviewsLeftArrow = document.querySelector(".reviews__left-arrow");
const reviewsRightArrow = document.querySelector(".reviews__right-arrow");

const reviewsSliderSpeed = 3000;
let reviewsCardShift = 0;

const handleReviewsCardSlider = () => {
	reviewsCardShift++;
	changeReviewsCard();
};
let startReviewsCardSlider = setInterval(handleReviewsCardSlider, reviewsSliderSpeed);

const changeReviewsCard = () => {
	const cardWidth = reviewsCards[0].clientWidth;
	const cardMargin = parseInt(cardStyles.marginLeft) + parseInt(cardStyles.marginRight); // suma lewego i prawego marginesu
	const pageWidth = window.innerWidth;
	reviewsCardBox.style.transition = "transform 0.3s";
	if (pageWidth < 768) {
		if (reviewsCardShift < 0) {
			reviewsCardShift = reviewsCards.length - 1;
		} else if (reviewsCardShift > reviewsCards.length - 1) {
			reviewsCardShift = 0;
		}
	} else if (pageWidth < 992) {
		if (reviewsCardShift < 0) {
			reviewsCardShift = reviewsCards.length - 2;
		} else if (reviewsCardShift > reviewsCards.length - 2) {
			reviewsCardShift = 0;
		}
	} else if (pageWidth >= 992) {
		if (reviewsCardShift < 0) {
			reviewsCardShift = reviewsCards.length - 3;
		} else if (reviewsCardShift > reviewsCards.length - 3) {
			reviewsCardShift = 0;
		}
	}
	reviewsCardBox.style.transform = `translateX(${-(cardWidth + cardMargin) * reviewsCardShift}px)`;
};

const resetReviewsCardInterval = () => {
	clearInterval(startReviewsCardSlider);
	changeReviewsCard();
	startReviewsCardSlider = setInterval(handleReviewsCardSlider, reviewsSliderSpeed);
};

const handleReviewsleftArrow = () => {
	reviewsCardShift--;
	resetReviewsCardInterval();
};
const handleReviewsRightArrow = () => {
	reviewsCardShift++;
	resetReviewsCardInterval();
};

window.addEventListener("resize", resetReviewsCardInterval); //Zatrzymanie slidera w trakcie zmiany szerokości przeglądarki
reviewsLeftArrow.addEventListener("click", handleReviewsleftArrow);
reviewsRightArrow.addEventListener("click", handleReviewsRightArrow);
