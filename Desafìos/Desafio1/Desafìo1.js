class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {        
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Todos los campos son obligatorios');
            return; 
        }

        if (this.products.some(p => p.code === code)) {
            console.log('No se puede repetir el campo código');
            return; 
        }

        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }
        
        const product = {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        };

        this.products.push(product);
    }

    getProducts = () => {
        return this.products;   
    }

    getProductById = (id) => {
        const foundProduct = this.products.find(product => product.id === id);
    
        if (foundProduct) {
            return foundProduct;
        } else {
            console.log('Not found');
            return null;
        }
    }
}
