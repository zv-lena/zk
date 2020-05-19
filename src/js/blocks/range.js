import noUiSlider from 'noUiSlider';
import Inputmask from "inputmask";
const ranges = document.querySelectorAll('.range');
const updateEvent = new Event('range:update', {bubbles: true});

ranges.forEach(range => {
	const rangeValues = range.dataset.range.split('-');
	const rangeStartValues = range.dataset.start.split('-');
	const isOneValue = rangeStartValues.length == 1;
	const hint = range.dataset.hint;
	const isHint = !!hint;
	const inputNames = (range.dataset.inputNames || '').split('-');

	range.insertAdjacentHTML('afterBegin', `
		<div class="range__headline">
			<input class="range__min" name="${inputNames[0]}">
			${!isOneValue ? `<input class="range__max" name="${inputNames[1]}">` : ''}
			${isHint ? `<span class="range__hint">${hint}</span>` : ''}
		</div>
		<div class="range__elem"></div>
	`);

	const nouislider = noUiSlider.create(range.querySelector('.range__elem'), {
		range: {
			'min': +rangeValues[0],
			'max': +rangeValues[1]
		},
		step: Number(range.dataset.step) || 1,
		start: isOneValue ? rangeStartValues : [rangeStartValues[0], rangeStartValues[1]],
		connect: true,
		format: {
			to: function (value) {
				return Math.round(value);
			},
			from: function (value) {
				return value.replace(/\s/g, '')
			}
		}
	});

	const component = {
		name : range.dataset.name || null,
		getValue: () => nouislider.get(),
		setValue: value => nouislider.set(value),
		setHint: hint => setHint(hint),
		setRange: range => {
			nouislider.updateOptions({
				range: {
					'min': range[0],
					'max': range[1]
				}
			});
		}
	};

	range.RANGE = component;

	if (isOneValue)
		initOneInput();
	else
		initTwoInput();

	function initOneInput() {
		const minInput = range.querySelector('.range__min');
		const onInput = () => {
			nouislider.set(minInput.value);
		};
	
		minInput.value = rangeStartValues[0];
	
		minInput.addEventListener('change', onInput);
	
		initMask(minInput);
	
		nouislider.on('update', val => {
			minInput.value = val[0];
			range.dispatchEvent(getEvent('update'));
		});

		nouislider.on('change', val => range.dispatchEvent(getEvent()));
	}

	function initTwoInput() {
		const minInput = range.querySelector('.range__min');
		const maxInput = range.querySelector('.range__max');
		const onInput = () => {
			nouislider.set([minInput.value, maxInput.value]);
		};
	
		minInput.value = rangeStartValues[0];
		maxInput.value = rangeStartValues[1];
	
		minInput.addEventListener('change', onInput);
		maxInput.addEventListener('change', onInput);
	
		initMask(minInput);
		initMask(maxInput, true);
	
		nouislider.on('update', val => {
			const [min, max] = val;
			minInput.value = min;
			maxInput.value = max;
			range.dispatchEvent(getEvent('update'));
		});

		nouislider.on('change', val => range.dispatchEvent(getEvent()));
	}

	function setHint(hint) {
		return isHint ? range.querySelector('.range__hint').innerHTML = hint : null;
	}

	function getEvent(name = 'change') {
		const event = new Event(`range:${name}`, {bubbles: true});
		event.RANGE = component;
		return event;
	}
});

function initMask(input, rightAlign = false) {
	return new Inputmask({
		alias: "decimal",
		autoGroup: true,
		groupSeparator: ' ',
		rightAlign: rightAlign
	}).mask(input);
}