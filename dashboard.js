// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('page-title');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Section titles mapping
    const sectionTitles = {
        'dashboard': 'Dashboard',
        'appointments': 'Appointments',
        'patients': 'Patients',
        'doctors': 'Doctors',
        'departments': 'Departments',
        'reports': 'Reports',
        'settings': 'Settings'
    };

    // Navigation click handler
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');

            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Hide all sections
            contentSections.forEach(section => section.classList.remove('active'));

            // Show selected section
            const targetSection = document.getElementById(sectionId + '-section');
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Update page title
            pageTitle.textContent = sectionTitles[sectionId] || 'Dashboard';

            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('show');
            }
        });
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 &&
            !sidebar.contains(event.target) &&
            !menuToggle.contains(event.target)) {
            sidebar.classList.remove('show');
        }
    });

    // Window resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('show');
        }
    });

    // Appointment status updates (demo functionality)
    const statusElements = document.querySelectorAll('.status');
    statusElements.forEach(status => {
        status.addEventListener('click', function() {
            if (this.classList.contains('confirmed')) {
                this.classList.remove('confirmed');
                this.classList.add('pending');
                this.textContent = 'Pending';
            } else if (this.classList.contains('pending')) {
                this.classList.remove('pending');
                this.classList.add('confirmed');
                this.textContent = 'Confirmed';
            }
        });
    });

    // Action buttons hover effects
    const actionButtons = document.querySelectorAll('.btn-action');
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Settings save functionality
    const saveSettingsBtn = document.querySelector('.save-settings');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            // Show success message
            const originalText = this.textContent;
            this.textContent = '✓ Settings Saved!';
            this.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
            }, 2000);
        });
    }

    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                // Redirect to login page or perform logout
                window.location.href = 'index.html';
            }
        });
    }

    // Notification badge click
    const notificationBtn = document.querySelector('.header-notifications');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            alert('You have 3 new notifications:\n\n1. New appointment request\n2. Patient record updated\n3. System maintenance scheduled');
        });
    }

    // Profile click
    const profileBtn = document.querySelector('.header-profile');
    if (profileBtn) {
        profileBtn.addEventListener('click', function() {
            alert('Profile menu would open here');
        });
    }

    // Add some demo data interactions
    const appointmentItems = document.querySelectorAll('.appointment-item');
    appointmentItems.forEach(item => {
        item.addEventListener('click', function() {
            const patientName = this.querySelector('h4').textContent;
            alert(`Appointment details for ${patientName}\n\nThis would open the appointment details modal.`);
        });
    });

    // Patient cards click
    const patientCards = document.querySelectorAll('.patient-card');
    patientCards.forEach(card => {
        card.addEventListener('click', function() {
            const patientName = this.querySelector('h4').textContent;
            alert(`Patient details for ${patientName}\n\nThis would open the patient profile.`);
        });
    });

    // Doctor cards click
    const doctorCards = document.querySelectorAll('.doctor-card');
    doctorCards.forEach(card => {
        card.addEventListener('click', function() {
            const doctorName = this.querySelector('h4').textContent;
            alert(`Doctor profile for ${doctorName}\n\nThis would open the doctor details page.`);
        });
    });

    // Department cards click
    const departmentCards = document.querySelectorAll('.department-card');
    departmentCards.forEach(card => {
        card.addEventListener('click', function() {
            const deptName = this.querySelector('h4').textContent;
            alert(`${deptName} Department\n\nThis would show department details and staff.`);
        });
    });

    // Initialize dashboard with current date/time
    function updateDateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // You could add a clock display if needed
        console.log('Current time:', timeString);
    }

    // Update time every second
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + B to toggle sidebar
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            sidebar.classList.toggle('show');
        }

        // Escape to close sidebar on mobile
        if (e.key === 'Escape' && window.innerWidth <= 768) {
            sidebar.classList.remove('show');
        }
    });

    // Add loading animation for section transitions
    function showLoading(section) {
        section.style.opacity = '0';
        setTimeout(() => {
            section.style.opacity = '1';
        }, 50);
    }

    // Apply loading animation to section changes
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId + '-section');
            if (targetSection) {
                showLoading(targetSection);
            }
        });
    });

    console.log('Dashboard initialized successfully!');
});