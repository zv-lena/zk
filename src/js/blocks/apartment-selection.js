import FormValidation from './plugins/FormValidation';

const formElem = document.querySelector('.apartment-selection form');
const formvalidation = new FormValidation(formElem, function (formData) {
	console.log(formData);
	
	// reset поля
	this.inputs.filter(i => i.name == 'name' || i.name == 'phone').forEach(i => i.value = '');

	// Здесь отправка
});