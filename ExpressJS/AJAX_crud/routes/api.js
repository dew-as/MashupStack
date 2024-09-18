// var express = require('express');
// var router = express.Router();
// const bcrypt = require('bcrypt');
// const User = require('../models/userModel');
// const { validationResult, check } = require('express-validator');
// const { varifyTokenAdmin, generateSecretKey, varifyToken } = require('./isAuthUser');
// const Product = require('../models/ecomModel');
// const jwt = require('jsonwebtoken');

// router.get('/signup', (req, res) => {
//   res.status(200).json({ message: "Signup page" });
// })

// router.post('/signup', [
//   // Add validation rules here
//   check('email')
//     .matches(/^[a-zA-Z0-9._%+-]+@\w+\.\w+$/)
//     .withMessage('Invalid email domain. Only @req.params.id is allowed'),
//   check('password')
//     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
//     .withMessage('Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character')
// ], (req, res) => {
//   const { email, password, confirmPassword } = req.body;
//   const user = new User({ email, password })
//   const validationError = user.validateSync();
//   const error = validationResult(req);
//   if (!error.isEmpty()) {
//     // There are validation errors, send error response
//     res.status(422).json({ errors: error.array() });
//   } else if (password !== confirmPassword) {
//     // Password and confirm password do not match
//     res.status(422).json({ message: 'Password and Confirm Password do not match' });
//   } else if (validationError) {
//     // Validation error
//     res.status(422).json({ errors: validationError.errors });
//   } else {
//     // Check if the username is already taken
//     User.findOne({ email })
//       .then(existingUser => {
//         if (existingUser) {
//           res.status(409).json({ message: 'Email already taken' });
//         } else {
//           // Hash the password using bcrypt
//           return bcrypt.hash(password, 10)
//         }
//       })
//       .then(hashedPassword => {
//         // Create a signup user in MongoDB
//         if (email == 'dewas@req.params.id') {
//           const signupUser = new User({ email, password: hashedPassword, role: 'admin' });
//           return signupUser.save();
//         } else {
//           const signupUser = new User({ email, password: hashedPassword });
//           return signupUser.save();
//         }
//       })
//       .then(() => {
//         // Send success response
//         res.status(201).json({ message: 'User created successfully' });
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//       });
//   }
// })

// /* GET home page. */
// router.get('/login', (req, res) => {
//   res.status(200).json({ message: "Login page" });
// })

// router.post('/login', [
//   // Add validation rules here
//   check('email')
//     .matches(/^[a-zA-Z0-9._%+-]+@\w+\.\w+$/)
//     .withMessage('Invalid email domain. Only @req.params.id is allowed'),
//   check('password')
//     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/)
//     .withMessage('Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character')
// ], function (req, res) {
//   // Validate the request
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // There are validation errors, send error response
//     res.status(422).json({ errors: errors.array() });
//   } else {
//     const { email, password } = req.body;
//     let foundUser;
//     // Declare foundUser here
//     User.findOne({ email })
//       .then(user => {
//         console.log(user);
//         if (!user) {
//           res.status(422).json({ message: 'Incorrect Email Address.' });
//         }
//         foundUser = user; // Assign user to foundUser
//         return bcrypt.compare(password, user.password);
//       })
//       .then(isPasswordValid => {
//         if (!isPasswordValid) {
//           res.status(422).json({ message: 'Incorrect password.' });
//         } else {
//                 // Set user's ID and email in the session
//                 const token = jwt.sign({ userId: foundUser._id, userRole: foundUser.role }, process.env.JWT_SECRET = generateSecretKey(), { expiresIn: '1h' });
//                 res.status(200).json({ token, email: foundUser.email, role: foundUser.role,userId:foundUser._id });
//               }
//             })
//             .catch(error => {
//               console.error(error);
//               res.status(500).json({ message: 'Internal Server Error' });
//             });
//         }
//       });
  
//   //route for logout
//   router.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Error' });
//       } else {
//         res.clearCookie('session');
//         res.status(200).json({ message: 'Logged out successfully' });
//       }
//     });
//   });
  
//   router.get('/home', varifyToken, function (req, res, next) {
//     res.status(200).json({ message: 'Home page' });
//   });
  
//   router.get('/store', varifyToken, function (req, res, next) {
//     const { page = 1, limit = 5 } = req.query;
//     const options = {
//       page: parseInt(page, 10),
//       limit: parseInt(limit, 10),
//       sort: { id: 1 },
//       projection: { __v: 0 }
//     };
//     Product.paginate({}, options)
//       .then(result => {
//         res.status(200).json({ objects: result.docs, pagination: result });
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       });
//   });
  
//   router.post('/store', varifyToken, (req, res) => {
//     const { id, name, description, price } = req.body;
//     const newProduct = new Product({ id, name, description, price });
//     const validationError = newProduct.validateSync();
//     if (validationError) {
//       res.status(400).json({ errors: validationError.errors });
//     } else {
//       newProduct.save()
//         .then(() => {
//           res.status(201).json({ message: 'Product created successfully' });
//         })
//         .catch((error) => {
//           console.log(error);
//           res.status(500).json({ message: 'Internal Server Error' });
//         });
//     }
//   });
  
//   router.get('/store/productId/:id', varifyToken, (req, res) => {
//     const Reqid = req.params.id;
//     Product.findById(Reqid)
//       .then(product => {
//         res.status(200).json({ item: product });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({ message: 'Internal Server Error' });
//       });
//   });
  
//   router.get('/store/updateProduct/:id', varifyToken, (req, res) => {
//     const Reqid = req.params.id;
//     Product.findById(Reqid)
//       .then(product => {
//         res.status(200).json({ item: product, errors: [] });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({ message: 'Internal Server Error' });
//       });
//   });
  
//   router.post('/store/updateProduct/:id', varifyToken, (req, res) => {
//     const Reqid = req.params.id;
//     const { id, name, description, price } = req.body;
//     const product = new Product({ id, name, description, price });
//     const validationError = product.validateSync();
//     if (validationError) {
//       res.status(400).json({ errors: validationError.errors });
//     } else {
//       Product.findByIdAndUpdate(Reqid, { id, name, description, price })
//         .then(() => {
//           res.status(200).json({ message: 'Product updated successfully' });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).json({ message: 'Internal Server Error' });
//         });
//     }
//   });
  
//   router.get('/store/deleteProduct/:id', varifyToken, (req, res) => {
//     const Reqid = req.params.id;
//     Product.findById(Reqid)
//       .then(product => {
//         res.status(200).json({ item: product });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({ message: 'Internal Server Error' });
//       });
//   });

//     router.get('/store/confirmDelete/:id', varifyToken, (req, res) => {
//       const Reqid = req.params.id;
//       Product.findByIdAndDelete(Reqid)
//         .then(() => {
//           res.status(200).json({ message: 'Product deleted successfully' });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).json({ message: 'Internal Server Error' });
//         });
//     });
    
//     // Route to handle page visit
//     router.get('/adminPanel', varifyTokenAdmin, (req, res) => {
//       res.status(200).json({ message: 'Admin panel' });
//     });
    
//     router.get('/about', varifyToken, (req, res) => {
//       res.status(200).json({ message: 'About us' });
//     });
    
//     router.get('/ecomForm', varifyToken, (req, res) => {
//       res.status(200).json({ message: 'Ecommerce form' });
//     });
    
//     module.exports = router; 