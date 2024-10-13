import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Aboutus() {
    return (
        <div>
            <Header />
            <section className="container" style={{marginTop:'80px'}}>
                <h1 className="text-center mb-4">About Us</h1>

                <div className="row">
                    <div className="col-lg-6">
                        <img
                            style={{ width: '400px', height: '200px' }}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVuXYeg8BmaRDeBBzzblL-C8RPVXEVi26zsw&s" // Replace with the actual image URL
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
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM6zZRIiqFzMe06aoWY91fEwQizqFe1AAFkQ&s" // Replace with actual image URL
                                    alt="Team Member 1"
                                    className="img-fluid mb-4"
                                    style={{ width: '300px', height: '300px' }}
                                />
                                <h3>John Doe</h3>
                                <p>CEO</p>
                            </div>

                            <div className="col-lg-3">
                                <img
                                    src="https://www.zmo.ai/wp-content/uploads/2023/11/ImgCreator.ai-realism-realistic-realphoto-photography-portrait-handsome-man-black-eyes-suit-hat-s.webp" // Replace with actual image URL
                                    alt="Team Member 2"
                                    className="img-fluid mb-4"
                                    style={{ width: '300px', height: '300px' }}
                                />
                                <h3>Jane Doe</h3>
                                <p>Marketing Manager</p>
                            </div>

                            <div className="col-lg-3">
                                <img
                                    src="https://preview.redd.it/qm2eo6qvlot51.jpg?width=1080&crop=smart&auto=webp&s=513e08770f2991d08fbcb622860ed084845ed0a9" // Replace with actual image URL
                                    alt="Team Member 3"
                                    className="img-fluid mb-4"
                                    style={{ width: '300px', height: '300px' }}
                                />
                                <h3>Bob Smith</h3>
                                <p>Sales Manager</p>
                            </div>

                            <div className="col-lg-3">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkISvAQKsjJZFcVduwQschj8Ur1c8y7TPj2kFC3fCBIfg4A0_BrjKZTFfNhZPRsnhDREc&usqp=CAU" // Replace with actual image URL
                                    alt="Team Member 4"
                                    className="img-fluid mb-4"
                                    style={{ width: '300px', height: '300px' }}
                                />
                                <h3>Alice Johnson</h3>
                                <p>Customer Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Aboutus;