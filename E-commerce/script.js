// Mock Product Data
const products = [
    { name: 'Smartphone', price: 15000, img: 'smartphone.jpg', category: 'electric' },
    { name: 'Headphones', price: 2000, img: 'headphone.jpg', category: 'electric' },
    { name: 'T-shirt', price: 500, img: 'tshirt.jpg', category: 'fashion' },
    { name: 'Mixer Grinder', price: 2499, img: 'mixer.jpg', category: 'home-appliances' },
    { name: 'Shirt', price: 700, img: 'shirt2.jpg', category: 'fashion' },
    { name: 'Laptop', price: 40000, img: 'laptop2.jpg', category: 'electric' },
    { name: 'Earbuds', price: 1299, img: 'earbuds.jpg', category: 'electric' },
    { name: 'Dress', price: 899, img: 'dress2.jpg', category: 'fashion'},
    { name: 'Air Cooler', price: 3999, img: 'cooler.jpg', category: 'home-appliances' },
    { name: 'Micro Oven', price: 3499, img: 'oven1.jpg', category: 'home-appliances' },
    { name: 'Washing Machine', price: 12000, img: 'washing1.jpg', category: 'home-appliances' },
    { name: 'Jacket', price: 899, img: 'jacket.jpg', category: 'fashion'},
];

// Popup Elements
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopupButton = document.getElementById('close-popup');

// Cart Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
}

// Function to display products dynamically
function displayProducts(filteredProducts) {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = ''; // Clear previous products

    filteredProducts.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}</p>
                <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
    

    // Attach event listeners to dynamically created buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            addToCart(filteredProducts[index]);
        });
    });
}

// Add product to cart and show popup
function addToCart(product) {
    console.log("addToCart triggered for:", product.name);
    cart.push(product);
    updateCartCount(); // Update cart count in header
    popupMessage.textContent = `${product.name} added to the cart!`; // Set popup message
    popup.style.display = 'block'; // Show popup

    // Hide popup after 1.5 seconds
    setTimeout(() => {
        popup.style.display = 'none';
    }, 1500);
}


// Filter products based on selected category
document.getElementById('category-filter').addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    displayProducts(filteredProducts);
});

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products); // Display all products by default
    updateCartCount(); // Update cart count when the page loads
});

// Close the popup when the user clicks the "Close" button
closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none';
});
