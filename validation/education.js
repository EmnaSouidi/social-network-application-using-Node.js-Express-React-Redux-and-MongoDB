const Validator = require('validator');
const isEmpty = require ('./is-empty');


module.exports = function validateEducationInput(data) {

let errors = {};


data.school = !isEmpty(data.school) ? data.school : '';
data.degree = !isEmpty(data.degree) ? data.degree : '';
data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';







if(Validator.isEmpty(data.school)) {
    errors.school=' school fields is required';
}

if(Validator.isEmpty(data.degree)) {
    errors.degree=' degree  fields is required';
}
if(Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy=' fieldofstudy date fields is required';
}
if(Validator.isEmpty(data.from)) {
    errors.from=' from date fields is required';
}


return{
    errors,
    isValid: isEmpty(errors)
};
};
