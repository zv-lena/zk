import FormValidation from './plugins/FormValidation';
import Noty from "noty";

const formElem = document.querySelector('.footer form');
const formvalidation = new FormValidation(formElem, function(formData) {
	console.log(formData);
	// reset поля
	this.inputs.filter(i => i.name == 'phone').forEach(i => i.value = '');
	
	// Здесь отправка
});