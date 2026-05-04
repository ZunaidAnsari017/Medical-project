document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
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
  }

  const weekdayPicker = document.getElementById('weekday-picker');
  const selectedDayText = document.getElementById('selected-day-text');
  const confirmDayButton = document.getElementById('confirm-day');
  const confirmationMessage = document.getElementById('confirmation-message');
  let selectedDay = null;

  if (weekdayPicker && selectedDayText && confirmDayButton && confirmationMessage) {
    weekdayPicker.addEventListener('click', function (event) {
      const button = event.target.closest('.weekday-btn');
      if (!button) return;

      const buttons = weekdayPicker.querySelectorAll('.weekday-btn');
      buttons.forEach((btn) => btn.classList.remove('selected'));

      button.classList.add('selected');
      selectedDay = button.dataset.day;
      selectedDayText.textContent = `Selected day: ${selectedDay}`;
      confirmDayButton.disabled = false;
      confirmDayButton.textContent = `Confirm appointment for ${selectedDay}`;
      confirmationMessage.textContent = '';
    });

    confirmDayButton.addEventListener('click', function () {
      if (!selectedDay) {
        confirmationMessage.textContent = 'Please select a day before confirming your appointment.';
        return;
      }

      confirmationMessage.textContent = `Appointment confirmed for ${selectedDay}. Please contact the clinic to finalize the time.`;
      confirmDayButton.textContent = `Confirmed: ${selectedDay}`;
      confirmDayButton.disabled = true;
      selectedDayText.textContent = `Appointment day selected: ${selectedDay}`;
    });
  }
});