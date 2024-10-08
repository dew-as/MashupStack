import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header';

const ProductsList = () => {
    const [products, setProducts] = useState(
        [
            {
                id: 1,
                name: 'Dell XPS 13',
                price: 95000,
                description: 'Ultra-thin and lightweight laptop with stunning display and performance.'
            },
            {
                id: 2,
                name: 'MacBook Air',
                price: 120000,
                description: 'Apple’s lightweight laptop with M1 chip for exceptional performance.'
            },
            {
                id: 3,
                name: 'HP Envy x360',
                price: 85000,
                description: 'Versatile 2-in-1 laptop with a stunning design and powerful performance.'
            },
            {
                id: 4,
                name: 'Asus ZenBook 14',
                price: 78000,
                description: 'Compact and powerful laptop with a long-lasting battery and sleek design.'
            },
            {
                id: 5,
                name: 'Lenovo ThinkPad X1 Carbon',
                price: 115000,
                description: 'Business-class laptop known for its durability and exceptional keyboard.'
            },
            {
                id: 6,
                name: 'Microsoft Surface Laptop 3',
                price: 90000,
                description: 'Stylish laptop with a touch screen and great performance for everyday tasks.'
            },
            {
                id: 7,
                name: 'Acer Swift 3',
                price: 70000,
                description: 'Budget-friendly laptop with a sleek design and solid performance.'
            },
            {
                id: 8,
                name: 'Razer Blade Stealth',
                price: 135000,
                description: 'Gaming ultrabook with a powerful GPU and stunning display for gamers on the go.'
            },
            {
                id: 9,
                name: 'LG Gram 14',
                price: 75000,
                description: 'Lightweight laptop with long battery life and excellent portability.'
            },
            {
                id: 10,
                name: 'HP Spectre x360',
                price: 110000,
                description: 'Premium convertible laptop with an elegant design and high performance.'
            },
        ]
    )

    const [searchInput, setSearchInput] = useState(localStorage.getItem('searchInput'));
    const [searchResult, setSearchResult] = useState([]);


    const isAvail = localStorage.getItem("newProduct")
    const isDeleteItemId = localStorage.getItem('deleteItemId')

    useEffect(() => {
        const product = localStorage.getItem("newProduct");
        if (product) {
            try {
                const parsedProduct = JSON.parse(product);
                const updatedItems = products.map((item) => {
                    console.log(parsedProduct.id, item.id)
                    if (item.id == parsedProduct.id) {
                        return parsedProduct;
                    }
                    return item;
                });
                setProducts(updatedItems)
                console.log(updatedItems);
            } catch (error) {
                console.error("Error parsing product:", error);
            }
            localStorage.removeItem("newProduct");
        }
    }, [isAvail]);

    useEffect(() => {
        const items = products.filter((item) => {
            return item.id != isDeleteItemId
        })
        localStorage.removeItem("deleteItemId");
        setProducts(items)
    }, [isDeleteItemId])

    useEffect(() => {
        if (searchInput) {
            console.log(searchInput);
            const result = products.filter((item) => {
                if (item.name.toLowerCase().includes(searchInput)) {
                    return item
                }
            })
            console.log(result);
            setSearchResult(result)
            localStorage.removeItem("searchInput");
        }
    }, [searchInput])

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <h2 className="text-center">Product List</h2>
                <ul className="list-group">
                    {
                        searchResult.length > 0 ? searchResult.map((product) => (
                            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h4>{product.name}</h4>
                                    <p>Price: {product.price} ₹</p>
                                </div>
                                <Link
                                    to={`/productPage/${product.name}/${product.price}/${product.description}/${product.id}`}
                                    className="btn btn-primary"
                                >
                                    See Product
                                </Link>
                            </li>
                        )) : products.map((product) => (
                            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h4>{product.name}</h4>
                                    <p>Price: {product.price} ₹</p>
                                </div>
                                <Link
                                    to={`/productPage/${product.name}/${product.price}/${product.description}/${product.id}`}
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