"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require('fs');

var path = require('path');

var Product = require('../models/Product');

var productsFile = path.join(__dirname, '../data/products.json');

var getAllProduct = function getAllProduct(_ref) {
  var _ref$limit, limit, _ref$page, page, _ref$sort, sort, _ref$query, query, queryObj, options, products, totalProducts, totalPages, prevPage, nextPage;

  return regeneratorRuntime.async(function getAllProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$page = _ref.page, page = _ref$page === void 0 ? 1 : _ref$page, _ref$sort = _ref.sort, sort = _ref$sort === void 0 ? '' : _ref$sort, _ref$query = _ref.query, query = _ref$query === void 0 ? '' : _ref$query;
          _context.prev = 1;
          queryObj = {};
          options = {
            limit: parseInt(limit),
            skip: (page - 1) * limit,
            sort: {}
          };

          if (query) {
            if (query.category) {
              queryObj.category = query.category;
            }

            if (query.available !== undefined) {
              queryObj.available = query.available === 'true';
            }
          }

          if (sort === 'asc') {
            options.sort.price = 1;
          } else if (sort === 'desc') {
            options.sort.price = -1;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(Product.find(queryObj, null, options));

        case 8:
          products = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Product.countDocuments(queryObj));

        case 11:
          totalProducts = _context.sent;
          totalPages = Math.ceil(totalProducts / limit);
          prevPage = page > 1 ? page - 1 : null;
          nextPage = page < totalPages ? page + 1 : null;
          return _context.abrupt("return", {
            products: products,
            totalPages: totalPages,
            prevPage: prevPage,
            nextPage: nextPage,
            page: page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: prevPage ? "/api/products?page=".concat(prevPage, "&limit=").concat(limit, "&sort=").concat(sort) : null,
            nextLink: nextPage ? "/api/products?page=".concat(nextPage, "&limit=").concat(limit, "&sort=").concat(sort) : null
          });

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          throw new Error(_context.t0.message);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 18]]);
};

function readProducts() {
  if (!fs.existsSync(productsFile)) {
    return [];
  }

  var data = fs.readFileSync(productsFile, 'utf-8');
  return JSON.parse(data);
}

function writeProducts(products) {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}

function getAllProducts(limit) {
  var products = readProducts();
  return products.slice(0, limit);
}

function getProductById(pid) {
  var products = readProducts();
  return products.find(function (p) {
    return p.id === pid;
  });
}

function addProduct(product) {
  var products = readProducts();
  var id = Date.now().toString();

  var newProduct = _objectSpread({
    id: id
  }, product);

  products.push(newProduct);
  writeProducts(products);
  return newProduct;
}

function updateProduct(pid, updates) {
  var products = readProducts();
  var product = products.find(function (p) {
    return p.id === pid;
  });
  if (!product) return null;
  Object.assign(product, updates);
  writeProducts(products);
  return product;
}

function deleteProduct(pid) {
  var products = readProducts();
  var productIndex = products.findIndex(function (p) {
    return p.id === pid;
  });
  if (productIndex === -1) return null;
  products.splice(productIndex, 1);
  writeProducts(products);
  return true;
}

module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  addProduct: addProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getAllProduct: getAllProduct
};