const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { addProduct, deleteProduct, getAllProducts } = require('./managers/productManager');  // Desestructuración de las funciones necesarias
const app = express();
const server = http.createServer(app);  
const io = socketIo(server);  

const PORT = 8080;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Enviar la lista inicial de productos a todos los clientes conectados
    socket.emit('productList', getAllProducts(10));

    // Escuchar el evento para agregar un producto
    socket.on('addProduct', (newProduct) => {
        const addedProduct = addProduct(newProduct);  // Agregar producto
        io.emit('productList', getAllProducts(10));  // Emitir la lista actualizada a todos los clientes
    });

    // Escuchar el evento para eliminar un producto
    socket.on('deleteProduct', (pid) => {
        deleteProduct(pid);  // Eliminar producto
        io.emit('productList', getAllProducts(10));  // Emitir la lista actualizada a todos los clientes
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get('/', (req, res) => {
    const products = getAllProducts(10); 
    res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
    const products = getAllProducts(10); 
    res.render('realTimeProducts', { products });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
