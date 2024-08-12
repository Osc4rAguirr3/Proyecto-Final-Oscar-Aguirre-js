let products = [];

const loadProducts = async () => {
    try {
        const response = await fetch('products.json'); 
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        products = await response.json();
        createProducts();
    } catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
    }
}

const cart = JSON.parse(localStorage.getItem('cart')) || [];

const createProducts = () => {
    const root = document.getElementById('root');
    root.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.description}">
            <h3>$${product.price}</h3>
            <h4>${product.name}</h4>
            <p>Stock: ${product.stock}</p>
            <button id="${product.id}" class='button' ${product.stock === 0 ? 'disabled' : ''}>
                ${product.stock === 0 ? 'Sin Stock' : 'Agregar al carrito'}
            </button>`;
        
        root.appendChild(card);
    });
    loadEvents();
}

const loadEvents = () => {
    const buttons = document.querySelectorAll('.button');
    for (const button of buttons) {
        button.addEventListener('click', () => {
            const selectedProduct = products.find(product => product.id === Number(button.id));
            if (selectedProduct && selectedProduct.stock > 0) {
                selectedProduct.stock--;

                Toastify({
                    text: `El Producto ${selectedProduct.name} se agregó al carrito`,
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #243815, #0C3B4C)",
                    stopOnFocus: true,
                }).showToast();

                cart.push(selectedProduct);
                localStorage.setItem('cart', JSON.stringify(cart));
                createProducts();
                updateCartList();
            }
        });
    }

    const clearCartButton = document.getElementById('clear-cart');
    clearCartButton.addEventListener('click', () => {
        cart.length = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartList();
    });
}

const updateCartList = () => {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.description}">
            <h3>$${product.price}</h3>
            <h4>${product.name}</h4>
            <button class='remove-button'>Eliminar</button>
        `;
        cartList.appendChild(cartItem);

        const removeButton = cartItem.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            const index = cart.indexOf(product);
            if (index !== -1) {
                const productInStock = products.find(p => p.id === product.id);
                productInStock.stock++;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                createProducts();
                updateCartList();
            }
        });
    });
}

loadProducts();