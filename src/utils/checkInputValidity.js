function checkInputValidity(input, setErrorText) {
  if (!input.current.validity.valid) { // если validity.valid ложь, показать ошибку
    return setErrorText(input.current.validationMessage);
  }
  return setErrorText('');
  /* return input.validity.valid */
};

export { checkInputValidity };