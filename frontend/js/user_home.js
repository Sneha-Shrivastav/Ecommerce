let token = `Bearer ${localStorage.getItem('token')}`
const payload = JSON.parse(atob(token.split('.')[1]));
const userId = payload.userId;
const userEmail = payload.email;

const init = async () => {
    displayGreeting();
    await fetchProducts();
};



const displayGreeting = () => {
    const greetingElement = document.getElementById('greeting');
    if (greetingElement && userEmail) {
        greetingElement.innerText = `Hello ${userEmail}!`;
    } else {
        console.error('Greeting element not found or email is missing.');
    }
};

const fetchProducts = async () => {
    try {
        const response = await fetch('api/products', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        displayProducts(data.products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const displayProducts = (products) => {
    const productsDiv = document.getElementById('products');
    
    if (Array.isArray(products)) {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <img src="${product.productImage}" alt="${product.title}" style="width: 100px;">
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productsDiv.appendChild(productDiv);
        });
    } else {
        productsDiv.innerHTML = '<p>No products found.</p>';
    }
};

fetchProducts();

const addToCart = async (productId) => {
    const userId = payload.userId;
    if (!userId) {
        alert('Unable to add to cart. Please login again.');
        return;
    }
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('api/cart/add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                productId,
                quantity: 1
            })
        });
        const result = await response.json();
        if (response.ok) {
            alert('Product added to cart!');
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};

document.getElementById('logout').addEventListener('click', () => {
    
    localStorage.removeItem('token');

    window.location.href = 'login.html'; 
});


init();