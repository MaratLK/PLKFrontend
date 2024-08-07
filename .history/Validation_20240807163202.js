function validateInput(input, type) {
    let value = input.value;
    let isValid = false;

    switch (type) {
        case 'text':
            isValid = /^[A-Za-z]*$/.test(value);
            break;
        case 'phone':
            input.value = value.replace(/[^\d]/g, '');
            isValid = /^\d{10}$/.test(input.value);
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

function validatePhoneNumber(input) {
    let value = input.value.replace(/[^\d]/g, '');
    let formattedValue = formatPhoneNumber(value);

    if (formattedValue) {
        input.value = formattedValue;
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
}

function formatPhoneNumber(value) {
    if (value.length <= 10) {
        let formatted = "+7 (";
        if (value.length > 0) formatted += value.substring(0, 3);
        if (value.length > 3) formatted += ") " + value.substring(3, 6);
        if (value.length > 6) formatted += "-" + value.substring(6, 8);
        if (value.length > 8) formatted += "-" + value.substring(8, 10);
        return formatted;
    }
    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    const phoneNumberInput = document.getElementById('phoneNumber');
    phoneNumberInput.addEventListener('focus', () => {
        if (!phoneNumberInput.value.startsWith('+7')) {
            phoneNumberInput.value = '+7';
        }
    });
});
