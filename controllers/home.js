const products = require('../models/products')
//console.log("I am here")
// console.log(loggedIn)
module.exports = (req, res) => {
    // console.log("This is home session")
    // console.log(req.session.userId)
    // console.log(global)
    products.find().then(function(results){
        if(loggedIn){
            res.render('index',{
                products: results
            })
        }
        else {
            res.redirect('loginForm')
        }
        
    })
}