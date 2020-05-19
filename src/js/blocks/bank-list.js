import Swiper from 'swiper';

class BankList {
	constructor(elem) {
		this._elem = elem;
		this._sliderElem = elem.querySelector('.bank-list__slider');
		this._bankElems = elem.querySelectorAll('.bank-list__bank');
		this._banksContainerElem = elem.querySelector('.bank-list__banks-container');

		elem.BANKLIST = this;

		this._init();
	}

	get selectedBank() {
		const [ bank ] = this._banks.filter(b => b.checked);
		return bank;
	}

	setValues(values) {
		this._values = values;
		const banks = this._getFilteredBanks();

		if (!this._compareFilterResilt(banks)) {
			this._renderBanks(banks);
			this._previousFilterResult = banks;

			this._setSeletedBank(banks);
		}
	}

	_setSeletedBank(banks) {
		const seleted = this.selectedBank;

		if (!banks.length) {
			this._banks.forEach(b => b.checked = false);
			return;
		}

		if (~banks.indexOf(seleted)) return;

		this._toggleBank(banks[0]);
	}

	_init() {
		this._swiper = new Swiper(this._sliderElem, {
			freeMode: true,
			slidesPerView: 'auto',
			roundLengths: true,
			spaceBetween: 16,
			preventClicksPropagation: false
		});

		this._banks = [].map.call(this._bankElems, b => new Bank(b));

		this._elem.addEventListener('change', this._onBankListChange.bind(this));
	}

	_onBankListChange(e) {
		this._toggleBank(e.target.BANK);
	}

	_toggleBank(selectedBank) {
		this._banks.forEach(b => b.checked = false);
		selectedBank.checked = true;
		this._elem.dispatchEvent(this._getEventSelectedBank(selectedBank));
	}

	_getFilteredBanks() {
		const { deposit, initialFee, term, familyMortgage } = this._values;
		const banks = this._banks.filter(b => b.condition(deposit, initialFee, term, familyMortgage));
		return banks;
	}

	_renderBanks(banks) {
		this._banksContainerElem.innerHTML = '';
		if (banks.length) {
			banks.forEach(b => {
				this._banksContainerElem.insertAdjacentElement('beforeEnd', b.node);
			});
			this._swiper.update();
			this._setPlaceholder(false);
		} else {
			this._setPlaceholder();
		}
	}

	_setPlaceholder(state = true) {
		if (state)
			this._elem.classList.add('bank-list_empty');
		else
			this._elem.classList.remove('bank-list_empty');
	}

	_compareFilterResilt(banks) {
		if (
			(!this._previousFilterResult) ||
			(this._previousFilterResult.length != banks.length)
		) return false;

		for(let i = 0; i < banks.length; i++) {
			if (this._previousFilterResult[i] != banks[i]) return false;
		}

		return true;
	}

	_getEventSelectedBank(bank) {
		const event = new Event('bankList:selected', {bubbles: true});
		event.BANK = bank;
		return event;
	}
}

class Bank {
	constructor(elem) {
		this._node = elem;
		this._input = elem.querySelector('input');
		this._term = this._input.dataset.term;
		this._name = this._input.dataset.name;
		this._minInitialFee = this._input.dataset.minInitialFee;
		this._rate = this._input.dataset.rate;
		this._familyMortgage = !!this._input.dataset.familyMortgage;
		this._desc = this._input.dataset.desc;
		this._logo = this._input.dataset.logo;

		elem.BANK = this._input.BANK = this;
	}

	set checked(val) {
		this._input.checked = val;
	}

	get checked() {
		return this._input.checked;
	}

	get node() {
		return this._node;
	}
	
	get name() {
		return this._name;
	}

	get rate() {
		return this._rate;
	}

	get term() {
		return this._term;
	}

	getView(deposit, term) {
		const monthPayment = this._getMonthPayment(deposit, term);

		return {
			logo: this._logo,
			desc: this._desc,
			monthPayment: monthPayment,
		};
	}

	condition(deposit, initialFee, term, familyMortgage) {
		const initialFeePercent = initialFee / deposit * 100;

		return (term <= this._term) &&
			(initialFeePercent >= this._minInitialFee) &&
			(this._familyMortgage == familyMortgage);
	}

	_getMonthPayment(deposit, term) {
		const month = term * 12;
		const rate = this._rate / 12 / 100;
		const payment = deposit * (rate * Math.pow(1 + rate, month)) / (Math.pow(1 + rate, month) - 1);

		return ~~payment;
	}
}

const bankList = new BankList(document.querySelector('.bank-list'));