import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { addItem } from '../store/cartSlice'
import { useDispatch } from 'react-redux';
import checkAuth from './auth/checkAuth';
import axiosConfig from '../axiosConfig'

const ProductsList = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const result = await axiosConfig.get('/store')
                console.log(result.data)
                setProducts(result.data)
            } catch (error) {
                console.log(error)
                if (error?.response?.status == 401 || error?.response?.status == 403) {
                    navigate('/login/' + error?.response?.data?.message)
                }
            }
        })()
    }, [])

    const handleClick = (id) => {
        navigate('/productPage/' + id)
    }

    const cartHandle = (product) => {
        dispatch(addItem(product))
    }

    return (
        <div>
            <Header />
            <div className="container" style={{ marginTop: '80px' }}>
                <h2 className="text-center">Product List</h2>
                <ul className="list-group">
                    {
                        products.map((product) => (
                            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center mb-3 border">
                                <div>
                                    <h4>{product.name}</h4>
                                    <p>Price: {product.price} ₹</p>
                                </div>
                                <div>
                                    <Link
                                        onClick={() => handleClick(product._id)}
                                        className="btn btn-primary mr-2"
                                    >
                                        See Product
                                    </Link>
                                    <Link
                                        onClick={() => cartHandle(product)}
                                        className="btn btn-primary"
                                    >
                                        Add to Cart
                                    </Link>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default checkAuth(ProductsList);