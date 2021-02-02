import Select from "./select.js"

const customSelects = document.querySelectorAll('[data-custom]');

customSelects.forEach((selectElement)=>{
    new Select(selectElement);

})



// console.log(customSelects);
 