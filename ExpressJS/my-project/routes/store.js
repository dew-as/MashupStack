var express = require('express');
var router = express.Router();
const Product = require('../models/ecomModel')

router.get('/',(req,res) => {
  Product.find({},'-_id -__v').lean().then(data => {
    console.log(data)
    res.render('ecommerce',{objects : data,title:'Ecommerce'})
  })
})

router.post('/',(req,res) => {
  console.log(req.body)

  const { id,name,description,price } = req.body

    const newProduct = new Product({
      id,
      name,
      description,
      price
    })

    newProduct.save()
    .then(() => {
      res.redirect('/store')
    })
    .catch((error) => console.log(error))

})

module.exports = router;