//deals on the page control, data is being displayed and change to other page
//itemsPerPage items displayed per page
//totalItems total number of items in the list
//added by ash

//03-05-24 styling of the pagination is updated
import React from 'react';

const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation example" style={{ display: "flex", justifyContent: "center" }}>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${number === currentPage ? "active" : ""}`}>
              <button
                onClick={() => onPageChange(number)}
                className="page-link"
                
              >
                {number}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === pageNumbers.length ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
}

export default Pagination;
