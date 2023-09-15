// Select elements from the HTML document
const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const totalCartPrice = document.getElementById('total-price');
const placeOrderButton = document.getElementById('place-order');
const plusButtons = document.querySelectorAll('.plus-btn');
const minusButtons = document.querySelectorAll('.minus-btn');
const productNames = document.querySelectorAll('.product-card h2');

// Initialize variables to manage the cart
let cartItems = [];
let totalQuantity = 0;
let totalPrice = 0;

// Event listeners for increasing product quantity
plusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const quantityInput = document.getElementById(`quantity${index + 1}`);
        let quantity = parseInt(quantityInput.value);
        if (quantity < 8) {
            quantity++;
            quantityInput.value = quantity;
        } else {
            alert('Maximum quantity reached.');
        }
    });
});

// Event listeners for decreasing product quantity
minusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const quantityInput = document.getElementById(`quantity${index + 1}`);
        let quantity = parseInt(quantityInput.value);
        if (quantity > 0) {
            quantity--;
            quantityInput.value = quantity;
        } else {
            alert('Minimum quantity reached.');
        }
    });
});

// Event listeners for adding products to the cart
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const quantityInput = document.getElementById(`quantity${index + 1}`);
        let quantity = parseInt(quantityInput.value);
        const price = parseInt(button.getAttribute('data-price'));
        const productName = productNames[index].innerText; // Get the product name

        // Find existing cart item or create a new one
        const existingCartItem = cartItems.find(item => item.index === index);

        if (quantity > 0) {
            if (existingCartItem) {
                // If the item already exists in the cart, update its quantity
                const prevQuantity = existingCartItem.quantity;
                const newQuantity = prevQuantity + quantity;

                if (newQuantity <= 8) {
                    // Check if the total quantity in the cart doesn't exceed 8
                    existingCartItem.quantity = newQuantity;
                    totalQuantity += quantity;
                    totalPrice += price * quantity;
                    updateCart();
                    alert(`${productName} (Quantity: ${quantity}) added to cart Successfully.`);
                } else {
                    alert('Total quantity exceeds 8. Please adjust your selection.');
                }
            } else {
                if (totalQuantity + quantity <= 8) {
                    // If it's a new item and won't exceed the maximum cart quantity
                    cartItems.push({ index, quantity, price, productName });
                    totalQuantity += quantity;
                    totalPrice += price * quantity;
                    updateCart();
                    alert(`${productName} (Quantity: ${quantity}) added to cart Successfully.`);
                } else {
                    alert('Total quantity exceeds 8. Please adjust your selection.');
                }
            }
        } else {
            alert('Quantity must be greater than 0 to add to the cart.');
        }

        // Update cart count and reset the quantity input to zero
        cartCount.innerText = totalQuantity;
        quantityInput.value = 0;
    });
});

// Event listener for opening the cart modal
cartButton.addEventListener('click', () => {
    updateCart();
    cartModal.style.display = 'block';
});

// Event listener for placing an order
placeOrderButton.addEventListener('click', () => {
    if (totalPrice === 0) {
        alert('Your cart is empty. Please add products before placing an order.');
        return;
    }

    alert('Thank you for your order!');
    cartModal.style.display = 'none';

    // Reset cart and quantity input fields to zero
    cartItems = [];
    totalQuantity = 0;
    totalPrice = 0;
    cartCount.innerText = '0';
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    quantityInputs.forEach(input => {
        input.value = 0;
    });
});

// Function to update the cart displayed in the modal
function updateCart() {
    cartItemsList.innerHTML = '';
    cartItems.forEach((item, index) => {
        const product = document.createElement('li');
        product.innerHTML = `Item ${index + 1}: ${item.productName} (Quantity: ${item.quantity}) x Rs. ${item.price} /- = Rs. ${item.quantity * item.price} /-`;

        // Create a delete button for each item
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-btn'); // Add the class name 'delete-btn' to the delete button
        deleteButton.addEventListener('click', () => {
            // Remove the item from the cart and update totals
            totalQuantity -= item.quantity;
            totalPrice -= item.quantity * item.price;
            cartCount.innerText = totalQuantity;
            cartItems.splice(index, 1);
            updateCart();
        });


        product.appendChild(deleteButton);

        cartItemsList.appendChild(product);
    });
    totalCartPrice.innerText = totalPrice;
}

// Close the cart modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});
