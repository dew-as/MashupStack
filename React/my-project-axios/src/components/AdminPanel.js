// AdminPanel.js
import React from 'react';
import checkAuth from './auth/checkAuth';
import Header from './Header';

const AdminPanel = () => {
    return (
        <div>
            <Header />
            <div className="container-fluid" style={{ marginTop: '80px' }}>
                <div className="row">
                    {/* Sidebar */}
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">
                                        Dashboard
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Users
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Settings
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Dashboard</h1>
                        </div>

                        {/* Content can go here */}
                        <div className="content">
                            <p>Welcome to the admin panel!</p>
                            {/* Add more sections here */}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default checkAuth(AdminPanel);