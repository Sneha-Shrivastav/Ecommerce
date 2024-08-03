document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in to view your orders.');
        window.location.href = 'login.html'; 
        return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId;

    const fetchOrders = async () => {
        try {
            const response = await fetch(`/api/orders/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            displayOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const displayOrders = (orders) => {
        const ordersDiv = document.getElementById('orders');
        if (Array.isArray(orders) && orders.length > 0) {
            orders.forEach(order => {
                const orderDiv = document.createElement('div');
                orderDiv.className = 'order';
                orderDiv.innerHTML = `
                    <h2>Order ID: ${order.id}</h2>
                    <p>Total Price: $${order.totalPrice}</p>
                    <p>Total Items: ${order.totalItems}</p>
                    <p>Status: ${order.status}</p>
                    <div>
                        ${order.orderItems.map(item => `
                            <div>
                                <p>Product ID: ${item.productId}</p>
                                <p>Quantity: ${item.quantity}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
                ordersDiv.appendChild(orderDiv);
            });
        } else {
            ordersDiv.innerHTML = '<p>No orders found.</p>';
        }
    };

    fetchOrders();
});
