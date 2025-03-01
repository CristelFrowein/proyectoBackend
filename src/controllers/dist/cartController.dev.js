"use strict";

var express = require('express');

var router = express.Router();

var cartManager = require('../managers/cartManager');

var removeProductFromCart = function removeProductFromCart(req, res) {
  var _req$params, cid, pid, cart;

  return regeneratorRuntime.async(function removeProductFromCart$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$params = req.params, cid = _req$params.cid, pid = _req$params.pid;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(cartManager.removeProductFromCart(cid, pid));

        case 4:
          cart = _context.sent;
          res.json({
            status: 'success',
            payload: cart
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            status: 'error',
            message: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

var updateCart = function updateCart(req, res) {
  var cid, products, cart;
  return regeneratorRuntime.async(function updateCart$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          cid = req.params.cid;
          products = req.body.products;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(cartManager.updateCart(cid, products));

        case 5:
          cart = _context2.sent;
          res.json({
            status: 'success',
            payload: cart
          });
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](2);
          res.status(500).json({
            status: 'error',
            message: _context2.t0.message
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

var addProductToCart = function addProductToCart(req, res) {
  var _req$params2, cid, pid, quantity, cart;

  return regeneratorRuntime.async(function addProductToCart$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$params2 = req.params, cid = _req$params2.cid, pid = _req$params2.pid;
          quantity = req.body.quantity;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(cartManager.addProductToCart(cid, pid, quantity));

        case 5:
          cart = _context3.sent;
          res.json({
            status: 'success',
            payload: cart
          });
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](2);
          res.status(500).json({
            status: 'error',
            message: _context3.t0.message
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

var clearCart = function clearCart(req, res) {
  var cid, cart;
  return regeneratorRuntime.async(function clearCart$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          cid = req.params.cid;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(cartManager.clearCart(cid));

        case 4:
          cart = _context4.sent;
          res.json({
            status: 'success',
            payload: cart
          });
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          res.status(500).json({
            status: 'error',
            message: _context4.t0.message
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

var getCartById = function getCartById(req, res) {
  var cid, cart;
  return regeneratorRuntime.async(function getCartById$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          cid = req.params.cid;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(cartManager.getCartById(cid));

        case 4:
          cart = _context5.sent;
          res.json({
            status: 'success',
            payload: cart
          });
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          res.status(500).json({
            status: 'error',
            message: _context5.t0.message
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

var createCart = function createCart(req, res) {
  var newCart;
  return regeneratorRuntime.async(function createCart$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(cartManager.createCart());

        case 3:
          newCart = _context6.sent;
          res.status(201).json({
            status: 'success',
            payload: newCart
          });
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            status: 'error',
            message: _context6.t0.message
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

router.get('/cart', function _callee(req, res) {
  var cid, cart;
  return regeneratorRuntime.async(function _callee$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          cid = req.query.cid;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(cartManager.getCartById(cid));

        case 4:
          cart = _context7.sent;
          res.render('cart', {
            cart: cart
          });
          _context7.next = 11;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          res.status(500).json({
            status: 'error',
            message: _context7.t0.message
          });

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router["delete"]('/:cid/products/:pid', removeProductFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', addProductToCart);
router["delete"]('/:cid', clearCart);
router.get('/:cid', getCartById);
router.post('/', createCart);
module.exports = router;