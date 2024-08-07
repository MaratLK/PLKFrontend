document.addEventListener('DOMContentLoaded', function () {
    const phoneNumberInput = document.getElementById('phoneNumber');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const textInputs = document.querySelectorAll('input[type="text"]');
    const errorMessages = document.querySelectorAll('.error-message');
  
    // Удаляем все не-цифровые символы из номера телефона
    phoneNumberInput.addEventListener('input', function (event) {
      let input = event.target.value.replace(/\D/g, ''); 
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
  
      event.target.value = formattedInput;
    });
  
    // Валидация текстовых полей
    textInputs.forEach(input => {
      input.addEventListener('input', function () {
        const value = input.value;
        const regex = /^[a-zA-Z\s]+$/;
        const errorMessage = input.nextElementSibling;
  
        if (!regex.test(value)) {
          input.classList.add('invalid');
          input.classList.remove('valid');
          errorMessage.textContent = 'Только латинские буквы разрешены.';
          errorMessage.style.display = 'block';
        } else {
          input.classList.remove('invalid');
          input.classList.add('valid');
          errorMessage.style.display = 'none';
        }
      });
    });
  
    // Валидация email
    emailInput.addEventListener('input', function () {
      const value = emailInput.value;
      const errorMessage = emailInput.nextElementSibling;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!regex.test(value)) {
        emailInput.classList.add('invalid');
        emailInput.classList.remove('valid');
        errorMessage.textContent = 'Введите правильный email адрес.';
        errorMessage.style.display = 'block';
      } else {
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
        errorMessage.style.display = 'none';
      }
    });
  
    // Валидация пароля
    passwordInput.addEventListener('input', function () {
      const value = passwordInput.value;
      const errorMessage = passwordInput.nextElementSibling;
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
      if (!regex.test(value)) {
        passwordInput.classList.add('invalid');
        passwordInput.classList.remove('valid');
        errorMessage.textContent = 'Пароль должен содержать минимум 8 символов, включая одну заглавную букву, одну строчную букву и одну цифру.';
        errorMessage.style.display = 'block';
      } else {
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
        errorMessage.style.display = 'none';
      }
    });
  });
  