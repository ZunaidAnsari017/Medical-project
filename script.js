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

  // Slot Booking Functionality
  const appointmentDateInput = document.getElementById('appointment-date');
  const timeSlotButtons = document.querySelectorAll('.time-slot-btn');
  const bookAppointmentBtn = document.getElementById('book-appointment-btn');
  const bookingConfirmation = document.getElementById('booking-confirmation');
  const selectedSlotText = document.getElementById('selected-slot');
  let selectedDate = null;
  let selectedTime = null;

  // Set minimum date to today
  if (appointmentDateInput) {
    const today = new Date().toISOString().split('T')[0];
    appointmentDateInput.setAttribute('min', today);

    appointmentDateInput.addEventListener('change', function () {
      selectedDate = this.value;
      updateBookingButtonState();
    });
  }

  // Handle time slot selection
  timeSlotButtons.forEach(button => {
    button.addEventListener('click', function () {
      timeSlotButtons.forEach(btn => btn.classList.remove('selected'));
      this.classList.add('selected');
      selectedTime = this.dataset.time;
      const endTime = this.dataset.end;
      selectedSlotText.textContent = `Selected Time: ${selectedTime} - ${endTime} (30 mins)`;
      updateBookingButtonState();
    });
  });

  function updateBookingButtonState() {
    if (selectedDate && selectedTime) {
      bookAppointmentBtn.disabled = false;
    } else {
      bookAppointmentBtn.disabled = true;
    }
  }

  // Handle booking confirmation
  if (bookAppointmentBtn) {
    bookAppointmentBtn.addEventListener('click', function () {
      if (!selectedDate || !selectedTime) {
        alert('Please select both date and time slot.');
        return;
      }

      const appointmentDate = new Date(selectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const endTime = timeSlotButtons.forEach(btn => {
        if (btn.classList.contains('selected')) {
          return btn.dataset.end;
        }
      });

      // Find the selected button's end time
      let selectedEndTime = '';
      timeSlotButtons.forEach(btn => {
        if (btn.classList.contains('selected')) {
          selectedEndTime = btn.dataset.end;
        }
      });

      bookingConfirmation.textContent = `✓ Appointment booked for ${appointmentDate} from ${selectedTime} to ${selectedEndTime}. Confirmation has been sent to your email.`;
      bookingConfirmation.classList.add('show');

      // Reset after 3 seconds
      setTimeout(() => {
        selectedDate = null;
        selectedTime = null;
        appointmentDateInput.value = '';
        timeSlotButtons.forEach(btn => btn.classList.remove('selected'));
        selectedSlotText.textContent = '';
        bookingConfirmation.classList.remove('show');
        bookAppointmentBtn.disabled = true;
      }, 3000);
    });
  }

  // Dr. Farhat Anjum Image Click Handler
  const drFarhatImage = document.getElementById('dr-farhat-image');
  if (drFarhatImage) {
    drFarhatImage.addEventListener('click', function() {
      const slotBookingSection = document.getElementById('slot-booking-section');
      if (slotBookingSection) {
        slotBookingSection.style.display = 'block';
        slotBookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Dr. Gulfam Ansari Image Click Handler
  const drGulfamImage = document.getElementById('dr-gulfam-image');
  if (drGulfamImage) {
    drGulfamImage.addEventListener('click', function() {
      const slotBookingSection = document.getElementById('slot-booking-section');
      if (slotBookingSection) {
        slotBookingSection.style.display = 'block';
        slotBookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});