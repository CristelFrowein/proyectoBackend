"use strict";

var express = require('express');

var _require = require('express-handlebars'),
    engine = _require.engine;

var http = require('http');

var socketIo = require('socket.io');

var productRoutes = require('./routes/productRoutes');

var cartRoutes = require('./routes/cartRoutes');

var _require2 = require('./managers/productManager'),
    addProduct = _require2.addProduct,
    deleteProduct = _require2.deleteProduct,
    getAllProducts = _require2.getAllProducts; // Desestructuración de las funciones necesarias


var app = express();
var server = http.createServer(app);
var io = socketIo(server);
var PORT = 8080;
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use(express["static"]('public'));
io.on('connection', function (socket) {
  console.log('A user connected'); // Enviar la lista inicial de productos a todos los clientes conectados

  socket.emit('productList', getAllProducts(10)); // Escuchar el evento para agregar un producto

  socket.on('addProduct', function (newProduct) {
    var addedProduct = addProduct(newProduct); // Agregar producto

    io.emit('productList', getAllProducts(10)); // Emitir la lista actualizada a todos los clientes
  }); // Escuchar el evento para eliminar un producto

  socket.on('deleteProduct', function (pid) {
    deleteProduct(pid); // Eliminar producto

    io.emit('productList', getAllProducts(10)); // Emitir la lista actualizada a todos los clientes
  });
  socket.on('disconnect', function () {
    console.log('User disconnected');
  });
});
app.get('/', function (req, res) {
  var products = getAllProducts(10);
  res.render('home', {
    products: products
  });
});
app.get('/realtimeproducts', function (req, res) {
  var products = getAllProducts(10);
  res.render('realTimeProducts', {
    products: products
  });
});
server.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});