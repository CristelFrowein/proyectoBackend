const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();


const PORT = 8080;


app.use(bodyParser.json());

const productsFile = path.join(__dirname, 'products.json');
const cartsFile = path.join(__dirname, 'cart.json');


function readProducts() {
    if (!fs.existsSync(productsFile)) {
        return [];
    }
    const data = fs.readFileSync(productsFile, 'utf-8');
    return JSON.parse(data);
}


function writeProducts(products) {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}


function readCarts() {
    if (!fs.existsSync(cartsFile)) {
        return [];
    }
    const data = fs.readFileSync(cartsFile, 'utf-8');
    return JSON.parse(data);
}


function writeCarts(carts) {
    fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
}



app.get('/api/products', (req, res) => {
    const products = readProducts();
    const limit = parseInt(req.query.limit) || products.length;
    res.json(products.slice(0, limit)); 
});

app.get('/api/products/:pid', (req, res) => {
    const { pid } = req.params;
    const products = readProducts();
    const product = products.find(p => p.id === pid);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

app.post('/api/products', (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
    const products = readProducts();

   
    const id = Date.now().toString();

    const newProduct = { id, title, description, code, price, status, stock, category, thumbnails };
    products.push(newProduct);

    writeProducts(products);

    res.status(201).json(newProduct);
});

app.put('/api/products/:pid', (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const products = readProducts();

    const product = products.find(p => p.id === pid);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

   
    if (title) product.title = title;
    if (description) product.description = description;
    if (code) product.code = code;
    if (price) product.price = price;
    if (status !== undefined) product.status = status;
    if (stock) product.stock = stock;
    if (category) product.category = category;
    if (thumbnails) product.thumbnails = thumbnails;

    writeProducts(products);

    res.json(product);
});

app.delete('/api/products/:pid', (req, res) => {
    const { pid } = req.params;
    const products = readProducts();
    const productIndex = products.findIndex(p => p.id === pid);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    products.splice(productIndex, 1);

    writeProducts(products);

    res.status(204).end();
});



app.post('/api/carts', (req, res) => {
    const carts = readCarts();
    const id = Date.now().toString();  
    const newCart = { id, products: [] };
    carts.push(newCart);

    writeCarts(carts);

    res.status(201).json(newCart);
});

app.get('/api/carts/:cid', (req, res) => {
    const { cid } = req.params;
    const carts = readCarts();
    const cart = carts.find(c => c.id === cid);
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart.products);  
});

app.post('/api/carts/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;  

    const carts = readCarts();
    const cart = carts.find(c => c.id === cid);
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    const products = readProducts();
    const product = products.find(p => p.id === pid);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const cartProduct = cart.products.find(p => p.product === pid);
    if (cartProduct) {
       
        cartProduct.quantity += quantity;
    } else {
       
        cart.products.push({ product: pid, quantity });
    }

    writeCarts(carts);

    res.status(200).json(cart.products); 
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
