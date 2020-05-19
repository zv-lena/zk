import Inputmask from 'inputmask';

document.querySelectorAll('input[type="tel"]').forEach(input => {
	const im = new Inputmask("+7 999 999-99-99").mask(input);
});