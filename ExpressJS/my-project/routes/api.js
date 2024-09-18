var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const { validationResult, check } = require('express-validator');
const isAuthenticated = require('./isAuthUser')
const Product = require('../models/ecomModel')

router.get('/signup', (req, res) => {
  res.render('signup', { message: null, error: null })
})

router.post('/signup',
  [
    // Add validation rules here
    check('email')
      .matches(/^[a-zA-Z0-9._%+-]+@\w+\.\w+$/)
      .withMessage('Invalid email domain. Only @(link unavailable) is allowed'),
    check('password')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/)
      .withMessage('Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character')
  ],
  (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const user = new User({ email, password })
    const validationError = user.validateSync();
    const error = validationResult(req);
    if (!error.isEmpty()) {
      // There are validation errors, render the form with errors
      return res.render('signup', { error: error.array(), message: null });
    }
    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res.render('signup', { message: 'Password and Confirm Password do not match', error: null });
    }
    // Check all fields are not empty
    if (validationError) {
      return res.render('signup', { message: null, error: validationError.errors });
    }
    // Check if the username is already taken
    User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          return res.render('signup', { message: 'Email already taken', error: null });
        } else {
          //hash the password using bcrypt
          return bcrypt.hash(password, 10)
        }
      })
      .then(hashedPassword => {
        // Create a signup user in MongoDB
        if (email == 'dewas@(link unavailable)') {
          const signupUser = new User({ email, password: hashedPassword, role: 'admin' });
          return signupUser.save();
        } else {
          const signupUser = new User({ email, password: hashedPassword });
          return signupUser.save();
        }
      })
      .then(() => {
        // Redirect to a success page or login page
        res.redirect('/api/login');
      })
      .catch(error => {
        console.error(error);
        res.send('Internal Server Error');
      });
  })

/* GET home page. */
router.get('/login', (req, res) => {
  res.render('login', { errors: [], message: null })
})

router.post('/login',
  [
    // Add validation rules here
    check('email')
      .matches(/^[a-zA-Z0-9._%+-]+@\w+\.\w+$/)
      .withMessage('Invalid email domain. Only @(link unavailable) is allowed'),
    check('password')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/)
      .withMessage('Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character')
  ],
  function (req, res) {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are validation errors, render the form with errors
      return res.render('login', { errors: errors.array(), message: null });
    } else {
      const { email, password } = req.body;
      let foundUser;
      // Declare foundUser here
      User.findOne({ email })
        .then(user => {
          console.log(user);
          if (!user) {
            return res.render('login', { message: 'Incorrect Email Address.', errors: [] });
          }
          foundUser = user; // Assign user to foundUser
          return bcrypt.compare(password, user.password);
        })
        .then(isPasswordValid => {
          if (!isPasswordValid) {
            return res.render('login', { message: 'Incorrect password.', errors: [] });
          }
            req.session.userId = foundUser._id;
            req.session.userEmail = foundUser.email;
            res.render('index', { email: foundUser.email});
          })
          .catch(error => {
            console.error(error);
            res.send('Internal Server Error');
          });
        }
      });
  
      //route for logout
      router.get('/logout', (req, res) => {
        req.session.destroy((err) => {
          if (err) {
            console.log(err);
            res.send('Error')
          } else {
            res.redirect('/api/login')
          }
        });
      });
  
      router.get('/home', isAuthenticated(null), function (req, res, next) {
        const email = req.session.userEmail || null;
        res.render('index',{email:email})
      });
  
      router.get('/store', isAuthenticated(null), function (req, res, next) {
        const { page = 1, limit = 5 } = req.query;
        // Set default page and limit
        const options = {
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
          sort: { id: 1 },
          projection: { __v: 0 }
        };
        Product.paginate({}, options)
          .then(result => {
            res.render('ecommerce', { objects: result.docs.map(doc => doc.toObject()), pagination: result })
          })
          .catch(error => {
            console.error(error);
            res.send('Internal Server Error');
          });
      })
  
      router.post('/store', isAuthenticated(null), (req, res) => {
        const { id, name, description, price } = req.body
        const newProduct = new Product({ id, name, description, price })
        const validationError = newProduct.validateSync()
        if (validationError) {
          res.render('formEcom', { item: null, errors: validationError.errors })
        } else {
          newProduct.save()
            .then(() => {
              res.redirect('/api/store')
            })
            .catch((error) => {
              console.log(error)
              res.send('Internal Server Error')
            })
        }
      })
  
      router.get('/store/productId/:id', isAuthenticated(null), (req, res) => {
        const Reqid = req.params.id
        Product.findById(Reqid).then(product => {
          res.render('singleProduct', { item: product, For: 'read' })
        })
          .catch((err) => {
            console.log(err)
            res.send('Internal Server Error')
          })
      })
  
      router.get('/store/updateProduct/:id', isAuthenticated(null), (req, res) => {
        const Reqid = req.params.id
        Product.findById(Reqid).then(product => {
          res.render('formEcom', { item: product, errors: [] })
        })
          .catch((err) => {
            console.log(err)
            res.send('Internal Server Error')
          })
      })
  
      router.post('/store/updateProduct/:id', isAuthenticated(null), (req, res) => {
        const Reqid = req.params.id
        const { id, name, description, price } = req.body
        const product = new Product({ id, name, description, price })
        const validationError = product.validateSync()
        if (validationError) {
          res.render('formEcom', { item: product, errors: validationError.errors })
          console.log(validationError.errors)
        } else {
          Product.findByIdAndUpdate(Reqid, { id, name, description, price }).then(() => {
            res.redirect('/api/store')
          })
            .catch((err) => {
              console.log(err)
              res.send('Internal Server Error')
            })
        }
      })
  
      router.get('/store/deleteProduct/:id', isAuthenticated(null), (req, res) => {
        const Reqid = req.params.id
        Product.findById(Reqid).then(product => {
          res.render('singleProduct', { item: product, For: 'delete' })
        })
          .catch((err) => {
            console.log(err)
            res.send('Internal Server Error')
          })
      })
  
      router.get('/store/confirmDelete/:id', isAuthenticated(null), (req, res) => {
        const Reqid = req.params.id
        Product.findByIdAndDelete(Reqid).then(() => {
          res.redirect('/api/store')
        })
          .catch((err) => {
            console.log(err)
            res.send('Internal Server Error')
          })
      })
  
      // Route to handle page visit
      router.get('/adminPanel', isAuthenticated("dewas@gmail.com"), (req, res) => {
        res.render('admin-panel')
      })
  
      router.get('/about', isAuthenticated(null), (req, res) => {
        res.render('aboutUs')
      })
  
      router.get('/ecomForm', isAuthenticated(null), (req, res) => {
        res.render('formEcom', { item: null, errors: [] })
      })
  
      module.exports = router;