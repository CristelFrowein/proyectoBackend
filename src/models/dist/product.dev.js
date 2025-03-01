"use strict";

var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});
var Product = mongoose.model('Product', productSchema);
module.exports = Product;