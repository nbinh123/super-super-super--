const mongoose = require('mongoose');

const Schema = mongoose.Schema
const Product = new Schema({
    name: { type: String, default: ""},
    price: { type: Number, default: 0},
    quantity: { type: Number, default: 0},
    img: { type: String, default: ""},
    sold: { type: Number, default: ""},
    type: { type: Array, default: []}
})

module.exports = mongoose.model('Product', Product, "products")