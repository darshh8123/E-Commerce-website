// Load Cart from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById('cart-items');
const checkoutButton = document.getElementById('checkout-button');

// Update Cart Display
function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        checkoutButton.style.display = 'none';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} - ₹${item.price}</p>
                <button class="remove-from-cart" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        checkoutButton.style.display = 'block';
    }
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
    updateCartDisplay();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});

// Get the checkout button and processing message elements
const checkoutBtn = document.getElementById('checkout-btn');
const processingMessage = document.getElementById('processing-message');

// Show processing message on button click
checkoutBtn.addEventListener('click', () => {
    // Show the processing message
    processingMessage.style.display = 'block';

    // Simulate a processing delay (replace with actual checkout logic)
    setTimeout(() => {
        processingMessage.style.display = 'none';  // Hide message after processing
        alert('Order placed!');
    }, 3000); // Simulate a 3-second processing time
});

