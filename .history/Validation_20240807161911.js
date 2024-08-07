function validateInput(input, type) {
    let value = input.value;
    let isValid = false;

    switch (type) {
        case 'text':
            isValid = /^[A-Za-z]*$/.test(value);
            break;
        case 'phone':
            input.value = value.replace(/[^\d]/g, '');
            isValid = /^\+7\d{10}$/.test(input.value);
            break;
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            break;
        case 'password':
            isValid = value.length >= 6;  // Пример простой проверки пароля
            break;
    }

    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const phoneNumberInput = document.getElementById('phoneNumber');
    phoneNumberInput.addEventListener('focus', () => {
        if (!phoneNumberInput.value.startsWith('+7')) {
            phoneNumberInput.value = '+7';
        }
    });
});
