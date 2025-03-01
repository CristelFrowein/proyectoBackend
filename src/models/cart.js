const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',  
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: 1 
    }
});


const cartSchema = new mongoose.Schema({
    products: [productSchema], 
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});


cartSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
