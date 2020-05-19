class Accordion {
	constructor(elem) {
		this._elem = elem;
		this._headline = elem.querySelector('.accordion__headline');
		this._wrapper = elem.querySelector('.accordion__wrapper');
		this._content = elem.querySelector('.accordion__content');
		this._isOpen = !!elem.dataset.open;

		this._init();
	}

	_init() {
		this._headline.addEventListener('click', this._onHeadlineClick.bind(this));
		this._setStateWrapper();
	}

	_onHeadlineClick() {
		this._isOpen = !this._isOpen;

		this._setStateWrapper();
	}

	_setStateWrapper() {
		const clsOpen = 'accordion_open';

		if (this._isOpen) {
			this._elem.classList.add(clsOpen);
			$(this._wrapper).slideDown(175);
		}
		else {
			$(this._wrapper).slideUp(300);
			this._elem.classList.remove(clsOpen);
		}
	}

}

document.querySelectorAll('.accordion').forEach(a => new Accordion(a));