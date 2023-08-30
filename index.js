/*
// Use this code, when you are not using express
const http = require('http')
const server = http.createServer((req, res) => {    
    console.log(req.url)
    if (req.url === '/')
       res.end('Welcome to QHO541 Module Home Page')
    else if (req.url === '/about')
       res.end('This page is about the QHO541 MODULE')
    else if (req.url === '/contact')
       res.end('This is my contact us page')
    else {
      res.end('Sorry page not found')
    }
})
server.listen(3000)
*/

const express = require('express')
const path = require('path')
const app = express()

/* 
Public folder serves the statis files like css, js, pics etc. We will create a public folder and put all our statis files there.
Just add the below middlewear that let the express which folder contains the static files
*/
app.use(express.static('public'))

const ejs = require('ejs')
app.set('view engine','ejs')  

/*
// To receive the parameter, we need to install the body-parser package
 npm install body-parser
const bodyParser = require('body-parser')
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
*/
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// For File/Image Upload
const fileUpload = require('express-fileupload')
app.use(fileUpload())

// import mongoose
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/gift_shop_db', {useNewUrlParser: true});

const products = require('./models/products')
const { profile } = require('console')

/*
products.find().then(function(result){
  console.log(result)
})
*/

// app.get('/', (req, res) => {
//    /*
//    res.json({
//       name: "QHO541 ADVANCED DATABASE SYSTEM"
//    })
//    */
//   res.sendFile(path.resolve(__dirname,'index.html'))
// })

/*
app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname,'about.html'))
})

app.get('/contact', (req, res) => {
   res.sendFile(path.resolve(__dirname,'contact.html'))
 })

 app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname,'error.html'))
 })
*/

/*
app.get('/', (req, res) => {
  products.find().then(function(results){
    // console.log(results);
      res.render('index', {
        products: results
      })
  });
  // res.render('index')
})
*/

// Middleware
const myPersonalMiddleware = (req, res, next) => {
  console.log("This is my personal middleware")
  next()
}

// app.use(myPersonalMiddleware)
app.use('/loginForm', myPersonalMiddleware)

const validateRegisterUserMiddleware = (req, res, next) => {
  console.log("This is New User Registration Validation Middleware")
  if(req.body.name == null || req.body.email == null || req.body.username == null || req.body.password == null || req.body.type == null || req.body.name == '' || req.body.email == '' || req.body.username == '' || req.body.password == '' || req.body.type == '' ){
    console.log("The fields can't be empy")
    return res.render('registerForm')
  }

  next()
}

app.use('/user/register', validateRegisterUserMiddleware)

const homeController = require('./controllers/home')
app.get('/', homeController)



const newProductController = require('./controllers/new')
app.get('/product/new', newProductController)

const addProductController = require('./controllers/addProduct')
app.post('/product/addProduct', addProductController)

const updateProductController = require('./controllers/updateProduct')
app.post('/product/updateProduct', updateProductController)

app.post('/product/delete', (req,res) => {
    console.log(req.body.id)
    products.deleteOne({id: req.body.id}).then(function(){
      console.log("Successfully deleted")
      res.redirect('/')
    })
})

app.get('/product/delete', (req,res) => {
  console.log(req.query.id)
  products.deleteOne({id: req.query.id}).then(function(){
    console.log("Successfully deleted")
    res.redirect('/')
  })
})

app.get('/product/delete/:id', (req,res) => {
  console.log(req.params.id)
  products.deleteOne({id: req.params.id}).then(function(){
      console.log("Successfully deleted")
      res.redirect('/')
  })
})

app.get('/product/update/:id', (req,res) => {
  console.log(req.params.id)
  products.find({id: req.params.id}).then(function(result){
    // console.log(result[0])
    res.render('updateProduct',{
        product: result[0]
    })
})
})

const userRegisterationController = require('./controllers/registerUser')
app.post('/user/register', userRegisterationController);

/*
// To receive the parameter, we need to install the body-parser package
 npm install body-parser
    const bodyParser = require('body-parser')
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
*/
app.post('/test', (req,res) => {
  console.log(req.body)
  products.find({_id: req.body.id}).then(function(results){
    console.log(results)
    })
})

const aboutController = require('./controllers/about')
app.get('/about', aboutController)
 
const contactController = require('./controllers/contact')
app.get('/contact', contactController)

const loginFormController = require('./controllers/loginForm')
app.get('/loginForm', loginFormController)

const loginController = require('./controllers/login')
app.post('/user/login', loginController)

const registerFormController = require('./controllers/registerForm')
app.get('/registerForm', registerFormController)

const errorController = require('./controllers/error')
app.get('*', errorController)

app.listen(4000, () => {
    console.log('Server started on port: 4000')
})