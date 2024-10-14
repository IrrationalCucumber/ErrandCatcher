//03-05-24 table.js is updated to make the td be onclick

import React from 'react';
//import './Table.css';
import './table.css';

const Table = ({ headers, data, onCellClick }) => {
  const handleCellClick = (rowIndex, cellIndex) => {
    if (onCellClick) {
      onCellClick(rowIndex, cellIndex);
    }
  };

  return (
    <>
      <div className="table-containerr">
        <table className='commissions-table'>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/*added onclick to the td */}
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} onClick={() => handleCellClick(rowIndex, cellIndex)}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
