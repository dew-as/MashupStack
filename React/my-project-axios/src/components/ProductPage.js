import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
import checkAuth from './auth/checkAuth';
import axiosConfig from '../axiosConfig'

const ProductPage = () => {
  const params = useParams();
  const navigate = useNavigate()
  const [product, setProduct] = useState([])

  const handleDelete = async (id) => {
    try {
      const result = await axiosConfig.delete('/store/confirmDelete/' + params.id)
      console.log(result.data)
      navigate('/productsList')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const result = await axiosConfig.get('/store/productId/' + params.id)
        console.log(result.data)
        setProduct(result.data.item)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div>
      <Header />
      <div className="container" style={{marginTop:'80px'}}>
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{product.price}</h6>
            <p className="card-text">{product.description}</p>
            <Link
              to={`/productForm/${params.id}`}
              className="btn btn-primary mr-2"
            >
              Edit
            </Link>
            <button
              className="btn btn-danger"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Delete
            </button>
          </div>
        </div>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Confirm Deletion</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => handleDelete(params.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default checkAuth(ProductPage);
