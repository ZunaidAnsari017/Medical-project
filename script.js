document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');

  if (!loginForm) return;

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      alert('Please enter both Gmail and password.');
      return;
    }

    if (!email.toLowerCase().endsWith('@gmail.com')) {
      alert('Please enter a valid Gmail address ending with @gmail.com');
      return;
    }

    if (password.length < 4) {
      alert('Password should be at least 4 characters long.');
      return;
    }

    window.location.href = 'next.html';
  });
});