import fs from 'fs';

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    getCart = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const cart = JSON.parse(data);
                return cart;
            }
            else {
                return [];
            }
        }   catch (error) {
            console.error("Error getting the cart:", error);
            throw error;
            }
    }

    addCart = async () => {
        try {
            const allCarts = await this.getCart();
            let cart = {}
            cart.id = allCarts.length === 0 ? 1 : allCarts[allCarts.length - 1].id + 1;
            cart.products = [];
                        
            allCarts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, '\t'));
            return cart;

        } catch (error) {
            console.error("Error adding to the cart:", error);
            throw error;
        }
    }

    getCartById = async (id) => {
        try {
            const allCarts = await this.getCart();
            const cartById = allCarts.find(p => p.id === id);

            if (!cartById) {
                throw new Error(`There is no cart with the ID = ${id} entered`);
            }
            return cartById;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    updateCart = async (idCart, idProduct) => {
        try {
            const allCarts = await this.getCart();
            const cartIndex = allCarts.findIndex(p => p.id === idCart);

            if (cartIndex !== -1) {
                const productIndex = allCarts[cartIndex].products.findIndex(product => product.id === idProduct);

                if (productIndex !== -1) {
                    allCarts[cartIndex].products[productIndex].quantity++;
                } else {
                    allCarts[cartIndex].products.push({ id: idProduct, quantity: 1 });
                }

                await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, '\t'));
            } else { 
                throw new Error("The cart you are trying to update does not exist.");
            }

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    removeProductFromCart = async (idCart, idProduct) => {
        try {
            const allCarts = await this.getCart();
            const cartIndex = allCarts.findIndex(p => p.id === idCart);
    
            if (cartIndex !== -1) {
                const productIndex = allCarts[cartIndex].products.findIndex(product => product.id === idProduct);
    
                if (productIndex !== -1) {
                    allCarts[cartIndex].products.splice(productIndex, 1);
                    await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, '\t'));
                } else {
                    throw new Error("The product you are trying to remove does not exist in the cart.");
                }
            } else { 
                throw new Error("The cart you are trying to update does not exist.");
            }
    
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}