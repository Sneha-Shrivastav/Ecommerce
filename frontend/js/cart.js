document.addEventListener('DOMContentLoaded', async () => {
    await fetchCart();
    document.getElementById('checkout').addEventListener('click', checkout);
});


const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return null;
    }
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.userId;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

const fetchCart = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
        console.error('User ID not found');
        return;
    }
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`/api/cart/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const cart = await response.json();
        displayCart(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
    }
};

const displayCart = (cart) => {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; 
    if (cart.cartItems.length > 0) {
        cart.cartItems.forEach(cartItem => {
            const price = cartItem.Product?.price || 0; 
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <p>Product ID: ${cartItem.productId}</p>
                <p>Quantity: ${cartItem.quantity}</p>
                <p>Price: $${cartItem.quantity * price}</p>
                <button onclick="removeFromCart(${cartItem.id})">Remove</button>
            `;
            cartDiv.appendChild(cartItemDiv);
        });
    } else {
        cartDiv.innerHTML = '<p>Your cart is empty.</p>';
    }
};


const removeFromCart = async (cartItemId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`api/cart/remove/${cartItemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (response.ok) {
            alert('Item removed from cart!');
            fetchCart(); 
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
};


const checkout = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
        alert('Unable to checkout. Please login again.');
        return;
    }
    const token = localStorage.getItem('token');
    try {
        const token = localStorage.getItem('token');
        if (!token) {
        console.error('No token found');
        return;
    }

        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.userId;

        const response = await fetch(`/api/cart/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const cart = await response.json();
        const items = cart.cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));

        const orderResponse = await fetch(`/api/orders/${userId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                items
            })
        });

        const result = await orderResponse.json();
        if (orderResponse.ok) {
            alert('Order placed successfully!');
            window.location.href = 'user_home.html'; 
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error during checkout:', error);
    }
};
