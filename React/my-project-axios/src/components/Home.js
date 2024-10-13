import React from 'react';
import Footer from './Footer';
import Header from './Header';
import checkAuth from './auth/checkAuth';

function App() {
    return (
        <div>
            <Header />
            <div className="container" style={{marginTop:'80px'}}>
                <h2 className="text-secondary text-center mt-4">Home</h2>
                <div className="mx-auto" style={{ width: '700px', height: '300px' }}>
                    <div id="demo1" className="carousel slide mt-3" data-ride="carousel">
                        <ul className="carousel-indicators">
                            <li data-target="#demo1" data-slide-to="0" className="active"></li>
                            <li data-target="#demo1" data-slide-to="1"></li>
                            <li data-target="#demo1" data-slide-to="2"></li>
                            <li data-target="#demo1" data-slide-to="3"></li>
                            <li data-target="#demo1" data-slide-to="4"></li>
                            <li data-target="#demo1" data-slide-to="5"></li>
                        </ul>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img
                                    src="https://cdn.mos.cms.futurecdn.net/PZtqJj8yTeTYnw3WMjdomF.jpg"
                                    alt="Dell XPS 13"
                                    width="700"
                                    height="300"
                                />
                                <div className="carousel-caption">
                                    <h1 className="text-white">Dell XPS 13</h1>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://media.wired.com/photos/65ea34d70264b0ad869cbc18/master/w_2560%2Cc_limit/MacBook-Air-M3-Review-Featured-Gear.jpg"
                                    alt="MacBook Air"
                                    width="700"
                                    height="300"
                                />
                                <div className="carousel-caption">
                                    <h1 className="text-white">MacBook Air</h1>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://static1.xdaimages.com/wordpress/wp-content/uploads/2022/11/HP-Envy-x360-13-10-16.jpg"
                                    alt="HP Envy x360"
                                    width="700"
                                    height="300"
                                />
                                <div className="carousel-caption">
                                    <h1 className="text-white">HP Envy x360</h1>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://cdn.arstechnica.net/wp-content/uploads/2023/06/IMG_1204.jpeg"
                                    alt="Lenovo ThinkPad X1 Carbon"
                                    width="700"
                                    height="300"
                                />
                                <div className="carousel-caption">
                                    <h1 className="text-white">Lenovo ThinkPad X1 Carbon</h1>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://i.pcmag.com/imagery/reviews/075bmVhnXs6BUHpdXkVt9xo-1.fit_lim.size_1050x591.v1708616444.jpg"
                                    alt="Asus ZenBook 14"
                                    width="700"
                                    height="300"
                                />
                                <div className="carousel-caption">
                                    <h1 className="text-white">Asus ZenBook 14</h1>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://cdn.mos.cms.futurecdn.net/sLjPJgQiYLxmJuLfUwrEed-1200-80.jpg"
                                    alt="Microsoft Surface Laptop 3"
                                    width="700"
                                    height="300"
                                />
                                <div className="carousel-caption">
                                    <h1 className="text-white">Microsoft Surface Laptop 3</h1>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#demo1" data-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a className="carousel-control-next" href="#demo1" data-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </a>
                    </div>
                </div>

                {/* Gallery */}
                <div className="row mt-5 container mx-auto">
                    <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                        <img
                            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1708367688034"
                            className="w-100 shadow-1-strong rounded mb-4"
                            alt="Apple MacBook Air"
                            title="Apple MacBook Air"
                        />
                        <img
                            src="https://www.reliancedigital.in/medias/Dell-Inspiron-7430-Laptop-494352174-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3w1MjE5OXxpbWFnZS9qcGVnfGltYWdlcy9oOWMvaGYwLzEwMTA1MjA2MDQ2NzUwLmpwZ3xhNDA4ZWI5ZTM2MGExOTVlMmU0ZDBmMGVjNGU1MDQwZWYyYzY3ZDg5MzM2ZGY0NWNmM2U2NTFjYjliMTEwODZh"
                            className="w-100 shadow-1-strong rounded mb-4"
                            alt="Dell Inspiron Laptop"
                            title="Dell Inspiron Laptop"
                        />
                    </div>
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStwdpKR8bCf2G7aXIkjV63v4txcxCeljHLbQ&s"
                            className="w-100 shadow-1-strong rounded mb-4"
                            alt="HP Envy Laptop"
                            title="HP Envy Laptop"
                        />
                        <img
                            src="https://news.lenovo.com/wp-content/uploads/2024/02/15_ThinkPad_X12_Detachable_Tour_flying-e1708723555763-1024x474.png"
                            className="w-100 shadow-1-strong rounded mb-4"
                            alt="Lenovo ThinkPad Laptop"
                            title="Lenovo ThinkPad Laptop"
                        />
                    </div>
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <img
                            src="https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_14-16-inch_10182021_big.jpg.slideshow-large_2x.jpg"
                            className="w-100 shadow-1-strong rounded mb-4"
                            alt="Apple MacBook Pro"
                            title="Apple MacBook Pro"
                        />
                        <img
                            src="https://5.imimg.com/data5/SELLER/Default/2022/9/ZO/SI/TO/160219032/asus-zenbook-pro-14-duo-dual-screen-laptop-12th-gen-core-i5-16-gb-ram-512-gb-ssd-14-5-inch-500x500.jpg"
                            className="w-100 shadow-1-strong rounded mb-4"
                            alt="Asus ZenBook Laptop"
                            title="Apple MacBook Air"
                        />
                    </div>
                </div>
                {/* End of Gallery */}
            </div>
            <Footer />
        </div>
    );
};

export default App;