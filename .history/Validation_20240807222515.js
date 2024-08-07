document.addEventListener('DOMContentLoaded', function () {
    const phoneNumberInput = document.getElementById('phoneNumber');
    
    phoneNumberInput.addEventListener('input', function (event) {
      let input = event.target.value.replace(/\D/g, ''); // Удалить все не-цифровые символы
      let formattedInput = '';
      let cursorPosition = phoneNumberInput.selectionStart; // Сохраняем текущую позицию курсора
      const prevLength = event.target.value.length; // Предыдущая длина значения
  
      if (input.length > 0) {
        formattedInput += '+7';
      }
      if (input.length > 1) {
        formattedInput += ' (' + input.substring(1, 4);
      }
      if (input.length >= 4) {
        formattedInput += ') ' + input.substring(4, 7);
      }
      if (input.length >= 7) {
        formattedInput += '-' + input.substring(7, 9);
      }
      if (input.length >= 9) {
        formattedInput += '-' + input.substring(9, 11);
      }
  
      // Присвоим отформатированный ввод
      event.target.value = formattedInput;
  
      // Корректировка позиции курсора
      /* let newCursorPosition = cursorPosition + (formattedInput.length - prevLength);
      if (newCursorPosition > formattedInput.length) {
        newCursorPosition = formattedInput.length;
      }
      phoneNumberInput.setSelectionRange(newCursorPosition, newCursorPosition); */
    });
  });
  