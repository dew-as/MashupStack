var express = require('express')
var router = express.Router()
const User = require('../models/userModel')
const { validationResult } = require('express-validator');
const {validateEmail,validatePassword} = require('./customValidator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('userReg',{errors:[]})
})

// router.get('/createUser', (req,res) => {
//   const newUser = new User({
//     email: 'dewas@gmail.com',
//     password: '12345678'
//   })

//   newUser.save()
//   .then(()=> res.send('User created'))
//   .catch((error) => console.log(error))
// })

router.post('/createUser',[
  validateEmail,
  validatePassword
],(req,res) => {

  const errors = req.validationErrors || []

  const validationResultErrors = validationResult(req)

  if (!validationResultErrors.isEmpty()) {
    errors.push(...validationResultErrors.array())
  }

  if (errors.length > 0) {
    res.render('userReg',{errors})
  } else {
    const { email,password } = req.body

    const newUser = new User({
      email,
      password
    })

    newUser.save()
    .then(()=> res.render('form-data',{allData:req.body,email:'User Created Successfully'}))
    .catch((error) => console.log(error))
  }
})

module.exports = router