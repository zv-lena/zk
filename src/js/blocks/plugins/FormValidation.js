class FormValidation {
	constructor(form, submitFunc) {
		this._form = form;
		this._submitFunc = submitFunc;
		this._inputs = [].slice.call(form.querySelectorAll('input'), 0);
		this._requiredFiedls = form.querySelectorAll('input[required]');
		this._formInvalidCls = 'form-invalid';

		this._init();
	}

	get inputs() {
		return this._inputs;
	}

	_init() {
		this._form.addEventListener('submit', this._onSubmit.bind(this));
	}

	_onSubmit(e) {
		e.preventDefault();
		this._hideErrors();

		if (this._checkFiedls()) {
			this._submitFunc.call(this, this._formToObject());
		} else {
			this._showErrors();
		}
	}

	_showErrors() {
		this._form.classList.add(this._formInvalidCls);
	}

	_hideErrors() {
		this._form.classList.remove(this._formInvalidCls);
	}

	_checkFiedls() {
		let isValid = true;

		for (let i = 0; i < this._requiredFiedls.length; i++) {
			if (this._requiredFiedls[i].value.trim()) continue;
	
			isValid = false;
			break;
		}
	
		return isValid;
	}

	_formToObject() {
		// const array = [].map.call(this._inputs, i => {
		// 	return {
		// 		name: i.name,
		// 		value: i.value
		// 	}
		// });
		const array = $(this._form).serializeArray();
		const dist = {};

		array.forEach(e => {
			const { name, value } = e;

			if (dist[name]) {
				if (Array.isArray(dist[name]))
					dist[name].push(value);
				else
					dist[name] = [dist[name], value];
			} else {
				dist[name] = value;
			}
		});

		return dist;
	}
}

export default FormValidation;