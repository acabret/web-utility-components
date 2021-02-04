export default class Select {
  constructor(element) {
    this.element = element;
    this.options = getFormattedOptions(element.querySelectorAll("option"));
    this.customElement = document.createElement("div");
    this.labelElement = document.createElement("span");
    this.optionsCustomElement = document.createElement("ul");
    setupCustomElement(this);
    element.style.display = "none";
    this.element.after(this.customElement);
    // this.element.remove()
  }

  get selectedOption() {
    return this.options.find((option) => option.selected);
  }

  get selectedOptionIndex() {
    return this.options.indexOf(this.selectedOption);
  }

  selectValue(value) {
    const newSelectedOption = this.options.find((option) => {
      return option.value === value;
    });

    const prevSelectedOption = this.selectedOption;
    prevSelectedOption.selected = false;
    prevSelectedOption.element.selected = false;

    this.optionsCustomElement
      .querySelector(`[data-value="${prevSelectedOption.value}"]`)
      .classList.remove("selected");
    // console.log(this.optionsCustomElement
    //   .querySelector(`[data-value="${prevSelectedOption}"]`));

    const newElementSelected = this.optionsCustomElement
      .querySelector(`[data-value="${newSelectedOption.value}"]`);

    newElementSelected.classList.add("selected");

    newElementSelected.scrollIntoView({ block: "nearest" });

    // this.optionsCustomElement.classList.remove("show");

    newSelectedOption.selected = true;
    newSelectedOption.element.selected = true;

    this.labelElement.innerText = newSelectedOption.label;
  }
  //   selectValue(value) {
  //     const newSelectedOption = this.options.find((option) => {
  //       return option.value === value;
  //     });

  //     const prevSelectedOption = this.selectedOption;
  //     prevSelectedOption.selected = false;
  //     prevSelectedOption.element.selected = false;
  //     prevSelectedOption.element.classList.remove("selected");

  //     newSelectedOption.selected = true;
  //     newSelectedOption.element.selected = true;
  //     newSelectedOption.element.classList.add("selected");

  //     this.labelElement.innerText = newSelectedOption.label;
  //   }
}

function setupCustomElement(select) {
  //Se agregar clases para dar estilos al Custom Select
  select.customElement.classList.add("custom-select-container");
  //permite que este elemento sea focuseable
  select.customElement.tabIndex = 0;

  select.labelElement.classList.add("custom-select-value");
  select.labelElement.innerText = select.selectedOption.label;

  //se inserta un element al final del nodo padre
  select.customElement.append(select.labelElement);

  //se agrega estilo al nodo de lista "ul"
  select.optionsCustomElement.classList.add("custom-select-options");

  //se procesa el array de objetos obtenido de la funcion getFormattedOptions
  //y por cada uno se agrega a la lista UL select.optionsCustomElement
  select.options.forEach((option) => {
    const optionElement = document.createElement("li");
    optionElement.classList.add("custom-select-option");
    optionElement.classList.toggle("selected", option.selected);
    optionElement.innerText = option.label;
    optionElement.dataset.value = option.value;

    optionElement.addEventListener("click", () => {
      // select.selectedOption.element.classList.remove("selected");
      select.selectValue(option.value);
      select.optionsCustomElement.classList.remove("show");
    });

    select.optionsCustomElement.append(optionElement);
  });

  //finalmente se agrega la lista UL con todos sus valores cargados
  // al nodo custom element
  select.customElement.append(select.optionsCustomElement);

  select.labelElement.addEventListener("click", () => {
    select.optionsCustomElement.classList.toggle("show");
  });

  select.customElement.addEventListener("blur", () => {
    select.optionsCustomElement.classList.remove("show");
  });

  let debounceTimeout;
  let searchTerm = "";

  select.customElement.addEventListener("keydown", (e) => {
    // console.log(e.code);

    switch (e.code) {
      case "ArrowDown":
        const nextOption = select.options[select.selectedOptionIndex + 1];
        if (nextOption) select.selectValue(nextOption.value);
        break;
      case "ArrowUp":
        const prevOption = select.options[select.selectedOptionIndex - 1];
        if (prevOption) select.selectValue(prevOption.value);
        break;

      case "Enter":
        select.optionsCustomElement.classList.remove("show");

        break;

      case "Space":
        select.optionsCustomElement.classList.toggle("show");

        break;
      case "Escape":
        // select.optionsCustomElement.classList.remove("show");
        select.optionsCustomElement.classList.remove("show");
        break;

      default:
        clearTimeout(debounceTimeout);
        searchTerm += e.key;
        debounceTimeout = setTimeout(() => {
          searchTerm = "";
        }, 500);

        const searchedOption = select.options.find((option) => {
          return option.label
            .toLowerCase()
            .startsWith(searchTerm.toLowerCase());
        });

        if (searchedOption) select.selectValue(searchedOption.value);

        // console.log(searchTerm);
        break;
    }
  });
}

function getFormattedOptions(selectOptions) {
  return [...selectOptions].map((option) => {
    // console.log(option);
    return {
      value: option.value,
      label: option.label,
      selected: option.selected,
      element: option,
    };
  });

  // selectOptions.forEach((option)=>{
  //     console.log(option);
  // })
}
