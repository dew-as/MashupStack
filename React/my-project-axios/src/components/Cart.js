import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, decreaseQnty, addItem, clearCart } from '../store/cartSlice';
import OutsideClickHandler from 'react-outside-click-handler';
import Footer from './Footer';
import Header from './Header';
import checkAuth from './auth/checkAuth';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQnty(item));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addItem(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <Header />
      <div
        id="cart-modal"
        className="bg-white border shadow-sm p-4 container-fluid"
        style={{ zIndex: 1, right: 0, marginTop: '80px' }}
      >
        <div id="cart-header" className="mb-4">
          <h2 className='text-center'>Cart</h2>
        </div>

        <div id="cart-body" className="overflow-auto">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="mb-4 border-bottom pb-2" key={item._id}>
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>
                      <Link to={`/productPage/${item._id}`}>{item.name}</Link>
                    </h5>
                    <h6
                      onClick={() => handleRemoveItem(item)}
                      className="text-danger ml-3 p-3"
                      style={{ cursor: 'pointer', marginLeft: '10px' }}
                    >
                      x
                    </h6>
                  </div>
                  <p className="d-flex justify-content-start align-items-center">
                    Quantity:{' '}
                    <i
                      className="ml-2 btn btn-primary py-0"
                      onClick={() => handleDecreaseQuantity(item)}
                    >
                      -
                    </i>{' '}
                    <h6 className="ml-2">{item.quantity}</h6>{' '}
                    <i
                      className="ml-2 btn btn-primary py-0"
                      onClick={() => handleIncreaseQuantity(item)}
                    >
                      +
                    </i>
                  </p>
                  <p>Price: <span className='text-primary'>{item.price}</span>₹</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h3>Your cart is empty</h3>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <button onClick={handleClearCart} className="btn btn-primary mt-2">
              Clear
            </button>
            <div
              id="cart-footer"
              className="d-flex justify-content-between align-items-center mt-4"
            >
              <h4>Total: {totalPrice}₹</h4>
              <Link to="/checkout" className="btn btn-primary" onClick={handleCheckout}>
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default checkAuth(Cart);