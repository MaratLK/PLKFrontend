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
  
      // Move the cursor to the end of the input after formatting
      const cursorPosition = formattedInput.length;
      event.target.value = formattedInput;
  
      // Prevents the cursor from moving to the beginning of the input
      setTimeout(() => {
        event.target.setSelectionRange(cursorPosition, cursorPosition);
      }, 0);
    });
  });
  