import { Router } from "express";
import path from 'node:path';
import { __dirname } from "../utils.js";
import CartManager from '../managers/cart.manager.js'
import ProductManager from '../managers/product.manager.js'

const router = Router();

const cartsFilePath = path.join(__dirname, "./files/carts.json");
const cartManager = new CartManager(cartsFilePath);

const productsFilePath = path.join(__dirname, "./files/products.json");
const productManager = new ProductManager(productsFilePath);

router.post('/', async (req, res) => {
    await cartManager.addCart();
    res.send({ status: 'success'});
});

router.get('/:cid', async (req, res) => {
    try {
        const id = Number(req.params.cid);
        const products = await cartManager.getCartById(id);
        res.send({ status: 'success', payload: products.products });
    }
    catch(error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const idCart = Number(req.params.cid);
        const idProduct = Number(req.params.pid);

        // Verifica si el producto existe
        const product = await productManager.getProductById(idProduct);

        await cartManager.updateCart(idCart, idProduct);
        res.status(200).send({ status: 'success' })
    }
    catch(error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const idCart = Number(req.params.cid);
        const idProduct = Number(req.params.pid);

        // Verifica si el producto existe
        const cart = await cartManager.getCartById(idCart);
        const productInCart = cart.products.find(product => product.id === idProduct);

        if (!productInCart) {
            throw new Error(`The product with ID = ${idProduct} does not exist in the cart.`);
        }

        await cartManager.removeProductFromCart(idCart, idProduct);
        res.status(200).send({ status: 'success' })
    }
    catch(error) {
        res.status(400).send({ error: error.message });
    }
});


export default router;