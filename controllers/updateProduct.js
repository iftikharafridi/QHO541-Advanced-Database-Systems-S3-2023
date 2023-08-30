const products = require('../models/products')
const path = require('path')

module.exports = (req, res) => {
    //console.log(req.files.myfile)
    let myfile = req.files.myfile;
    myfile.mv(path.resolve(__dirname, '../public/images', myfile.name))

   products.updateOne({id: req.body.id}, {name: req.body.name, price: req.body.price, qty: req.body.qty, path: '/images/'+myfile.name}).then(function(){
    res.redirect('/')
   })

    // products.create({
    //     id: req.body.id,
    //     name: req.body.name,
    //     price: req.body.price,
    //     qty: req.body.qty,
    //     path: '/images/'+myfile.name
    // })
   // res.redirect('/')
}