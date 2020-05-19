class BankViewer {
	constructor(elem) {
		this._elem = elem;
		this._bankLogoElem = elem.querySelector('.bank-viewer__bank-logo');
		this._bankDescElem = elem.querySelector('.bank-viewer__bank-desc');
		this._monthPaymentElem = elem.querySelector('.bank-viewer__payment-value');
		this._depositElem = elem.querySelector('.bank-viewer__credit-sum');

		elem.BANKVIEWER = this;
	}

	setView(viewData) {
		if (viewData) {
			this._bankLogoElem.src = viewData.logo;
			this._bankDescElem.innerHTML = viewData.desc;
			this._monthPaymentElem.innerHTML = viewData.monthPayment.toLocaleString() + ' ₽';
			this._depositElem.innerHTML = viewData.creditSum.toLocaleString() + ' ₽';
			this._setPlaceholder(false);
		} else {
			this._setPlaceholder()
		}
	}

	_setPlaceholder(state = true) {
		if (state)
			this._elem.classList.add('bank-viewer_empty');
		else
			this._elem.classList.remove('bank-viewer_empty');
	}
}

const bankViewer = new BankViewer(document.querySelector('.bank-viewer'));