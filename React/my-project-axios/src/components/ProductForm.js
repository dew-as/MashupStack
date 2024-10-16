import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import checkAuth from './auth/checkAuth';
import axiosConfig from '../axiosConfig'

const ProductForm = () => {
    let params = useParams()
    const [productData, setProductData] = useState({
        id: '',
        name: '',
        description: '',
        price: ''
    })
    const [isUpdate, setIsUpdate] = useState(false)
    const [errors, setErrors] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        if (params.id) {
            (async () => {
                try {
                    const result = await axiosConfig.get('/store/updateProduct/' + params.id)
                    console.log(result.data)
                    setProductData(result.data.item)
                    setIsUpdate(true)
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }, [params.id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = productData;
        if (product) {
            try {
                const result = await axiosConfig.post('/store', product)
                console.log(result);
                navigate('/productsList');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const product = productData;
        if (product) {
            try {
                const result = await axiosConfig.put('/store/updateProduct/' + params.id, product)
                console.log(result);
                navigate('/productsList');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <Header />
            <div className="container" style={{ marginTop: '80px' }}>
                <h1 className="text-center mb-4">{isUpdate ? 'Edit Product' : 'Add Product'}</h1>
                <form onSubmit={isUpdate ? handleUpdate : handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="id" className="font-weight-bold">ID:</label>
                        <input
                            type="number"
                            value={productData.id}
                            onChange={(e) => setProductData({ ...productData, id: e.target.value })}
                            id="id"
                            className="form-control"
                            disabled={isUpdate} // Disable ID if updating
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="font-weight-bold">Name:</label>
                        <input
                            type="text"
                            value={productData.name}
                            onChange={(e) => setProductData({ ...productData, name: e.target.value })}
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
                            value={productData.description}
                            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
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
                            value={productData.price}
                            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                            id="price"
                            name="price"
                            className="form-control"
                            required
                        />
                    </div>
                    <input
                        type="submit"
                        value={isUpdate ? 'Update Product' : 'Create Product'}
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
            <Footer />
        </div>
    );
};

export default checkAuth(ProductForm);