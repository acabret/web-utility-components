export default class Select{

    constructor(element){
        this.element = element
        this.options = getFormattedOptions( element.querySelectorAll('option'))
        this.customElement = document.createElement('div')
        this.labelElement = document.createElement('span')
        this.optionsCustomElement = document.createElement('ul')
        setupCustomElement(this)
        this.element.after(this.customElement)
        // this.element.remove()

    }

    get selectedOption(){
        return this.options.find(option=>option.selected)
    }

}

function setupCustomElement(select){

    //Se agregar clases para dar estilos al Custom Select
    select.customElement.classList.add('custom-select-container')
    //permite que este elemento sea focuseable
    select.customElement.tabIndex = 0
    select.labelElement.classList.add('custom-select-value')
    select.labelElement.innerText = select.selectedOption.label


    //se inserta un element al final del nodo padre
    select.customElement.append(select.labelElement)

    //se agrega estilo al nodo de lista "ul"
    select.optionsCustomElement.classList.add('custom-select-options')

    select.options.forEach((option)=>{
        const optionElement = document.createElement('li')
        optionElement.classList.add('custom-select-option')
        optionElement.classList.toggle('selected', option.selected)
        optionElement.innerText = option.label
        optionElement.dataset.value = option.value
        select.optionsCustomElement.append(optionElement)

    })



    select.customElement.append(select.optionsCustomElement)

}


function getFormattedOptions(selectOptions){

    return [...selectOptions].map((option)=>{
        console.log(option);
        return {
            value: option.value,
            label: option.label,
            selected: option.selected,
            element: option
        }
    })

    // selectOptions.forEach((option)=>{
    //     console.log(option);
    // })
}
