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

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem('token', result.Token);
      localStorage.setItem('user', JSON.stringify(result.User));
      updateUserInterface(result.User);
    } else {
      console.error('Error logging in:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  updateUserInterface(null);
}

function updateUserInterface(user) {
  const loginButton = document.getElementById('loginButton');
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

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  updateUserInterface(user);
});
