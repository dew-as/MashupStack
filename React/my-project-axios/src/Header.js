import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import OutsideClickHandler from 'react-outside-click-handler';

const Header = () => {
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()
    const [search, setSearch] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [cart, setCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [user, setUser] = useState(localStorage.getItem('email') || '')

    useEffect(() => {
        (async (e) => {
            try {
                if (searchInput) {
                    setSearch(true)
                    console.log(searchInput);
                    const result = await axios.post('http://localhost:5000/api/searchProduct', { searchInput })
                    console.log(result.data.products)
                    setSearchResult(result.data.products)
                } else {
                    setSearchResult([])
                    setSearch(false)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [searchInput])

    const handleLogout = async () => {
        try {
            const result = await axios.get('http://localhost:5000/api/logout')
            console.log(result);
            // Remove auth token from LocalStorage
            localStorage.clear()
            // Update Auth Header
            axios.defaults.headers.common['Authorization'] = '';
            navigate('/login/Logout Succesfully')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">Hidden brand</a>
                    <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                        <li className="nav-item">
                            <NavLink to={"/"} className={'nav-link ' + (({ isActive }) => (isActive ? 'active' : ''))}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/aboutus"} className={'nav-link ' + ((status) => (status.isActive ? 'active' : ''))}>
                                About us
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/productForm"} className={'nav-link ' + ((status) => (status.isActive ? 'active' : ''))}>
                                Add Product
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/productsList"} className={'nav-link ' + ((status) => (status.isActive ? 'active' : ''))}>
                                Products
                            </NavLink>
                        </li>
                        <form className='form-inline my-2 my-lg-0' onSubmit={(e) => e.preventDefault()}>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} aria-label="Search" />
                        </form>
                        <div className='d-flex justify-content-center align-items-center mr-3' onClick={() => setCart(true)}>
                            <li className="nav-item mr-2 position-relative list-unstyled  text-primary">
                                <i className='bx bxs-user ml-2'></i>{user ? ' '+user : ' Guest'}
                            </li>
                        </div>
                        <li className="nav-item mr-2">
                            <NavLink onClick={() => user ? handleLogout() : navigate('/signup')} className={'nav-link btn btn-primary text-white ' + ((status) => (status.isActive ? 'active' : ''))}>
                                {user ? 'Signout' : 'Signup'}
                            </NavLink>
                        </li>
                        <div className='d-flex justify-content-center align-items-center mr-3' onClick={() => setCart(true)}>
                            <li className="nav-item mr-2 position-relative">
                                <NavLink to={"#"} className={'nav-link' + ((status) => (status.isActive ? ' active' : ''))}>
                                    <i className='bx bx-cart-alt h4'></i>
                                    <span className="cart-item-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary text-white">
                                        3
                                    </span>
                                </NavLink>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>
            <div>
                {search ? (
                    <div className="position-relative">
                        <div
                            id="search-results"
                            className="position-absolute right-0 top-0 w-25"
                            style={{ zIndex: 1, right: 0 }}
                        >
                            <div id="list-group" className="bg-secondary rounded-2">
                                {
                                    searchResult.length > 0 ? searchResult.map((item) => (
                                        <div className="list-group-item bg-light">
                                            <h5><Link to={'/productPage/' + item._id}>{item.name}</Link></h5>
                                            <p>{item.description}</p>
                                        </div>
                                    )) : <div className="list-group-item bg-light">
                                        <h3>No Result Found</h3>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            {cart ? (
                <div className="position-relative">
                    <OutsideClickHandler onOutsideClick={() => setCart(false)}>
                        <div id="cart-modal" className="position-absolute right-0 top-0 w-25 bg-white border shadow-sm p-4" style={{ zIndex: 1, right: 0 }}>
                            <div id="cart-header" className="d-flex justify-content-between align-items-center mb-4">
                                <h4>Cart</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setCart(false)} aria-label="Close"><i className='bx bx-x'></i></button>
                            </div>
                            <div id="cart-body" className="overflow-auto" style={{ maxHeight: '300px' }}>
                                {cartItems.length > 0 ? cartItems.map((item) => (
                                    <div className="d-flex align-items-center mb-4 border-bottom pb-2">
                                        <div>
                                            <h5><Link to={'/productPage/' + item._id}>{item.name}</Link></h5>
                                            {/* <p>Quantity: {item.quantity}</p> */}
                                            <p>Price: ${item.price}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center">
                                        <h3>Your cart is empty</h3>
                                    </div>
                                )}
                            </div>
                            <div id="cart-footer" className="d-flex justify-content-between align-items-center mt-4">
                                <h4>Total: ${totalPrice}</h4>
                                <button className="btn btn-primary">Checkout</button>
                            </div>
                        </div>
                    </OutsideClickHandler>
                </div>
            ) : null}
        </div >
    )
}

export default Header;
