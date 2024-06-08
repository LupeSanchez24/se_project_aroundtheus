class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings._inputSelector;
    this._submitButtonSelector = settings._submitButtonSelector;
    this._inactiveButtonClass = settings._inactiveButtonClass;
    this._inputErrorClass = settings._inputErrorClass;
    this._errorClass = settings._errorClass;

    this._formEl = formEl;
  }

  _showInputError(inputEl, errorMessage) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = errorMessage;
    //errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  //fix this and make it work
  _toggleButtonState() {
    if (hasInvalidInput(this._inputEls)) {
      this._submitButton.classList.add(inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _hasInvalidInput() {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity() {
    if (!inputEl.validity.valid) {
      return showInputError(formEl, inputEl);
    }
    hideInputError(formEl, inputEl);
  }

  _setEventListeners() {
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formEl.querySelector(
      options.this._submitButtonSelector
    );
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this._formEl, inputEl, options);
        toggleButtonState(this._inputEls, this._submitButton, options);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    _setEventListeners();
  }
}

export default FormValidator;
