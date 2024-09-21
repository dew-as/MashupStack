 // Function to show the create form
 const showCreateForm = () => {
    const contentBox = document.getElementById('content-box');
    contentBox.innerHTML = `
        <div class="container">
            <h1>Create Products</h1>
            Product Name: <input type="text" id="name" name="name" required><br><br>
            Description: <textarea id="description" name="description" required></textarea><br><br>
            Price: <input type="number" id="price" name="price" min="0" required><br><br>
            <button type="button" onclick="createProduct()">Create Product</button>
        </div>
    `;


    // Hide the product list
    const productList = document.getElementById('product-table');
    productList.style.display = 'none';
};


// Function to handle form submission (create product)
const createProduct = () => {
    // Get form data
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;


    // Make an AJAX request to create a new product
    axios.post('/productAjax/create_product', {
        name,
        description,
        price
    })
    .then(response => {
        // Handle the response as needed (e.g., show success message)
        console.log('Product created successfully:', response.data);


        // Show the product list after successful creation
        getProductList();
    })
    .catch(error => {
        // Handle errors (e.g., display error message)
        console.error('Error creating product:', error.response.data);
    });
};

 // Function to get product list
 const getProductList = () => {
    axios.get('/productAjax/retrieve_products')
        .then(response => {
            // Handle the response
            const productList = document.getElementById('product-table');
            productList.innerHTML = '<tr><th>Name</th><th>Price</th><th>Description</th><th colspan="2" style="text-align:center;">Actions</th></tr>';
            response.data.forEach(product => {
                const row = `<tr><td>${product.name}</td><td>${product.price}</td><td>${product.description}</td><td><button onclick="showUpdateForm('${product._id}', '${product.name}', '${product.description}', ${product.price})">Update</button></td><td><button onclick="showDeleteConfirmation('${product._id}', '${product.name}')">Delete</button></td><td><a href="/productAjax/generate-pdf/${product._id}">PDF</a></td><td><a href="/productAjax/send_product_email/${product._id}">Send Email</a></td></tr>`;
                productList.innerHTML += row;
            });
            // Show the product list
            productList.style.display = 'block';
          // Hide the create and update forms
            const contentBox = document.getElementById('content-box');
            contentBox.innerHTML = `<form id="create-form" action="" method="post"></form><form id="update-form" action="" method="post"></form>`;
        })
        .catch(error => {
            // Handle errors (e.g., display error message)
            console.error('Error getting product list:', error.response.data);
        });
};
// Call getProductList on page load
document.addEventListener('DOMContentLoaded', getProductList);

 // Function to show the update form
 const showUpdateForm = (productId, productName, productDescription, productPrice) => {
    const contentBox = document.getElementById('content-box');
    contentBox.innerHTML = `
        <div class="container">
            <h1>Update Product</h1>
            Product Name: <input type="text" id="update-name" name="name" value="${productName}" required><br><br>
            Description: <textarea id="update-description" name="description" required>${productDescription}</textarea><br><br>
            Price: <input type="number" id="update-price" name="price" value="${productPrice}" min="0" required><br><br>
            <button type="button" onclick="updateProduct('${productId}')">Update Product</button>
        </div>
    `;
    // Hide the product list
    const productList = document.getElementById('product-table');
    productList.style.display = 'none';
    // Hide the create button
    const createButton = document.getElementById('createbtn');
    createButton.style.display = 'none';
};


 // Function to handle form submission (update product)
const updateProduct = (productId) => {
    // Get form data
    const updatedName = document.getElementById('update-name').value;
    const updatedDescription = document.getElementById('update-description').value;
    const updatedPrice = document.getElementById('update-price').value;


    // Make an AJAX request to update the product
    axios.post(`/productAjax/update_product/${productId}`, {
        name: updatedName,
        description: updatedDescription,
        price: updatedPrice
    })
    .then(response => {
        // Handle the response as needed (e.g., show success message)
        console.log('Product updated successfully:', response.data);


        // Show the product list after successful update
        getProductList();


        // Show the create button
        const createButton = document.getElementById('createbtn');
        createButton.style.display = 'block';
    })
    .catch(error => {
        // Handle errors (e.g., display error message)
        console.error('Error updating product:', error.response.data);
    });
};

 // Function to show the delete confirmation modal
 const showDeleteConfirmation = (productId,productName) => {
    const contentBox = document.getElementById('content-box');
    contentBox.innerHTML = `
        <div class="container">
            <h1>Delete Confirmation</h1>
            <p>Are you sure you want to delete this <b>${productName}</b> product?</p>
            <button type="button" onclick="confirmDelete('${productId}')">Yes, Delete</button>
            <button type="button" onclick="cancelDelete()">Cancel</button>
        </div>
    `;


    // Hide the product list
    const productList = document.getElementById('product-table');
    productList.style.display = 'none';


    // Hide the create button
    const createButton = document.getElementById('createbtn');
    createButton.style.display = 'none';
};




// Function to confirm delete (called when "Yes, Delete" button is clicked)
const confirmDelete = (productId) => {
    // Make an AJAX request to delete the product
    axios.post(`/productAjax/delete_product/${productId}`)
        .then(response => {
            // Handle the response as needed (e.g., show success message)
            console.log(response.data.message);
            // Show the product list after successful deletion
            getProductList();
            // Show the create button
            const createButton = document.getElementById('createbtn');
            createButton.style.display = 'block';
        })
        .catch(error => {
            // Handle errors (e.g., display error message)
            console.error('Error deleting product:', error.response.data.error);
        });
    // Reset content-box to its initial state
    const contentBox = document.getElementById('content-box');
    contentBox.innerHTML = '';
    // Show the product list
    const productList = document.getElementById('product-table');
    productList.style.display = 'block';
};

const cancelDelete = () => {
    getProductList()
}