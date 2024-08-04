let API_URL = '';

async function fetchApiUrl() {
    try {
        const response = await fetch('/api/env');
        if (!response.ok) {
            throw new Error('Failed to fetch API configuration');
        }
        const config = await response.json();
        API_URL = config.API_URL; 
    } catch (error) {
        console.error('Error fetching API URL:', error);
    }
}


document.getElementById('add-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        const response = await fetch(`${API_URL}/api/products`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        const result = await response.json();
        showAlert(result.message, response.ok ? 'success' : 'error');
    } catch (error) {
        showAlert('Failed to add product', 'error');
    }
});


document.getElementById('update-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productId = formData.get('id');
    try {
        const response = await fetch(`${API_URL}/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        const result = await response.json();
        showAlert(result.message, response.ok ? 'success' : 'error');
    } catch (error) {
        showAlert('Failed to update product', 'error');
    }
});


document.getElementById('delete-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productId = formData.get('id');
    try {
        const response = await fetch(`${API_URL}/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const result = await response.json();
        showAlert(result.message, response.ok ? 'success' : 'error');
    } catch (error) {
        showAlert('Failed to delete product', 'error');
    }
});


document.getElementById('get-all-orders-button').addEventListener('click', async () => {
    try {
        
        const authToken = 'yourAuthToken'; 

        window.location.href = 'orders.html';
        
        const response = await fetch('http://localhost:3000/api/orders', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Orders data:', data);

        if (!data.orders || !Array.isArray(data.orders)) {
            throw new Error('Invalid orders data format');
        }

        displayOrders(data.orders);
    } catch (error) {
        console.error('Error loading orders:', error);
        showMessage('Failed to load orders', 'error');
    }
});



function displayOrders(orders) {
    const ordersList = document.getElementById('orders-list');
    if (!ordersList) {
        console.error('Orders list element not found');
        return;
    }

    if (!Array.isArray(orders)) {
        console.error('Expected orders to be an array');
        return;
    }

    ordersList.innerHTML = orders.map(order => `
        <div class="order">
            <p>Order ID: ${order.id}</p>
            <p>User ID: ${order.userId}</p>
            <p>Total Price: $${order.totalPrice}</p>
            <p>Total Items: ${order.totalItems}</p>
            <p>Total Quantity: ${order.totalQuantity}</p>
            <p>Status: ${order.status}</p>
            <p>Cancellable: ${order.cancellable ? 'Yes' : 'No'}</p>
        </div>
    `).join('');
}



document.getElementById('update-order-status-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const orderId = formData.get('id');
    const status = formData.get('status');
    try {
        const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        const result = await response.json();
        showAlert(result.message, response.ok ? 'success' : 'error');
    } catch (error) {
        showAlert('Failed to update order status', 'error');
    }
});

document.getElementById('logout').addEventListener('click', () => {
    
    localStorage.removeItem('token');

    window.location.href = 'login.html'; 
});


function showMessage(message, type) {
    const messageElement = document.getElementById('message');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.display = 'block';
        messageElement.className = `alert ${type === 'success' ? 'success' : 'error'}`;
    }
}
