const user = require('../models/users')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
    // const username = req.body.username;
   // const password = req.body.password;

    const {username, password} = req.body;
   // console.log(username)
   // console.log(password)

   user.findOne({username: username}).then(function(person){
     console.log(person)
    if(person){
        // decript the password and compare it with the received login information/password from the login form
        bcrypt.compare(password, person.password, (error, same) => {
            if(same){
                res.redirect('/')
            } else {
                res.render('loginForm', {
                    invalidUserError: null,
                    invalidPasswordError: "Wrong Password"
                })
            }
        })
    }
    else {
        console.log('invalide user')
        res.render('loginForm', {
            invalidUserError: "Invalid User",
            invalidPasswordError: null
        })
    }
   })
}