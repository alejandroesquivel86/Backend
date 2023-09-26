import express from 'express';
import ProductManager from './managers/ProductManager.js';

const app = express();

const product = new ProductManager('./files/Productos.json');
app.use(express.urlencoded({extended:true}));

app.get('/products', async (req, res) => {
    try {
        let limit = Number(req.query.limit); 

        if (isNaN(limit)) {  
            return res.status(400).send({ error: 'El valor de limit no es válido' });
        }

        const products = await product.getProducts(limit); 
        res.send({ products: products });
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener productos' });
    }
});


app.get('/products/:id', async (req, res) => {
    try {
        
         const id = Number(req.params.id); 

        if (isNaN(id)) {  
            return res.status(400).send({ error: 'ID no válido' });
        }

        const foundProduct = await product.getProductById(id);
        
        if (foundProduct) {
            res.send(foundProduct);
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});

app.listen(8081, ()=> console.log('Escuchando 8081'));

