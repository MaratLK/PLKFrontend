document.addEventListener('DOMContentLoaded', function () {
    const phoneNumberInput = document.getElementById('phoneNumber');

    phoneNumberInput.addEventListener('input', function (event) {
        let input = event.target.value.replace(/\D/g, ''); // Удалить все не-цифровые символы
        let formattedInput = '';
        let cursorPosition = phoneNumberInput.selectionStart; // Сохраняем текущую позицию курсора

        if (input.length > 0) {
            formattedInput += '+7 ';
        }
        if (input.length > 1) {
            formattedInput += '(' + input.substring(1, Math.min(input.length, 4)) + ') ';
        }
        if (input.length > 4) {
            formattedInput += input.substring(4, Math.min(input.length, 7));
        }
        if (input.length > 7) {
            formattedInput += '-' + input.substring(7, Math.min(input.length, 9));
        }
        if (input.length > 9) {
            formattedInput += '-' + input.substring(9, 11);
        }

        event.target.value = formattedInput; // Присвоим отформатированный ввод

        // Устанавливаем курсор на правильное место
        if (event.inputType === 'deleteContentBackward') {
            // При удалении содержимого устанавливаем курсор на правильное место
            if (cursorPosition === 4 || cursorPosition === 5) {
                phoneNumberInput.setSelectionRange(cursorPosition - 2, cursorPosition - 2);
            } else if (cursorPosition === 9 || cursorPosition === 10) {
                phoneNumberInput.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
            } else {
                phoneNumberInput.setSelectionRange(cursorPosition, cursorPosition);
            }
        } else {
            phoneNumberInput.setSelectionRange(cursorPosition, cursorPosition);
        }
    });
});
