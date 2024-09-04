import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

const Table = ({ headers, data, onCellClick }) => {
  const handleCellClick = (rowIndex, cellIndex) => {
    if (onCellClick) {
      onCellClick(rowIndex, cellIndex);
    }
  };

  return (
    <table className="table table-hover">
      <thead className="thead-primary"> {/* Primary color header */}
        <tr className='table-primary'>
          {headers.map((header, index) => (
            <th key={index} scope="col">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} onClick={() => handleCellClick(rowIndex, cellIndex)}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

