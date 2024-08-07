document.addEventListener('DOMContentLoaded', function () {
    const phoneNumberInput = document.getElementById('phoneNumber');
  
    phoneNumberInput.addEventListener('input', function (event) {
      let input = event.target.value.replace(/\D/g, '');
      let formattedInput = '';
  
      if (input.length > 0) {
        formattedInput += '+7 ';
      }
      if (input.length > 1) {
        formattedInput += '(' + input.substring(1, 4) + ') ';
      }
      if (input.length >= 5) {
        formattedInput += input.substring(4, 7) + '-';
      }
      if (input.length >= 8) {
        formattedInput += input.substring(7, 9) + '-';
      }
      if (input.length >= 10) {
        formattedInput += input.substring(9, 11);
      }
  
      event.target.value = formattedInput;
    });
  });
  