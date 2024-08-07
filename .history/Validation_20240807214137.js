document.addEventListener('DOMContentLoaded', function () {
    const phoneNumberInput = document.getElementById('phoneNumber');
  
    phoneNumberInput.addEventListener('input', function (event) {
      const input = event.target;
      const value = input.value.replace(/\D/g, '');
      const cursorPosition = input.selectionStart;
      const oldLength = input.value.length;
      
      let formattedInput = '';
  
      if (value.length > 0) {
        formattedInput += '+7 ';
      }
      if (value.length > 1) {
        formattedInput += '(' + value.substring(1, 4) + ') ';
      }
      if (value.length >= 5) {
        formattedInput += value.substring(4, 7) + '-';
      }
      if (value.length >= 8) {
        formattedInput += value.substring(7, 9) + '-';
      }
      if (value.length >= 10) {
        formattedInput += value.substring(9, 11);
      }
  
      input.value = formattedInput;
  
      // Adjust the cursor position
      let newCursorPosition = cursorPosition + (formattedInput.length - oldLength);
  
      // Prevent cursor from going beyond the formatted string
      if (newCursorPosition > formattedInput.length) {
        newCursorPosition = formattedInput.length;
      }
  
      // Move the cursor to the adjusted position
      setTimeout(() => {
        input.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 0);
    });
  });
  