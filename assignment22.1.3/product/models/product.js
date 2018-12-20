var mongoose = require('mongoose');

var connection = require('../connections');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    product_status: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

Product = module.exports = connection.db.model('Product', productSchema);

module.exports.getProducts = function (callback) {
    Product.find(callback);
}

module.exports.getProductById = function (id, callback) {
    Product.findById(id, callback);
}

module.exports.addProduct = function (product, callback) {
    Product.create(product, callback);
}

module.exports.deleteProduct = function (id, callback) {
    var query = { _id: id };
    Product.remove(query, callback);
}

module.exports.updateProduct = function (id, product, callback) {
    var query = { _id: id };
    var update = {
        name: product.name,
        price: product.price,
        description: product.description,
        color: product.color,
        category: product.category,
        brand: product.brand,
        product_status: product.product_status
    }
    Product.findOneAndUpdate(query, update, callback);
}