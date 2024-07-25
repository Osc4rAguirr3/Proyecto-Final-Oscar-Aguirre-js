const products = [
    {
        id: 1,
        name: 'Iphone 11',
        price: '300',
        description: 'Iphone-11',
        image: 'assets/iphone11.png',
    },

    {
        id: 2,
        name: 'Iphone 12',
        price: '400',
        description: 'Iphone-12',
        image: 'assets/iphone12.png',
    },

    {
        id: 3,
        name: 'Iphone 13',
        price: '500',
        description: 'Iphone-13',
        image: 'assets/iphone13.png',
    },

    {
        id: 4,
        name: 'Iphone 14',
        price: '650',
        description: 'Iphone-14',
        image: 'assets/iphone14.png',
    },
]

const cart = JSON.parse(localStorage.getItem('cart')) || [];

const createProducts = () => {
    products.forEach(product => {
        const card = document.createElement('div');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.description}">
            <h3>$${product.price}</h3>
            <h4>${product.name}</h4>
            <button id="${product.id}" class='button'>Agregar al carrito</button>`;

        root.appendChild(card);
    });
    loadEvents();
}

const loadEvents = () => {
    const buttons = document.querySelectorAll('.button');
    for (const button of buttons) {
        button.addEventListener('click', () => {
            const selectedProduct = products.find(product => product.id === Number(button.id))
            if (selectedProduct) {
                alert(`El Producto ${selectedProduct.name} se agrego al carrito`)
                cart.push(selectedProduct)
                localStorage.setItem('cart', JSON.stringify(cart))
                updateCartList()
            }
        });
    }

    const clearCartButton = document.getElementById('clear-cart')
    clearCartButton.addEventListener('click', () => {
        cart.length = 0
        localStorage.setItem('cart', JSON.stringify(cart))
        updateCartList()
    })
}

const updateCartList = () => {
    const cartList = document.getElementById('cart-list')
    cartList.innerHTML = ''
    cart.forEach(product => {
        const cartItem = document.createElement('li')
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.description}">
            <h3>$${product.price}</h3>
            <h4>${product.name}</h4>
            <button class='remove-button'>Eliminar</button>
        `
        cartList.appendChild(cartItem)

        const removeButton = cartItem.querySelector('.remove-button')
        removeButton.addEventListener('click', () => {
            const index = cart.indexOf(product)
            cart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(cart))
            updateCartList()
        })
    })
}

createProducts()
updateCartList()