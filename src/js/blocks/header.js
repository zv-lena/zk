class Header {
	constructor(elem, target) {
		this._elem = elem;
		this._openBtn = elem.querySelector('.header__btn-menu-open');
		this._hideElements = elem.querySelectorAll('.header_hede-menu');
		this._menuIsOpen = false;
		this._target = target;
		this._isFixed = false;
		this._isShown = true;
		this._fixedCls = 'header_fixed';
		this._clsOpen = 'header_open';
		this._lastScrollPosition = pageYOffset;

		this._init();
	}

	_init() {
		this._targetHeight = this._target.offsetHeight;

		this._openBtn.addEventListener('click', this._onOpenMenuClick.bind(this));

		this._hideElements.forEach(e => e.addEventListener('click', this._menuClose.bind(this)));

		if (document.documentElement.clientWidth <= 1023) return false;

		window.addEventListener('scroll', this._onScroll.bind(this));
	}

	_onOpenMenuClick() {
		this._menuIsOpen = !this._menuIsOpen;

		if (this._menuIsOpen)
			this._menuOpen();
		else
			this._menuClose();
	}

	_onScroll() {
		if (this._menuIsOpen) return;

		if (!this._isFixed && this._checkNeedFix()) {
			// Зафиксировать меню
			this._isFixed = true;
			this._elem.classList.add(this._fixedCls);
		} else if (!this._checkNeedFix() && this._isFixed) {
			// Снять фиксацию
			this._resetFixedState();
		}
	}

	_resetFixedState() {
		this._elem.classList.remove(this._shownCls);
		this._elem.classList.remove(this._fixedCls);
		this._isFixed = this._isShown = false;
	}

	_checkNeedFix() {
		return pageYOffset > this._targetHeight;
	}

	_menuOpen() {
		this._elem.classList.add(this._clsOpen);
		document.body.style = 'overflow: hidden';
	}

	_menuClose() {
		this._elem.classList.remove(this._clsOpen);
		document.body.style = '';
		this._menuIsOpen = false;
	}
}
const header = new Header(document.querySelector('.header'), document.querySelector('.main-section'));