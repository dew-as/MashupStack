import React from 'react';
import Header from '../Header';

function Aboutus() {
    return (
        <div>
            <Header />
            <section className="container mt-5">
                <h1 className="text-center mb-4">About Us</h1>

                <div className="row">
                    <div className="col-lg-6">
                        <img
                            src="image-url" // Replace with the actual image URL
                            alt="About Us"
                            className="img-fluid mb-4"
                        />
                    </div>
                    <div className="col-lg-6">
                        <h2>Our Story</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                            amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis
                            natoque penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                            amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis
                            natoque penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus.
                        </p>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-lg-6">
                        <h2>Our Mission</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                            amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis
                            natoque penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus.
                        </p>
                        <ul>
                            <li>Provide high-quality laptops and accessories</li>
                            <li>Offer competitive pricing and promotions</li>
                            <li>Deliver exceptional customer service</li>
                        </ul>
                    </div>

                    <div className="col-lg-6">
                        <h2>Our Values</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                            amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis
                            natoque penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus.
                        </p>
                        <ul>
                            <li>Innovation</li>
                            <li>Customer Satisfaction</li>
                            <li>Teamwork</li>
                        </ul>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-lg-12">
                        <h2>Meet Our Team</h2>
                        <div className="row">
                            <div className="col-lg-3">
                                <img
                                    src="image-url" // Replace with actual image URL
                                    alt="Team Member 1"
                                    className="img-fluid mb-4"
                                />
                                <h3>John Doe</h3>
                                <p>CEO</p>
                            </div>

                            <div className="col-lg-3">
                                <img
                                    src="image-url" // Replace with actual image URL
                                    alt="Team Member 2"
                                    className="img-fluid mb-4"
                                />
                                <h3>Jane Doe</h3>
                                <p>Marketing Manager</p>
                            </div>

                            <div className="col-lg-3">
                                <img
                                    src="image-url" // Replace with actual image URL
                                    alt="Team Member 3"
                                    className="img-fluid mb-4"
                                />
                                <h3>Bob Smith</h3>
                                <p>Sales Manager</p>
                            </div>

                            <div className="col-lg-3">
                                <img
                                    src="image-url" // Replace with actual image URL
                                    alt="Team Member 4"
                                    className="img-fluid mb-4"
                                />
                                <h3>Alice Johnson</h3>
                                <p>Customer Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Aboutus;