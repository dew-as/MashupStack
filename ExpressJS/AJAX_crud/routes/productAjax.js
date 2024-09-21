var express = require('express');
var router = express.Router();
const Product = require('../models/ecomModel');
const ejs = require('ejs');
const { promisify } = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');

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

  router.get('/send_product_email/:id', async (req, res) => {
    try {
      // Assuming you have a Product model or equivalent
      const product = await Product.findById(req.params.id);
  
  
      // Create a nodemailer transport object
      // replace this with your copied code
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "92098d3eca67e4",
          pass: "01597099247774"
        }
      });
  
  
      const template = await readFileAsync('./views/product/product_email.ejs', 'utf8');
      // Email content
      const mailOptions = {
        from: 'dewasdevelops@gmail.com', // Sender email address
        to: 'd.e.v.a.s.1.7.0.9.5.6@gmail.com', // Receiver email address
        subject: `New Product: ${product.name}`, // Email subject
        html: ejs.render(template, { product }) // Render HTML using EJS
      };
  
  
      // Send the email
      const info = await transport.sendMail(mailOptions);
      console.log('Email sent:', info.response);
  
  
      // Close the transport after sending the email
      transport.close();
  
  
      res.send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/generate-pdf/:id', async (req, res) => {
    try {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      const reqId = req.params.id
      const product = await Product.findById(reqId)

      await page.setContent(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${product.name} Invoice</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
              .invoice-container {
                width: 800px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .invoice-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
              }
              .invoice-header h2 {
                font-size: 24px;
                color: #333;
              }
              .invoice-details {
                margin-bottom: 40px;
              }
              .invoice-details p {
                font-size: 16px;
                margin-bottom: 10px;
              }
              .invoice-table {
                border-collapse: collapse;
                width: 100%;
              }
              .invoice-table th, .invoice-table td {
                border: 1px solid #ddd;
                padding: 10px;
                text-align: left;
              }
              .invoice-table th {
                background-color: #f0f0f0;
              }
              .invoice-footer {
                margin-top: 40px;
                text-align: right;
              }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              <div class="invoice-header">
                <h2>Invoice for ${product.name}</h2>
                <p>Date: ${new Date().toLocaleDateString()}</p>
              </div>
              <div class="invoice-details">
                <p>Product Description: ${product.description}</p>
                <p>Product Price: $${product.price}</p>
              </div>
              <table class="invoice-table">
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
                <tr>
                  <td>${product.name}</td>
                  <td>1</td>
                  <td>$${product.price}</td>
                </tr>
              </table>
              <div class="invoice-footer">
                <p>Total: $${product.price}</p>
                <p>Thank you for your purchase!</p>
              </div>
            </div>
          </body>
        </html>
      `)      
      
      await page.emulate('screen')
      await page.pdf({
          path :product.name+'.pdf',
          format:'A4',
          printBackground: true
      })

      console.log("done");
      await browser.close().then(()=>{
        res.redirect('/productAjax/list_template')
      })
   } catch (error) {
      console.log('error',error);
   }
  });
  
  
module.exports = router; 