import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Header = () => {
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()
    const [search, setSearch] = useState(false)
    const [searchResult, setSearchResult] = useState([])

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
                        <li className="nav-item mr-2">
                            <NavLink to={"/signUp"} className={'nav-link btn btn-primary text-white ' + ((status) => (status.isActive ? 'active' : ''))}>
                                SignUp
                            </NavLink>
                        </li>
                        <li className="nav-item mr-2">
                            <NavLink to={"/signUp"} className={'nav-link' + ((status) => (status.isActive ? 'active' : ''))}>
                                <i className="bi bi-cart4"></i>
                            </NavLink>
                        </li>
                    </ul>
                    <form className='form-inline my-2 my-lg-0'>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
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
        </div >
    )
}

export default Header;
