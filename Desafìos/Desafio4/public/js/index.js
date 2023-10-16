const socket = io();

const container = document.getElementById('products-container');

const form1 = document.getElementById('formulario1');
const form2 = document.getElementById('formulario2');

socket.on('showProducts', data => {
    container.innerHTML = ``;
    
    data.forEach(prod => {
        container.innerHTML += `
            <ul class="product">
                <li><span>title:</span> ${prod.title}</li>
                <li><span>description:</span> ${prod.description}</li>
                <li><span>code:</span> ${prod.code}</li>
                <li><span>price:</span> ${prod.price}</li>
                <li><span>status:</span> ${prod.status}</li>
                <li><span>stock:</span> ${prod.stock}</li>
                <li><span>category:</span> ${prod.category}</li>
                <li><span>id:</span> ${prod.id}</li>
            </ul>
        `
    });
});

form1.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: parseFloat(document.getElementById('price').value),
        status: document.getElementById('status').checked, // Aquí capturamos el valor booleano
        stock: parseInt(document.getElementById('stock').value, 10),
        category: document.getElementById('category').value
    };

    socket.emit('addProduct', newProduct);
});


form2.addEventListener('submit', (e) => {
    e.preventDefault();
    // Recoge el valor del campo de entrada "removeproduct"
    const productIdToRemove  = document.getElementById('removeproduct').value;
    // Emite el ID del producto a eliminar al servidor usando socket.io
    socket.emit('removeproduct',  productIdToRemove  );
});