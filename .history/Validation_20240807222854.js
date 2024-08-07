document.addEventListener('DOMContentLoaded', function () {
    const phoneNumberInput = document.getElementById('phoneNumber');
  
    phoneNumberInput.addEventListener('input', function (event) {
      let input = event.target.value.replace(/\D/g, ''); // Удалить все не-цифровые символы
      let formattedInput = '';
  
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
  
      event.target.value = formattedInput; // Присвоим отформатированный ввод
    });
  
    phoneNumberInput.addEventListener('keydown', function (event) {
      // Позволяет удалять скобки и тире
      if (event.key === 'Backspace' || event.key === 'Delete') {
        let start = phoneNumberInput.selectionStart;
        let end = phoneNumberInput.selectionEnd;
  
        if (start === end) {
          if (event.key === 'Backspace' && start > 0) {
            start--;
          } else if (event.key === 'Delete' && start < phoneNumberInput.value.length) {
            end++;
          }
        }
  
        let newValue = phoneNumberInput.value.slice(0, start) + phoneNumberInput.value.slice(end);
        newValue = newValue.replace(/\D/g, ''); // Удалить все не-цифровые символы
  
        phoneNumberInput.value = newValue;
        event.preventDefault(); // Предотвратить стандартное действие браузера
        phoneNumberInput.dispatchEvent(new Event('input')); // Запустить событие input для повторного форматирования
        phoneNumberInput.setSelectionRange(start, start); // Установить курсор на правильное место
      }
    });
  });
  