document.addEventListener('DOMContentLoaded', function () {
    const phoneNumberInput = document.getElementById('phoneNumber');
  
    phoneNumberInput.addEventListener('input', function (event) {
      let input = event.target;
      let inputNumbersValue = input.value.replace(/\D/g, '');
      let formattedInputValue = '';
      let selectionStart = input.selectionStart;
  
      if (!inputNumbersValue) {
        return input.value = '';
      }
  
      if (input.value.length !== selectionStart) {
        if (event.data && /\D/g.test(event.data)) {
          input.value = inputNumbersValue;
        }
        return;
      }
  
      if (inputNumbersValue.length > 0) {
        formattedInputValue += '+7 ';
      }
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
  
      input.value = formattedInputValue;
  
      if (event.inputType === 'deleteContentBackward' && /\D/.test(input.value[selectionStart - 1])) {
        selectionStart--;
      }
      input.setSelectionRange(selectionStart, selectionStart);
    });
  });
  