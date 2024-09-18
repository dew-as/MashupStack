var express = require('express');
var router = express.Router();
const Product = require('../models/ecomModel');

router.get('/list_template', (req, res) => {
    res.render('productAjax');
});

//create product
router.post('/create_product', (req, res) => {
    const { name, description, price } = req.body;
    const product = new Product({
        name,
        description,
        price
    });
    const validationError = product.validateSync();


    if (validationError) {
        return res.status(400).json({ error: validationError.errors });
    }
    product.save()
        .then(() => {
            res.status(201).json({ message: 'Product created successfully' });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        });
});

//get product
router.get('/retrieve_products', (req, res) => {
    Product.find({}, '-__v')
        .then(product_list => {
            res.json(product_list);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

//update product
router.post('/update_product/:id', (req, res) => {
    const productId = req.params.id;
    const { name, description, price } = req.body;
    // Validate the updated product data
    const updatedProduct = new Product({ name, description, price });
    const validationError = updatedProduct.validateSync();
    if (validationError) {
        // If there are validation errors, send a JSON response with the errors
        res.status(400).json({ error: validationError.errors });
    } else {
        // Update the product in the database
        Product.findByIdAndUpdate(productId, { name, description, price })
            .then(() => {
                // Send a JSON response indicating success
                res.status(200).json({ message: 'Product updated successfully' });
            })
            .catch(error => {
                // Handle database update error
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    }
});

// Delete product
router.post('/delete_product/:id', (req, res) => {
    const productId = req.params.id;
    // Delete the product from the database
    Product.findByIdAndDelete(productId)
        .then(() => {
            res.json({ message: 'Product deleted successfully' });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = router; 