import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';

const ProductForm = () => {
    const navigate = useNavigate()
    let params = useParams()
    const [id, setId] = useState(params ? params.id : '');
    const [name, setName] = useState(params ? params.name : '');
    const [description, setDescription] = useState(params ? params.description : '');
    const [price, setPrice] = useState(params ? params.price : '');
    const [errors, setErrors] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = { id, name, description, price };
        if (product) {
            localStorage.setItem("newProduct", JSON.stringify(product))
            navigate('/productsList');
        }
    };

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h1 className="text-center mb-4">{params.name ? 'Edit Product' : 'Add Product'}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="id" className="font-weight-bold">ID:</label>
                        <input
                            type="number"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            id="id"
                            className="form-control"
                            disabled={!!params.name} // Disable ID if updating
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="font-weight-bold">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            name="name"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="font-weight-bold">Description:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="description"
                            name="description"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price" className="font-weight-bold">Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            id="price"
                            name="price"
                            className="form-control"
                            required
                        />
                    </div>
                    <input
                        type="submit"
                        value="Submit"
                        className="btn btn-primary btn-block"
                    />
                </form>

                {errors && Object.keys(errors).length > 0 && (
                    <div style={{ color: 'red' }}>
                        <p>Error(s):</p>
                        <ul>
                            {Object.values(errors).map((err, index) => (
                                <li key={index}>{err.message}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductForm;
