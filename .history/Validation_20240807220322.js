function register() {
    const phoneNumberInput = document.getElementById('phoneNumber');
    const phoneNumber = phoneNumberInput.value;
  
    if (!/^\d{11}$/.test(phoneNumber)) {
      alert('Введите правильный 11-значный номер телефона.');
      return;
    }
  
    // Ваш код для отправки данных
    console.log('Отправка данных:', {
      phoneNumber: phoneNumber,
      // другие данные формы
    });
  }
  