import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../Header';
import axios from 'axios';

const ProductsList = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get('http://localhost:5000/api/store')
                console.log(result.data)
                setProducts(result.data)
            } catch (error) {
                console.log(error)
                if (error.response.status == 401 || error.response.status == 403) {
                    navigate('/login/'+error.response.data.message)
                }
            }
        })()
    }, [])

    const handleClick = (id) => {
        navigate('/productPage/' + id)
    }

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <h2 className="text-center">Product List</h2>
                <ul className="list-group">
                    {
                        products.map((product) => (
                            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h4>{product.name}</h4>
                                    <p>Price: {product.price} ₹</p>
                                </div>
                                <Link
                                    onClick={() => handleClick(product._id)}
                                    className="btn btn-primary"
                                >
                                    See Product
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default ProductsList;