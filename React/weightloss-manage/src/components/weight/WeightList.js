import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import WeightItem from './WeightItem';
import ReactPaginate from 'react-paginate';

const WeightList = () => {
    const weights = useSelector((state) => state.weight.weights); // Access weights from Redux store
    const [currentPage, setCurrentPage] = useState(0);
    const weightsPerPage = 1;
    const pageCount = Math.ceil(weights.length / weightsPerPage);
    console.log(weights);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Weight Tracker</h2>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Date</th>
                        <th>Weight (kg)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {weights.slice(currentPage * weightsPerPage, (currentPage + 1) * weightsPerPage).map((weight) => (
                        <WeightItem key={weight.id} weight={weight} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-center mt-4">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={5}
                    pageCount={weights.length}
                    previousLabel="<"
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    activeClassName="active"
                />
            </div>
        </div>
    );
};

export default WeightList;
