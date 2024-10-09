var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { validationResult, check } = require('express-validator');
const { varifyTokenAdmin, generateSecretKey, varifyToken } = require('./isAuthUser');
const Product = require('../models/ecomModel');
const jwt = require('jsonwebtoken');

router.get('/signup', (req, res) => {
  res.status(200).json({ message: "Signup page" });
})

router.post('/signup', [
  // Add validation rules here
  check('email')
    .matches(/^[a-zA-Z0-9._%+-]+@\w+\.\w+$/)
    .withMessage('Invalid email domain. Only @(link unavailable) is allowed'),
  check('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character')
], (req, res) => {

  try {
    const { email, password, confirmPassword } = req.body;
    const user = new User({ email, password });
    console.log(user);

    const validationError = user.validateSync();
    console.log(validationError);

    if (validationError) {
      return res.status(422).json({ errors: validationError.errors });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ message: 'Password and Confirm Password do not match' });
    }

    User.findOne({ email }).then(existingUser => {
      if (existingUser) {
        return res.status(409).json({ message: 'Email already taken' });
      }

      bcrypt.hash(password, 10).then(hashedPassword => {
        const signupUser = new User({ email, password: hashedPassword });
        if (email === 'dewas@gmail.com') {
          signupUser.role = 'admin';
        }
        return signupUser.save();
      }).then(() => {
        res.status(201).json({ message: 'User created successfully' });
      }).catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


/* GET home page. */
router.get('/login', (req, res) => {
  res.status(200).json({ message: "Login page" });
})

router.post('/login', function (req, res) {

  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(422).json({ message: 'No user Found ! Incorrect email address' });
      }

      return bcrypt.compare(password, user.password)
        .then(isPasswordValid => {
          if (!isPasswordValid) {
            return res.status(422).json({ message: 'Incorrect password.' });
          }
          const token = jwt.sign({ userId: user._id, userRole: user.role }, process.env.JWT_SECRET = generateSecretKey(), { expiresIn: '1h' });
          return res.status(200).json({ token, email: user.email, role: user.role, userId: user._id });
        })
        .catch(error => {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error' });
        });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error' });
    } else {
      res.status(200).json({ message: 'Logged out successfully' });
    }
  });
});

router.get('/home', varifyToken, function (req, res, next) {
  res.status(200).json({ message: 'Home page' });
});

// router.get('/store', varifyToken, function (req, res, next) {
//   const { page = 1, limit = 5 } = req.query;
//   const options = {
//     page: parseInt(page, 10),
//     limit: parseInt(limit, 10),
//     sort: { id: 1 },
//     projection: { __v: 0 }
//   };
//   Product.paginate({}, options)
//     .then(result => {
//       res.status(200).json({ objects: result.docs, pagination: result });
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     });
// });

router.get('/store', varifyToken, (req, res, next) => {
  Product.find({}).then(data => {
    res.status(200).json(data)
  }).catch(error => {
    res.status(500).json({ message: 'Internal Server Error' });
  })
})

router.post('/store', varifyToken, (req, res) => {
  const { id, name, description, price } = req.body;
  const newProduct = new Product({ id, name, description, price });
  const validationError = newProduct.validateSync();
  if (validationError) {
    res.status(400).json({ errors: validationError.errors });
  } else {
    newProduct.save()
      .then(() => {
        res.status(201).json({ message: 'Product created successfully' });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  }
});

router.get('/store/productId/:id', varifyToken, (req, res) => {
  const Reqid = req.params.id;
  Product.findById(Reqid)
    .then(product => {
      res.status(200).json({ item: product });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.get('/store/updateProduct/:id', varifyToken, (req, res) => {
  const Reqid = req.params.id;
  Product.findById(Reqid)
    .then(product => {
      res.status(200).json({ item: product, errors: [] });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.put('/store/updateProduct/:id', varifyToken, (req, res) => {
  const Reqid = req.params.id;
  const { id, name, description, price } = req.body;
  const product = new Product({ id, name, description, price });
  const validationError = product.validateSync();
  if (validationError) {
    res.status(400).json({ errors: validationError.errors });
  } else {
    Product.findByIdAndUpdate(Reqid, { id, name, description, price })
      .then(() => {
        res.status(200).json({ message: 'Product updated successfully' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  }
});

router.get('/store/deleteProduct/:id', varifyToken, (req, res) => {
  const Reqid = req.params.id;
  Product.findById(Reqid)
    .then(product => {
      res.status(200).json({ item: product });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.delete('/store/confirmDelete/:id', varifyToken, (req, res) => {
  const Reqid = req.params.id;
  Product.findByIdAndDelete(Reqid)
    .then(() => {
      res.status(200).json({ message: 'Product deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.post('/searchProduct', varifyToken, (req, res) => {
  const { searchInput } = req.body;
  console.log(searchInput);
  Product.find({ name: { $regex: searchInput, $options: 'i' } })
    .then((products) => {
      res.status(200).json({ products, message: 'Products found successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});


// Route to handle page visit
router.get('/adminPanel', varifyTokenAdmin, (req, res) => {
  res.status(200).json({ message: 'Admin panel' });
});

router.get('/about', varifyToken, (req, res) => {
  res.status(200).json({ message: 'About us' });
});

router.get('/ecomForm', varifyToken, (req, res) => {
  res.status(200).json({ message: 'Ecommerce form' });
});

module.exports = router; 