document.addEventListener('DOMContentLoaded', function() {
    const productButtons = document.querySelectorAll('.product button');
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total');
    const payNowButton = document.querySelector('.pay-now');
    let cart = [];

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            cartItems.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>Rp ${item.price}</td>
                    <td>${item.quantity}x</td>
                    <td>Rp ${subtotal}</td>
                    <td><button class="remove-button" data-index="${index}">Remove</button></td>
                </tr>
            `;
        });
        totalAmount.textContent = total;
    }

    productButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const product = e.target.dataset.product;
            const price = parseInt(e.target.dataset.price, 10);
            const existingProduct = cart.find(item => item.name === product);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name: product, price: price, quantity: 1 });
            }
            updateCart();
        });
    });

    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-button')) {
            const index = parseInt(e.target.dataset.index, 10);
            cart.splice(index, 1);
            updateCart();
        }
    });

    payNowButton.addEventListener('click', () => {
        alert('Pembayaran Sukses Cuyyy');
        cart = [];
        updateCart();
    });

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            const productName = product.querySelector('h2').textContent.toLowerCase();
            if (productName.includes(query)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    let counter = 1;
    setInterval(function(){
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if(counter > 3){
            counter = 1;
        }
    }, 5000);
});
