import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/Navbar.js'
//import "./ash-buttton.css"

const CommissionList = () => {
    const [commissions, setCommissions] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selStatus, setSelStatus] = useState('');
    //handle error
    //rretrieve data
    useEffect(() =>{
        const fetchAllCommission = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/commission")
                //"http://localhost:8800/commission" - local computer
                //"http://192.168.1.47:8800/commission" - netwrok
                setCommissions(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllCommission()
    }, [])

    //fetch all accounts
    //triggers when search input is filled
    const fetchSearchResults = async () => {
      try {
                //"http://localhost:8800/commission" - local computer
                //"http://192.168.1.47:8800/commission" - netwrok
          const res = await axios.get('http://localhost:8800/search-commission', {
              params: { term: searchTerm } // Pass the search term as a query parameter
          });
          setCommissions(res.data);
      } catch (err) {
          console.log(err);
      }
  };
  
  useEffect(() => {
      fetchSearchResults();
  }, [searchTerm]); // Trigger the search whenever searchTerm changes

    //funtion to delete commission
    const handleDelete = async (commissionID) =>{
      try {
            //"http://localhost:8800/commission" - local computer
            //"http://192.168.1.47:8800/commission" - netwrok
        await axios.delete(`http://localhost:8800/commission/${commissionID}`)
        window.location.reload()
      } catch (err) {
        console.log(err)
      }
    }
    //need front end
  return (
    <div>
      <NavBar />
      <h1>Commission List</h1>
      <div className="commissions">
          <div className='search'>
              <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type='submit' >
                <i className='fa fa-search'></i>
              </button>
          </div>
          <thead>
              <tr>
                <th className='col1'>ID</th>
                <th className='col2'>Title</th>
                <th className='col3'>Employer</th>
                <th className='col4'>Type</th>
                <th className='col5'>Commission Pay</th>
                <th className='col6'>Date Posted</th>
                <th className='col7'>Date Completed</th>
                <th className='col8'>Status</th>
              </tr>
            </thead>
            <tbody>
              {commissions.map(Commission=>(
            <tr className="commission" key={Commission.commissionID}>
                
                <td>{Commission.commissionID}</td>
                <td>{Commission.commissionTitle}</td>
                <td>{Commission.employerID}</td>
                <td>{Commission.commissionType}</td>
                <td>{Commission.commissionPay}</td>
                <td>{new Date(Commission.DatePosted).toLocaleDateString()}</td>
                <td>{new Date(Commission.DateCompleted).toLocaleDateString()}</td>
                <td>{Commission.commissionStatus}</td>
                <button onClick={()=>handleDelete(Commission.commissionID)}>DELETE</button>
                <button className='update'><Link to={`/update-commission/${Commission.commissionID}`}>View</Link></button>
            </tr>
        ))}
            </tbody>
        
      </div>
      <button>
        <Link to='/post-commission'>Add Commission</Link>
        </button>
    </div>
  )
}

export default CommissionList

// //<div className='search'>
// <input
// type='text'
// placeholder='Search...'
// value={searchTerm}
// onChange={(e) => setSearchTerm(e.target.value)}
// />
// <button type='submit' onClick={fetchSearchResults}>
// <i className='fa fa-search'></i>
// </button>
// </div>