//deals on the page control, data is being displayed and change to other page
//itemsPerPage items displayed per page
//totalItems total number of items in the list
//added by ash

//03-05-24 styling of the pagination is updated
import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav style={{display: 'flex', justifyContent: 'center'}}>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button onClick={() => paginate(number)} 
                        className='page-link'
                        style={{borderRadius: '30px', margin: '10px'}}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;
