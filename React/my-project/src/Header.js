import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    const [searchInput, setSearchInput] = useState()

    const handleSubmit = () => {
        if (searchInput) {
            localStorage.setItem("searchInput", searchInput)
        }
        if (searchInput == '') {
            localStorage.removeItem("searchInput")
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
                    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Header;
