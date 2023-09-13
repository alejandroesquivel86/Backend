const {ProductManager} = require ('./managers/ProductManager')

const product = new ProductManager('./files/Productos.json');

const env = async () => {
    const productos = await product.getProducts();
    console.log(productos)

    const producto = {
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price:200,
        thumbnail:'Sin imagen',
        code:'abc123',
        stock:25
    };

    await product.addProduct(producto);
    const productoscargados = await product.getProducts();
    console.log(productoscargados);
}

env();