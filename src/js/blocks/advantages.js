import Swiper from 'swiper';

const elem = document.querySelector('.advantages');
const sliderElem = elem.querySelector('.advantages__slider');
const contentElem = elem.querySelector('.advantages__content');
const paginationElem = elem.querySelector('.swiper-pagination');

setSlideHeight();

let viewportWidth = document.documentElement.clientWidth;
window.addEventListener('resize', () => {
	if (viewportWidth == document.documentElement.clientWidth) return;

	viewportWidth = document.documentElement.clientWidth;
	setSlideHeight();
});

const swiper = new Swiper(sliderElem, {
	spaceBetween: 8,
	autoplay: {
		delay: 4000,
	},
	pagination: {
		el: paginationElem,
		clickable: true,
		renderBullet: (index, className) => {
			return '<span class="advantages__bullet ' + className + '">0' + (index + 1) + '</span>';
		}
	},
	breakpoints: {
		320: {
			direction: 'horizontal'
		},
		1023: {
			direction: 'vertical'
		}
	}
});

function setSlideHeight() {
	if (document.documentElement.clientWidth <= 1023) return;

	const slideHeight = (contentElem.offsetWidth * 0.7 * 0.333333 - 16) * 1.4468085106;
	sliderElem.style.height = slideHeight;
}