const fs = require('fs');

class ProductManager{
    constructor(path) {
        this.path = path;
    }

    addProduct = async (product) => {
        try{
            const products = await this.getProducts();

            const {
                title, 
                description, 
                price, 
                thumbnail, 
                code, 
                stock
            } = product;
            
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log('Todos los campos son obligatorios');
                return; 
            }
    
            if (products.some(p => p.code === code)) {
                console.log('No se puede repetir el campo código');
                return; 
            }
    
            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = this.products[this.products.length - 1].id + 1;
            }          
   
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return product;

        } catch (error) {
            console.log(error);
        }
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data)
                return products;

            } else {
                return [];
            }

        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) => {
        try{
            const products = await this.getProducts();
            const foundProduct = products.find(product => product.id === id);
        
            if (foundProduct) {
                return foundProduct;
            } else {
                console.log('Not found');
                return null;
            }
        } catch (error){
            console.log(error);
        }
    }

    updateProduct = async (id, updatedProduct) => {
        try {
            const products = await this.getProducts();            
            const updatedProducts = products.map(product => {
                if (product.id === id) {
                    return {
                        ...product, 
                        ...updatedProduct, 
                        id
                    };
                }
                return product;
            });

            await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, '\t'));
            return updatedProducts.find(product => product.id === id);

        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) => {
        try {
            const products = await this.getProducts();
            
            const filteredProducts = products.filter(product => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null, '\t'));

            if (filteredProducts.length < products.length) {
                return products.find(product => product.id === id);
            }
  
            console.log('Not found');

            return null;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    ProductManager
}