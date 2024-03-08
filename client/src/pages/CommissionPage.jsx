// Catcher side
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import './commissionpage.css';

function CommissionPage() {
  const headers = ['DATE', 'EMPLOYER', 'ERRAND TITLE', 'STATUS'];
  const [commission, setCommission] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = commission.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Navbar
        page1="HOME"
        home={`/c-home`}
        page2="APPLICATION"
        //Application={`/`}
        page3="COMMISSIONS"
        Commission={`/commission-page`}
      />
      <div className='Commission-page-container'>
        <div className='Commission-page'> {/* Apply Commission-page class here */}
          <h1>Commission</h1>
          <Table
            headers={headers}
            data={currentItems.map((commissionItem, rowIndex) => (
              <tr key={rowIndex}>
                {commissionItem.map((cellData, cellIndex) => (
                  <td key={cellIndex}>{cellData}</td>
                ))}
              </tr>
            ))}
          />
        </div>
      </div>
      {/* Pagination controls */}
      {commission.length > 0 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={commission.length}
          paginate={paginate}
        />
      )}
    </div>
  );
}

export default CommissionPage;
