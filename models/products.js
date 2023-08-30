const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    id: Number,
    name: String,
    price: Number,
    qty: Number,
    path: String
});

const products = mongoose.model('products', productsSchema, 'products')
module.exports = products