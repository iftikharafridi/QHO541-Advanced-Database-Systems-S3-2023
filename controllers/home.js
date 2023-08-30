const products = require('../models/products')

module.exports = (req, res) => {
    products.find().then(function(results){
        res.render('index',{
            products: results
        })
    })
}