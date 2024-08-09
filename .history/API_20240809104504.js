// Обработчик DOMContentLoaded для обновления интерфейса при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('loginButton');
  
  if (loginButton) {
      const user = JSON.parse(localStorage.getItem('user'));
      updateUserInterface(user);
  } else {
      console.log('Login button not found on this page. Skipping updateUserInterface.');
  }
});

// Функция для отправки данных авторизации на сервер
async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const user = {
      email: email,
      password: password
  };

  try {
      const response = await fetch('https://localhost:7268/api/Users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
      });

      console.log('Response:', response); // Вывод ответа в консоль

      if (response.ok) {
          const result = await response.json();
          console.log('Result:', result); // Вывод результата в консоль
          localStorage.setItem('token', result.Token);
          localStorage.setItem('user', JSON.stringify(result.User));
          updateUserInterface(result.User);
      } else {
          const errorText = await response.text();
          console.error('Error logging in:', response.status, errorText); // Вывод статуса и текста ошибки
          alert('Login failed: ' + errorText); // Показ ошибки пользователю
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Login failed: ' + error.message); // Показ ошибки пользователю
  }
}

// Функция для выхода пользователя
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  updateUserInterface(null);
}

// Функция для обновления интерфейса в зависимости от состояния пользователя
function updateUserInterface(user) {
  const loginButton = document.getElementById('loginButton');
  
  if (!loginButton) {
      console.error('Login button not found');
      return; // Прекратить выполнение функции, если элемент не найден
  }

  if (user) {
      loginButton.innerHTML = `<i class="fas fa-user"></i> ${user.firstName}`;
      loginButton.href = "#";
      loginButton.onclick = logout;
  } else {
      loginButton.innerHTML = `<i class="fas fa-user"></i> Войти`;
      loginButton.href = "LogReg.html";
      loginButton.onclick = null;
  }
}

// Функция для переключения форм регистрации и авторизации
function toggleForms() {
  document.getElementById("registerForm").classList.toggle("active");
  document.getElementById("loginForm").classList.toggle("active");
  document.querySelector(".container").style.transform =
      document.querySelector(".container").style.transform === "scale(1.1)"
          ? "scale(1)"
          : "scale(1.1)";
}

// Функция для навигации назад на главную страницу
function goBack() {
  window.location.href = 'index.html'; 
}
