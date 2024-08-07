document.addEventListener('DOMContentLoaded', function () {
    const phoneNumberInput = document.getElementById('phoneNumber');
  
    phoneNumberInput.addEventListener('input', function (event) {
      const input = event.target;
      const value = input.value.replace(/\D/g, '');
      const cursorPosition = input.selectionStart;
      const oldLength = input.value.length;
  
      // Prevent infinite loop on formatting
      input.removeEventListener('input', arguments.callee);
  
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
      let newCursorPosition = cursorPosition;
  
      if (cursorPosition > 3 && cursorPosition <= 6) {
        newCursorPosition += 1;
      } else if (cursorPosition > 6 && cursorPosition <= 10) {
        newCursorPosition += 2;
      } else if (cursorPosition > 10 && cursorPosition <= 13) {
        newCursorPosition += 3;
      } else if (cursorPosition > 13) {
        newCursorPosition += 4;
      }
  
      // Move the cursor to the adjusted position
      setTimeout(() => {
        input.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 0);
  
      // Reattach the event listener
      input.addEventListener('input', arguments.callee);
    });
  });
  