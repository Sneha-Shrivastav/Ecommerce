document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const homeLink = document.getElementById('home-link');
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    const adminPanelLink = document.getElementById('admin-panel-link');
    
   
    homeLink.addEventListener('click', () => loadPage('home'));
    signupLink.addEventListener('click', () => loadPage('signup'));
    loginLink.addEventListener('click', () => loadPage('login'));
    logoutLink.addEventListener('click', () => handleLogout());
    adminPanelLink.addEventListener('click', () => loadPage('admin'));

    
    function loadPage(page) {
        fetch(`/page/${page}`)
            .then(response => response.text())
            .then(html => {
                mainContent.innerHTML = html;
                updateNavActiveLink(page);
            })
            .catch(error => showAlert('Error loading page'));
    }

    function updateNavActiveLink(page) {
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.toggle('active', link.id === `${page}-link`);
        });
    }

    function handleLogout() {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.removeItem('token');
                loadPage('home');
            } else {
                showAlert('Error logging out');
            }
        })
        .catch(() => showAlert('Error logging out'));
    }

    function showAlert(message) {
        alert(message);
    }
});
