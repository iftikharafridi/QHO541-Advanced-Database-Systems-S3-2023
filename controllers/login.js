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
        
    }
    else {
        console.log('invalide user')
    }
   })
}