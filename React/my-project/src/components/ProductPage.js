import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
  const params = useParams();
  const navigate = useNavigate()

  const handleDelete = (id) => {
    navigate('/productsList')
    localStorage.setItem('deleteItemId', id)
  };

  return (
    <div className="container mt-5">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{params.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{params.price}</h6>
          <p className="card-text">{params.description}</p>
          <Link
            to={`/productForm/${params.name}/${params.price}/${params.description}/${params.id}`}
            className="btn btn-primary mr-2"
          >
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(params.id)}
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            Delete
          </button>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Confirm Deletion</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
