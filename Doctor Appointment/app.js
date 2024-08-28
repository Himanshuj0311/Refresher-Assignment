document.addEventListener('DOMContentLoaded', function () {
    const signupSection = document.getElementById('signup-section');
    const loginSection = document.getElementById('login-section');
    const appointmentSection = document.getElementById('appointment-section');
    const appointmentsList = document.getElementById('appointments-list');

    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');

    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const appointmentForm = document.getElementById('appointment-form');

    const logoutButton = document.getElementById('logout-button');

    let currentUser = null;

    // Initial setup
    signupSection.style.display = 'block';

    showSignupLink.addEventListener('click', function (e) {
        e.preventDefault();
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
    });

    showLoginLink.addEventListener('click', function (e) {
        e.preventDefault();
        signupSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        // Store user info in local storage
        if (!localStorage.getItem(username)) {
            localStorage.setItem(username, password);
            alert('Sign up successful! Please log in.');
            signupSection.style.display = 'none';
            loginSection.style.display = 'block';
        } else {
            alert('Username already exists!');
        }
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        // Check login credentials
        const storedPassword = localStorage.getItem(username);
        if (storedPassword === password) {
            alert('Login successful!');
            currentUser = username;
            loginSection.style.display = 'none';
            appointmentSection.style.display = 'block';
            displayAppointments();
        } else {
            alert('Invalid username or password');
        }
    });

    appointmentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const doctor = document.getElementById('doctor-select').value;
        const time = document.getElementById('appointment-time').value;

        const doctorName = getDoctorNameById(doctor); // Fetch the actual name of the doctor

        const appointmentKey = `${doctor}-${time}`;
        const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || {};

        if (existingAppointments[appointmentKey]) {
            alert('This time slot with the doctor is already booked.');
        } else {
            existingAppointments[appointmentKey] = {
                user: currentUser,
                doctor: doctorName, // Store the doctor's name instead of ID
                time: time
            };
            localStorage.setItem('appointments', JSON.stringify(existingAppointments));
            alert(`Appointment booked with ${doctorName} at ${time}`);
            displayAppointments();
        }
    });

    logoutButton.addEventListener('click', function () {
        appointmentSection.style.display = 'none';
        loginSection.style.display = 'block';
        currentUser = null;
    });

    function displayAppointments() {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        appointmentsList.innerHTML = '';
        for (const key in appointments) {
            if (appointments[key].user === currentUser) {
                const li = document.createElement('li');
                li.textContent = `Doctor: ${appointments[key].doctor}, Time: ${appointments[key].time} `;

                // Add cancel button
                const cancelButton = document.createElement('button');
                cancelButton.textContent = 'Cancel';
                cancelButton.style.marginLeft = '10px';
                cancelButton.addEventListener('click', function () {
                    cancelAppointment(key);
                });

                li.appendChild(cancelButton);
                appointmentsList.appendChild(li);
            }
        }
    }

    // Helper function to get the doctor name by ID
    function getDoctorNameById(doctorId) {
        const doctorNames = {
            "doctor1": "Dr. John Smith",
            "doctor2": "Dr. Sarah Connor"
        };
        return doctorNames[doctorId] || "Unknown Doctor";
    }

    // Function to cancel an appointment
    function cancelAppointment(appointmentKey) {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        delete appointments[appointmentKey]; // Remove the appointment
        localStorage.setItem('appointments', JSON.stringify(appointments)); // Update local storage
        alert('Appointment canceled.');
        displayAppointments(); // Refresh the list
    }
});
