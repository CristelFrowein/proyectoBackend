"use strict";

var mongoose = require('mongoose');

var Cart = require('./models/Cart');

var Product = require('./models/Product');

function getAllCarts() {
  return regeneratorRuntime.async(function getAllCarts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Cart.find().populate('products.productId'));

        case 3:
          return _context.abrupt("return", _context.sent);

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          throw new Error('Error fetching carts: ' + _context.t0.message);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

function getCartById(cid) {
  return regeneratorRuntime.async(function getCartById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Cart.findById(cid).populate('products.productId'));

        case 3:
          return _context2.abrupt("return", _context2.sent);

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          throw new Error('Error fetching cart by ID: ' + _context2.t0.message);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

function createCart() {
  var newCart;
  return regeneratorRuntime.async(function createCart$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          newCart = new Cart({
            products: []
          });
          _context3.next = 4;
          return regeneratorRuntime.awrap(newCart.save());

        case 4:
          return _context3.abrupt("return", newCart);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          throw new Error('Error creating cart: ' + _context3.t0.message);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function addProductToCart(cid, pid, quantity) {
  var cart, product, existingProduct;
  return regeneratorRuntime.async(function addProductToCart$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Cart.findById(cid));

        case 3:
          cart = _context4.sent;

          if (cart) {
            _context4.next = 6;
            break;
          }

          throw new Error('Cart not found');

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(Product.findById(pid));

        case 8:
          product = _context4.sent;

          if (product) {
            _context4.next = 11;
            break;
          }

          throw new Error('Product not found');

        case 11:
          existingProduct = cart.products.find(function (p) {
            return p.productId.toString() === pid;
          });

          if (existingProduct) {
            existingProduct.quantity += quantity;
          } else {
            cart.products.push({
              productId: pid,
              quantity: quantity
            });
          }

          _context4.next = 15;
          return regeneratorRuntime.awrap(cart.save());

        case 15:
          return _context4.abrupt("return", cart);

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](0);
          throw new Error('Error adding product to cart: ' + _context4.t0.message);

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function removeProductFromCart(cid, pid) {
  var cart;
  return regeneratorRuntime.async(function removeProductFromCart$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Cart.findById(cid));

        case 3:
          cart = _context5.sent;

          if (cart) {
            _context5.next = 6;
            break;
          }

          throw new Error('Cart not found');

        case 6:
          cart.products = cart.products.filter(function (product) {
            return product.productId.toString() !== pid;
          });
          _context5.next = 9;
          return regeneratorRuntime.awrap(cart.save());

        case 9:
          return _context5.abrupt("return", cart);

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          throw new Error('Error removing product from cart: ' + _context5.t0.message);

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

function updateCart(cid, products) {
  var cart, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, product, productInCart;

  return regeneratorRuntime.async(function updateCart$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Cart.findById(cid));

        case 3:
          cart = _context6.sent;

          if (cart) {
            _context6.next = 6;
            break;
          }

          throw new Error('Cart not found');

        case 6:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context6.prev = 9;
          _iterator = products[Symbol.iterator]();

        case 11:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context6.next = 23;
            break;
          }

          product = _step.value;

          if (!(!product.productId || typeof product.quantity !== 'number')) {
            _context6.next = 15;
            break;
          }

          throw new Error('Invalid product format');

        case 15:
          _context6.next = 17;
          return regeneratorRuntime.awrap(Product.findById(product.productId));

        case 17:
          productInCart = _context6.sent;

          if (productInCart) {
            _context6.next = 20;
            break;
          }

          throw new Error('Product not found');

        case 20:
          _iteratorNormalCompletion = true;
          _context6.next = 11;
          break;

        case 23:
          _context6.next = 29;
          break;

        case 25:
          _context6.prev = 25;
          _context6.t0 = _context6["catch"](9);
          _didIteratorError = true;
          _iteratorError = _context6.t0;

        case 29:
          _context6.prev = 29;
          _context6.prev = 30;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 32:
          _context6.prev = 32;

          if (!_didIteratorError) {
            _context6.next = 35;
            break;
          }

          throw _iteratorError;

        case 35:
          return _context6.finish(32);

        case 36:
          return _context6.finish(29);

        case 37:
          cart.products = products;
          _context6.next = 40;
          return regeneratorRuntime.awrap(cart.save());

        case 40:
          return _context6.abrupt("return", cart);

        case 43:
          _context6.prev = 43;
          _context6.t1 = _context6["catch"](0);
          throw new Error('Error updating cart: ' + _context6.t1.message);

        case 46:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 43], [9, 25, 29, 37], [30,, 32, 36]]);
}

function clearCart(cid) {
  var cart;
  return regeneratorRuntime.async(function clearCart$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Cart.findById(cid));

        case 3:
          cart = _context7.sent;

          if (cart) {
            _context7.next = 6;
            break;
          }

          throw new Error('Cart not found');

        case 6:
          cart.products = [];
          _context7.next = 9;
          return regeneratorRuntime.awrap(cart.save());

        case 9:
          return _context7.abrupt("return", cart);

        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          throw new Error('Error clearing cart: ' + _context7.t0.message);

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

module.exports = {
  getAllCarts: getAllCarts,
  getCartById: getCartById,
  createCart: createCart,
  addProductToCart: addProductToCart,
  removeProductFromCart: removeProductFromCart,
  updateCart: updateCart,
  clearCart: clearCart
};