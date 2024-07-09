let productos = [
    {name: "Iphone 13", id: 1},
    {name: "Iphone 14", id: 2},
    {name: "Iphone 15", id: 3},
    {name: "Fundas", id: 4},
    {name: "Lighting", id: 5},
    {name: "Cargador", id: 6},
    {name: "AirPods Pro 2", id: 7},
    {name: "AirPods Pro", id: 8},
    {name: "AirPods 3", id: 9}
];

let precios = {
    1: "$500",
    2: "$700",
    3: "$900",
    4: "$5",
    5: "$10",
    6: "$15",
    7: "$330",
    8: "$50",
    9: "$170",
};

function pedirNombre(){
    let nombre = prompt ("Por favor, ingresa tu nombre:");
    alert("Hola " + nombre + ", bienvenido a Irenoved");
}

function pedirEmail(){
    const email = prompt("Por favor, ingrese su correo electrónico:", "");
if (email) {
    confirm(`El correo electrónico ingresado es: ${email}"`);
} else {
    alert("No se ingresó ningún correo electrónico.");
}
}

function adicionarIVA(precio) {
    return precio * 1.16;
}

function seguirEnvioCorreo(){
    alert ("¡Gracias por tu compra! Puedes seguir tu pedido a través del enlace que te enviamos por correo electrónico.")
}

function seleccionarProductos() {
    let productoSeleccionado;
    let continuar = true;

    while (continuar) {
    let elegirProductos = prompt(
        "Elija el producto que quiere comprar\n" +
        productos.map((producto, index) => `${index + 1}: ${producto.name}`).join("\n")); productoSeleccionado = Number(elegirProductos);
    if (productoSeleccionado > 0 && productoSeleccionado <= productos.length) {
        let productoElegido = productos.find((producto) => producto.id === productoSeleccionado);
        let precio = precios[productoElegido.id];
        let precioConIVA = adicionarIVA(precio.replace("$", ""));
        confirm(`Has elegido ${productoElegido.name}, con un valor de ${precioConIVA} con IVA incluido ¿desea completar la compra?`);
        seguirEnvioCorreo();
        continuar = false;
    } else {
        alert("Opción no válida. Por favor, elige entre 1 y " + productos.length);
    }
    }
}

pedirNombre();
pedirEmail();
seleccionarProductos();
completarCompra();