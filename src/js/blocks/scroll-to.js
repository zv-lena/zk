import animateScrollTo from 'animated-scroll-to';

const buttons = document.querySelectorAll('.scroll-to');

buttons.forEach(button => {
	const anchorSelector = button.hash || button.dataset.scrollTo;
	const anchor = document.querySelector(anchorSelector);

	button.addEventListener('click', e => {
		e.preventDefault();

		const anchorPositon = anchor.getBoundingClientRect().top + pageYOffset - 70;

		animateScrollTo(anchorPositon);
	});
});