document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessageDiv = document.getElementById('error-message');

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            errorMessageDiv.innerText = errorData.message;
            return;
        }

        const data = await response.json();
        const token = data.token;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;

        localStorage.setItem('token', token);

        if (role === 'superadmin') {
            window.location.href = 'admin_home.html';
        } else {
            window.location.href = 'user_home.html';
        }
    } catch (error) {
        console.error('Error during login:', error);
        errorMessageDiv.innerText = 'An error occurred. Please try again.';
    }
});
