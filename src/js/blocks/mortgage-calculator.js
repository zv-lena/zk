import FormValidation from './plugins/FormValidation';
import Noty from "noty";

class MortgageCalculator {
	constructor(elem) {
		this._elem = elem;
		this._bankList = elem.querySelector('.bank-list');
		this._bankViewer = elem.querySelector('.bank-viewer');
		this._depositElem = elem.querySelector('.range[data-name="deposit"]');
		this._initialFeeElem = elem.querySelector('.range[data-name="initialFee"]');
		this._termElem = elem.querySelector('.range[data-name="term"]');
		this._familyMortgageElem = elem.querySelector('input[name="familyMortgage"]');

		this._init();
	}
	
	get selectedBank() {
		return this._bankList.BANKLIST.selectedBank;
	}

	_init() {
		this._updateInitialFeeRange();
		this._updateInitialFeePercent();
		this._updateBankList();
		this._updateBankViewer();

		this._elem.addEventListener('range:update', e => {
			const { name } = e.RANGE;
		
			if (name != 'deposit' && name != 'initialFee') return;
		
			if (name == 'deposit')
				this._updateInitialFeeRange();
		
			this._updateInitialFeePercent();
		});
		
		this._elem.addEventListener('range:change', e => {
			const { name } = e.RANGE;
		
			this._updateInitialFeePercent();
			this._updateBankList();
			this._updateBankViewer();
		});
		
		this._familyMortgageElem.addEventListener('change', () => {
			this._updateBankList();
			this._updateBankViewer();
		});
		
		this._bankList.addEventListener('bankList:selected', e => {
			this._updateBankViewer();
		});
	}

	_updateBankViewer() {
		const bank = this._bankList.BANKLIST.selectedBank;
	
		if (bank) {
			const creditSum = this._depositElem.RANGE.getValue() - this._initialFeeElem.RANGE.getValue();
			const viewData = bank.getView(creditSum, this._termElem.RANGE.getValue());
			viewData.creditSum = creditSum;
			this._bankViewer.BANKVIEWER.setView(viewData);
		} else {
			this._bankViewer.BANKVIEWER.setView();
		}
	}
	
	_updateBankList() {
		const values = {
			deposit: this._depositElem.RANGE.getValue(),
			initialFee: this._initialFeeElem.RANGE.getValue(),
			term: this._termElem.RANGE.getValue(),
			familyMortgage: this._familyMortgageElem.checked
		}
	
		this._bankList.BANKLIST.setValues(values);
	}
	
	_updateInitialFeeRange() {
		const depositValue = this._depositElem.RANGE.getValue();
		const initFeeValue = this._initialFeeElem.RANGE.getValue();
		const min = depositValue * 0.1;
		const max = depositValue * 0.9;
		this._initialFeeElem.RANGE.setRange([min, max]);
		this._initialFeeElem.RANGE.setValue(initFeeValue);
	}
	
	_updateInitialFeePercent() {
		const percent = Math.round(this._initialFeeElem.RANGE.getValue() / this._depositElem.RANGE.getValue() * 100);
		this._initialFeeElem.RANGE.setHint(`${percent}%`);
	}
}

const mortgageCalculator = new MortgageCalculator(document.querySelector('.mortgage-calculator'));
const formElem = document.querySelector('.mortgage-calculator form');
const formvalidation = new FormValidation(formElem, function (formData) {
	console.log(formData);
	const selectedBank = mortgageCalculator.selectedBank;

	if (selectedBank) {
		formData.bankName = selectedBank.name;
		formData.bankTerm = selectedBank.term;
		formData.bankRate = selectedBank.rate;
	}

	console.log(formData);
	

	// reset поля
	this.inputs.filter(i => i.name == 'name' || i.name == 'phone').forEach(i => i.value = '');

	// Здесь отправка
});