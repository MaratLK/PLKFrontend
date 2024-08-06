async function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const companyName = document.getElementById('companyName').value;
    const address = document.getElementById('address').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const user = {
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      passwordHash: password
    };
  
    try {
      const response = await fetch('https://localhost:7268/swagger/index.html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('User registered:', result);
        // Обновление интерфейса или перенаправление пользователя
      } else {
        console.error('Error registering user:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    // Здесь нужно добавить запрос на авторизацию пользователя
    // Пример запроса можно добавить после реализации метода авторизации на сервере
  
    console.log('Login not implemented');
  }
  
  function toggleForms() {
    document.getElementById('registerForm').classList.toggle('active');
    document.getElementById('loginForm').classList.toggle('active');
  }
  
  function goBack() {
    window.history.back();
  }
  