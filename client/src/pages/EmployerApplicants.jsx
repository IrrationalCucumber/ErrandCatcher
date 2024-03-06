//intended to see the catchers who applied for the errand posted by the employer
//03-06-24 updated the applicant page for employer --ash
//03-06-24 added pagination and table. logic and contents are only modifed --ash


import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/Navbar'
import Table from '../components/Table'
import './applicant.css';
import Pagination from '../components/Pagination'

const headers = ['DATE', 'CATCHER', 'ERRAND TITLE', 'ACTION'];


const EmployerApplicants = () => {
    const location = useLocation();
    //pathname to array from
    //get the id
    const userID = location.pathname.split("/")[2];
    //const [searchTerm, setSearchTerm] = useState('');
    const [applicants, setApplicants] = useState([])
    //Pagination
    //current page state --Ash
    const [currentPage, setCurrentPage] = useState(1);
    //Pagination --Ash
    //display data per page
    const [itemsPerPage] = useState(10);


    //useEffect to handle error
    useEffect(() =>{
        const fetchAllAccount = async ()=>{
            try{
                const res = await axios.get(`http://localhost:8800/applicants/${userID}`)
                //http://localhost:8800/user - local
                //http://192.168.1.47:8800/user - network
                setApplicants(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllAccount()
    }, [userID]);
    //fetch all accounts
    //triggers when search input is filled
//     const fetchSearchResults = async () => {
//       try {
//             //http://localhost:8800/user - local
//             //http://192.168.1.47:8800/user - network
//           const res = await axios.get('http://localhost:8800/search-user', {
//               params: { term: searchTerm } // Pass the search term as a query parameter
//           });
//           setApplicants(res.data);
//       } catch (err) {
//           console.log(err);
//       }
//   };
//   useEffect(() => {
//       fetchSearchResults();
//   }, [searchTerm]); // Trigger the search whenever searchTerm changes
        
//list need to be in a column
//need filter

    // Pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastItem = currentPage + itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = applicants.slice(indexOfFirstItem, indexOfLastItem);
 
  return (
    <div>
      <NavBar
        page1="HOME"
        home={`/e-home/${userID}`}
        page2="COMMISSIONS"
        commissionList={`/commissions/${userID}`}
        page3="APPLICANTS"
        applicants={`/applicants/${userID}`}
        map={`/map/${userID}`}
        button="SIGN OUT"
      />
      <div className='applicants'>
      <h1>APPLICANTS</h1>
      <div className='search'>
          <input
              type='text'
              placeholder='Search...'  
          />
          <button type='submit'>
              <i className='fa fa-search' place></i>
          </button>
          {/*<select name="type" id="">
            <option value=""></option>
            <option value="employer">Employer</option>
            <option value="catcher">Catcher</option>
            <option value="admin">Admin</option>
          </select>
          <select name="status" id="">
            <option value=""></option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
            <option value="Suspended">Suspended</option>
          </select>*/}
      </div>
      
        <Table headers={headers} data={currentItems.map(applicant => {
          const actions = applicant.map((action, cellIndex) => {
            if (cellIndex === 3) {
              return (
                <button key={cellIndex} className="action-btn">
                  {action === 'Accept' && 'Accept'}
                  {action === 'Decline' && 'Decline'}
                </button>
              );
            }
            return <td key={cellIndex}>{action}</td>;
          });
          return <tr>{actions}</tr>;
        })} />
                  {/* Pagination controls */}
                  {applicants.length > 0 && (
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={applicants.length}
                    paginate={paginate}
                />
            )}
      </div>
      </div>
  )
}

export default EmployerApplicants
{/*
        <div className="accounts">
          <table>
            <thead>
              <tr>
                <th className='col1'>Commission</th>
                <th className='col2'>Commission ID</th>
                <th className='col3'>Catcher</th>
                <th className='col4'>Email</th>
                <th className='col5'>Contact Number</th>
                <th className='col6'>Date Applied</th>
                <th className='col7'>Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map(Applicant=>(
                    <tr className="account" key={Applicant.applicationID}>
                        <td className='col1'>{Applicant.commissionTitle}</td>
                        <td className='col2'>{Applicant.commissionID}</td>
                        <td className='col3'><Link to={`/update-account/${Applicant.catcherID}`}>{Applicant.userFirstname} {Applicant.userLastname}</Link></td>
                        <td className='col4'>{Applicant.userEmail}</td>
                        <td className='col5'>{Applicant.userContactNum}</td>
                        <td className='col6'>{new Date(Applicant.applicationDate).toLocaleDateString()}</td>
                        <td className='col7'>{Applicant.applicationStatus}</td>
                        <td><button className='update'><Link to={`/update-account/${Applicant.catcherID}`}>Update</Link></button></td>
                    </tr>
                    ))}
            </tbody>
          </table>
      </div>
*/}