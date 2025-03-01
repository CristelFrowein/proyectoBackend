"use strict";

var _require = require('../managers/productManager'),
    getAllProduct = _require.getAllProduct;

var getAllProductsController = function getAllProductsController(req, res) {
  var _req$query, _req$query$limit, limit, _req$query$page, page, _req$query$sort, sort, _req$query$query, query, result;

  return regeneratorRuntime.async(function getAllProductsController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$query = req.query, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$sort = _req$query.sort, sort = _req$query$sort === void 0 ? '' : _req$query$sort, _req$query$query = _req$query.query, query = _req$query$query === void 0 ? '' : _req$query$query;
          _context.next = 4;
          return regeneratorRuntime.awrap(getAllProduct({
            limit: limit,
            page: page,
            sort: sort,
            query: query
          }));

        case 4:
          result = _context.sent;
          res.json({
            status: 'success',
            payload: result.products,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink,
            nextLink: result.nextLink
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            status: 'error',
            message: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

module.exports = {
  getAllProductsController: getAllProductsController
};