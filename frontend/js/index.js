const API_URL = 'http://localhost:3000';

document.getElementById('homeButton').addEventListener('click', () => {
    document.getElementById('homeContent').style.display = 'block';
    document.getElementById('signupFormContainer').style.display = 'none';
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('products').style.display = 'block';
    loadProducts();
});

document.getElementById('signupButton').addEventListener('click', () => {
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('signupFormContainer').style.display = 'block';
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('products').style.display = 'none';
});

document.getElementById('loginButton').addEventListener('click', () => {
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('signupFormContainer').style.display = 'none';
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('products').style.display = 'none';
});

document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.profileImage) {
        console.error('Profile image is required.');
        alert('Profile image is required.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            alert('Signup successful!');
            window.location.href = 'login.html';
        } else {
            alert(result.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Signup failed:', error);
        alert('Signup failed');
    }
});

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            localStorage.setItem('token', result.token);
            showMessage(result.message, 'success');
            redirectToRoleBasedPage(result.token);
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        showMessage('Login failed', 'error');
    }
});

async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.products || !Array.isArray(data.products)) {
            throw new Error('Invalid products data format');
        }
        displayProducts(data.products);
    } catch (error) {
        console.error('Error loading products:', error);
        showMessage('Failed to load products', 'error');
    }
}

function displayProducts(products) {
    const productsList = document.getElementById('productsList');
    if (!productsList) {
        console.error('Products list element not found');
        return;
    }

    if (!Array.isArray(products)) {
        console.error('Expected products to be an array');
        return;
    }

    productsList.innerHTML = products.map(product => {
        const price = parseFloat(product.price);
        return `
            <div class="product">
                <img src="${product.productImage}" alt="${product.title}" class="product-image">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>Price: $${price.toFixed(2)}</p>
                <button onclick="addToCart('${product.id}')">Add to Cart</button>
            </div>
        `;
    }).join('');
}

async function addToCart(productId) {
    try {
        const response = await fetch(`${API_URL}/api/cart/add`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        if (!response.ok) {
            throw new Error('Failed to add product to cart');
        }
        const result = await response.json();
        showMessage(result.message, 'success');
    } catch (error) {
        console.error('Error adding to cart:', error);
        showMessage('Failed to add product to cart', 'error');
    }
}

function showMessage(message, type) {
    const messageElement = document.getElementById('message');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.display = 'block';
        messageElement.className = `alert ${type === 'success' ? 'success' : 'error'}`;
    }
}

function redirectToRoleBasedPage(token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role;

    if (role === 'superadmin') {
        window.location.href = 'admin_home.html';
    } else {
        window.location.href = 'user_home.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userEmail = payload.email;
        if (userEmail) {
            const greetingElement = document.getElementById('greeting');
            if (greetingElement) {
                greetingElement.innerText = `Hello ${userEmail}!`;
            }
        }
    }
});
