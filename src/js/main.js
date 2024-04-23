const html = document.querySelector("html");
const body = document.querySelector("body");
const burgerBtn = document.querySelector(".navbar__burger-btn");
const bars = document.querySelector(".navbar__bars");
const navbar = document.querySelector(".navbar");
const navbarMobileList = document.querySelector(".navbar__mobile-list");
const navbarMobileLinks = document.querySelectorAll(
	".navbar__mobile-list-item"
);
const headerText = document.querySelector(".header__text");
const headerTitle = document.querySelector(".header__title");
const header = document.querySelector(".header");

const locationShadow = document.querySelector(".location__shadow");
const locationBtns = document.querySelectorAll(".location__box-btn");
const closeBtn = document.querySelector(".location__close-btn");
const locationMaps = document.querySelectorAll("iframe");

const offerCards = document.querySelectorAll(".offer__card");
const moreInfos = document.querySelectorAll(".offer__card-info");
const returnCardBtns = document.querySelectorAll(
	".offer__card-details-exit-btn"
);

const attractionsTexts = document.querySelectorAll(".attractions__card-bottom");
const attractionsBtns = document.querySelectorAll(
	".attractions__card-top-arrow"
);

const contactTextArea = document.querySelector(".contact__form-textarea");
const contactNumber = document.querySelector(".form__letters-number-left");
let counter = 0;
let isChanged = false; //Zmianna, która ustala czy czcionka została zmieniona czy nie - potrzebna aby w nieskończoność nie zmniejszać ani nie zwiększać czconki dla kart

// Ustawienie scrollPaddingTop na html - niezbędne do prawidłowego wyświetlania nagigacji podczas przekierowywania na daną sekcję (w momencie kliknięcia linku nawigacyjnego). Funkcja dodaje dodatkową wysokość, którą zajmuje nawigacja aby nie zakrywała ona sekcji.
const setScrollPaddingTop = () => {
	const navbarHeight = navbar.clientHeight;
	html.style.scrollPaddingTop = `${navbarHeight - 0.5}px`;
};

//Funkcja, która dodaje kolor dla nawigacji w momencie, gdy użytkownik najedzie na pierwszy napotkany tekst.
const changeNavbarColor = () => {
	const space = navbar.clientHeight / 2;
	const textPosition = headerText.offsetTop - headerText.clientHeight - space;

	if (window.scrollY >= textPosition) {
		navbar.classList.add("shadow");
	} else {
		navbar.classList.remove("shadow");
	}
};

//wysuwanie nagigacji mobilnej i zmiana przycisku
const showMobileNavigation = () => {
	bars.classList.toggle("navbar-active");

	navbarMobileList.classList.toggle("navbar__mobile-list-active");
};

//chowanie nawigacji mobilnej i zmiana przycisku
navbarMobileLinks.forEach(navbarMobileLink => {
	navbarMobileLink.addEventListener("click", () => {
		bars.classList.remove("navbar-active");
		navbarMobileList.classList.remove("navbar__mobile-list-active");
	});
});

// Włącz / wyłącz przewijanie dokumentu
const toggleScrolling = () => {
	body.classList.toggle("no-scroll");
};

const openLocation = e => {
	const locationName = e.target
		.closest(".location__box")
		.querySelector(".location__box-title")
		.textContent.toLowerCase(); //pobranie nazwy Państwa z h2
	const activeMap = document.querySelector(`[data-country='${locationName}']`); //pobranie mapy dla danego Państwa
	locationShadow.classList.add("location__open-shadow");
	//activeMap.classList.add('location__open-map');
	activeMap.style.display = "inline";
	toggleScrolling();
};

const closeLocation = () => {
	locationShadow.classList.remove("location__open-shadow");
	locationMaps.forEach(locationMap => {
		locationMap.style.removeProperty("display"); // usunięcie displaya ze wszystkich map aby standardowo miały one display: none
	});
	toggleScrolling();
};

//Offer card functions
const rotateCard = e => {
	const activeCard = e.target.closest(".offer__card");
	offerCards.forEach(offerCard => {
		offerCard.classList.remove("offer__rotate-card");
	});
	activeCard.classList.add("offer__rotate-card");
};
const returnToCard = e => {
	const activeCard = e.target.closest(".offer__card");
	activeCard.classList.remove("offer__rotate-card");
};

const clickOutsideCard = e => {
	const card = e.target.closest(".offer__card");
	offerCards.forEach(offerCard => {
		if (offerCard.classList.contains("offer__rotate-card") && !card) {
			offerCard.classList.remove("offer__rotate-card");
		}
	});
};



const changeFontSizeCardTest= () => {
	const offerCards = document.querySelectorAll('.offer__card');
	const offerCardTitles = document.querySelectorAll(".offer__card-title");
	const offerCardDedailsTitles = document.querySelectorAll(".offer__card-details-title");
	const cardDetailLists = document.querySelectorAll('.offer__card-details-list');
	const offerCardInfos = document.querySelectorAll('.offer__card-info');
	const offerCardBtns = document.querySelectorAll('.offer__card-details-btn');

	if(offerCards[0].clientWidth < 322){
		offerCards.forEach(offerCard => offerCard.classList.add("small-card"));
		offerCardTitles.forEach(offerCardTitle => offerCardTitle.classList.add("small-title"));
		offerCardDedailsTitles.forEach(offerCardDedailsTitle => offerCardDedailsTitle.classList.add("small-title"));
		cardDetailLists.forEach(cardDetailList => cardDetailList.classList.add("small-font"));
		offerCardInfos.forEach(offerCardInfo => offerCardInfo.classList.add("small-info"));
		offerCardBtns.forEach(offerCardBtn => offerCardBtn.classList.add("small-btn"));
	}else{
		offerCards.forEach(offerCard => offerCard.classList.remove("small-card"));
		offerCardTitles.forEach(offerCardTitle => offerCardTitle.classList.remove("small-title"));
		offerCardDedailsTitles.forEach(offerCardDedailsTitle => offerCardDedailsTitle.classList.remove("small-title"));
		cardDetailLists.forEach(cardDetailList => cardDetailList.classList.remove("small-font"));
		offerCardInfos.forEach(offerCardInfo => offerCardInfo.classList.remove("small-info"));
		offerCardBtns.forEach(offerCardBtn => offerCardBtn.classList.remove("small-btn"));
	}
}



//Funkcja, która zmniejsza czcionkę karty jeśli będzie ona mniejsza od danego przeziału oraz rozmiar dla kart sekcji offers
const changeFontSizeCard = () => {
	const cards = document.querySelectorAll('.offer__card');
	const cardTexts = document.getElementsByName('card-text');

	
	if(cards[0].clientWidth < 322 && !isChanged){
		cards.forEach(card => {
			card.style.height = `${card.clientHeight * 0.9}px`;
		})

		cardTexts.forEach(cardText => {
			const cardTextStyles = window.getComputedStyle(cardText, null);
			const cardTextFontSize = parseFloat(cardTextStyles.getPropertyValue("font-size"));
			cardText.style.fontSize = `${cardTextFontSize * 0.9}px`;
		})

		isChanged = true;
	}else if(cards[0].clientWidth > 322 && isChanged){
		cards.forEach(card => {
			card.style.removeProperty("height");
		})

		cardTexts.forEach(cardText => {
			// const cardTextStyles = window.getComputedStyle(cardText, null);
			// const cardTextFontSize = parseFloat(cardTextStyles.getPropertyValue("font-size"));
			cardText.style.removeProperty("font-size");
		})

		isChanged = false;
	}
}


//offer cards end

//Attraction card functions

const accordionCard = e => {
	const activeBoxText = e.target
		.closest(".attractions__card")
		.querySelector(".attractions__card-bottom");
	const BoxTextHeight = activeBoxText.scrollHeight;
	const activeBtn = e.target
		.closest(".attractions__card")
		.querySelector(".attractions__card-top-arrow");

	if (activeBoxText.classList.contains("attractions__card-bottom-active")) {
		if (activeBoxText.clientHeight <= 0) {
			activeBoxText.style.maxHeight = `${BoxTextHeight}px`;
			activeBtn.classList.add("attractions__card-top-arrow-active");
		} else {
			closeAccordionCard();
		}
	} else {
		closeAccordionCard();
		activeBoxText.classList.add("attractions__card-bottom-active");
		activeBoxText.style.maxHeight = `${BoxTextHeight}px`;
		activeBtn.classList.add("attractions__card-top-arrow-active");
	}
};

//Funkcja, która na nowo oblicza wysokość w momencie, gdy użytkownik będzie modyfikował szerokość przeglądarki aby karty zawsze były rozwinięte w odpowiedniej wysokości.
const calculateAccordionCardHeght = () => {
	const attractionsTextBoxes = document.querySelectorAll('.attractions__card-bottom');
	attractionsTextBoxes.forEach(attractionsTextBox => {
		if(attractionsTextBox.classList.contains("attractions__card-bottom-active")){
			const boxTextHeight = attractionsTextBox.scrollHeight;
			attractionsTextBox.style.maxHeight = `${boxTextHeight}px`;
		}
	})
}

const closeAccordionCard = () => {
	const activeBoxesText = document.querySelectorAll(
		".attractions__card-bottom-active"
	);
	const activeBtns = document.querySelectorAll(
		".attractions__card-top-arrow-active"
	);

	activeBoxesText.forEach(activeBoxText => {
		activeBoxText.classList.remove("attractions__card-bottom-active");
		activeBoxText.style.maxHeight = `0px`;
	});

	activeBtns.forEach(activeBtns => {
		activeBtns.classList.remove("attractions__card-top-arrow-active");
	});
};

const clickOutsideAttractionCard = e => {
	if (
		!(
			e.target.classList.contains("attractions__card-content") ||
			e.target.classList.contains("attractions__card-top") ||
			e.target.classList.contains("attractions__card-top-text") ||
			e.target.classList.contains("attractions__card-title") ||
			e.target.classList.contains("attractions__card-text") ||
			e.target.classList.contains("attractions__card-top-arrow-box") ||
			e.target.classList.contains("attractions__card-top-arrow") ||
			e.target.classList.contains("attractions__card-img") ||
			e.target.classList.contains("attractions__card-bottom") ||
			e.target.classList.contains("attractions__card-bottom-text") ||
			e.target.classList.contains("attractions__card-bottom-btn")
		)
	) {
		closeAccordionCard();
	}
};

const setCurrentYear = () => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	return currentYear;
};

const setFooterYear = () => {
	const footerYear = document.querySelector(".footer__box-bottom-year");
	footerYear.textContent = `${setCurrentYear()}`;
};

const disableActiveLinks = () => {
	const links = navbar.querySelectorAll('a');
	//Usuń aktywny link - jeśli jest aktywny link to usuń go aby nie doszlo do sytuacji, w której wszystkie linki będa aktywne po zjechaniu na sam dół.
	links.forEach(link => {
		if(link.classList.contains('active-link')){
			link.classList.remove('active-link');
		}
	})
}

const scrollspy = () => {
	const sections = document.querySelectorAll("section");
	const header = document.querySelector(".header");
	const footer = document.querySelector(".footer");

	const lastSection = sections[sections.length - 1];
	const lastSectionOffsetBottom = lastSection.offsetTop + lastSection.offsetHeight;
	const headerOffsetBottom = header.offsetTop + header.offsetHeight;
	const navbarHeight = navbar.clientHeight + 0.5;
	const footerHeight = footer.offsetHeight;
	const totalDocumentHeight = document.documentElement.offsetHeight;
	const browserHeight = window.innerHeight;
	
	//Foreach oraz if dla wszystkich sekcji
	sections.forEach(section => {
		const sectionOffsetBottom = section.offsetHeight + section.offsetTop;
		//Jeśli scrollY przechodzi przez górną i dolna krawędź sekcji to nadaj kolor linka nagiwacyjnego tej sekcji
		if (window.scrollY >= section.offsetTop - navbarHeight && window.scrollY <= sectionOffsetBottom) {
			const activeSectionId = section.getAttribute("id");
			const activeLinks = navbar.querySelectorAll(`a[href="#${activeSectionId}"]`); //2 linki - dla wersji mobilnej i desktopowej
			disableActiveLinks();

			activeLinks.forEach(activeLink => activeLink.classList.add("active-link")); //Nadaj kolor dla linków
		}
	});

	//Osobny If dla header oraz footer, ponieważ nie jest on sekcją i należy sprawdzić go osobno.
	if(window.scrollY <= headerOffsetBottom - navbarHeight){
		const homeLinks = navbar.querySelectorAll("a[href='#']");
		disableActiveLinks();
		homeLinks.forEach(homeLink => homeLink.classList.add("active-link"));
		//Dwa ify, które określają czy footer ma 100% wysokości czy nie.
		//Potrzebne aby wyłączyć linki w momencie gdy użytkownik jest na samym koncu ScrollY a nawigacja nigdy nie dotknie górnej krawędzi footera.
	}else if((footerHeight + navbarHeight) >= browserHeight && window.scrollY > (lastSectionOffsetBottom - navbarHeight)){
		//Jeśli footer ma 100% wysokości i ScrollY będzie poza ostatnią sekcją to wyłączamy link nawigacyjny w momencie kiedy dolna krawędź nawigacji najedzie na gorną krawędź footera.
		disableActiveLinks();
	}else if((footerHeight + navbarHeight) < browserHeight && window.scrollY > (lastSectionOffsetBottom - (lastSection.offsetHeight / 2) - navbarHeight)){
		// Jeśli footer ma mniej niż 100% wysokości i scrollY będzie w połowie ostatniej sekcji to wyłącz link.
		disableActiveLinks();
	}else if((footerHeight + navbarHeight) < browserHeight && window.scrollY < (lastSectionOffsetBottom - (lastSection.offsetHeight / 2) - navbarHeight) && window.scrollY >= (totalDocumentHeight - browserHeight)){
		// Jeśli footer ma mniej niż 100% wysokości i scrollY będzie mniejszy niż połowa ostaniej sekcji i ScrollY będzie znajdował się na samym końcu to wyłącz link.
		//Pozwala na wyłączenie linku w momencie gdy ostatnia sekcja jest nie duża a użytkownik znajduje się na końcu strony - wtedy należy wyłączyć wszystkie linki ponieważ przegląa już footer.
		disableActiveLinks();
	}
};


const countingLetters = e => {
	contactNumber.textContent = contactTextArea.value.length;
};

//Add event listeners
burgerBtn.addEventListener("click", showMobileNavigation);
locationBtns.forEach(locationBtn => {
	locationBtn.addEventListener("click", openLocation);
});

closeBtn.addEventListener("click", closeLocation);
moreInfos.forEach(moreInfo => {
	moreInfo.addEventListener("click", rotateCard);
});
returnCardBtns.forEach(returnCardBtn => {
	returnCardBtn.addEventListener("click", returnToCard);
});
window.addEventListener("resize", changeFontSizeCard);
window.addEventListener('load', changeFontSizeCard);
window.addEventListener("click", clickOutsideCard);
window.addEventListener("resize", setScrollPaddingTop);
window.addEventListener("load", setScrollPaddingTop);
window.addEventListener("scroll", changeNavbarColor);
window.addEventListener("click", clickOutsideAttractionCard);
window.addEventListener("resize", calculateAccordionCardHeght);

attractionsBtns.forEach(attractionsBtn => {
	attractionsBtn.addEventListener("click", accordionCard);
});


contactTextArea.addEventListener("keyup", countingLetters);
document.addEventListener("DOMContentLoaded", setFooterYear);
document.addEventListener("scroll", scrollspy);
//window.addEventListener('click', clickOutsideAttractionCard);
// window.addEventListener('scroll', resetInterval); // zatrzmany slider po zmianie szerokości
// window.addEventListener('scroll', changeImages); // po zmianie szerokości należy ponownie dokonać obliczeń (ponowne wywołanie funkcji)
