import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/AdminNavbar.js'
import "./CommissionList.css"

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
          <div className="commission">
            <table>
            <thead>
              <tr>
                <th className='colu1'>ID</th>
                <th className='colu2'>Title</th>
                <th className='colu3'>Employer</th>
                <th className='colu4'>Type</th>
                <th className='colu5'>Commission Pay</th>
                <th className='colu6'>Date Posted</th>
                <th className='colu7'>Date Completed</th>
                <th className='colu8'>Status</th>
                <th className='colu9'></th>
              </tr>
            </thead>
            <tbody>
              {commissions.map(Commission=>(
            <tr className="commission" key={Commission.commissionID}>
                
                <td className='colu1'>{Commission.commissionID}</td>
                <td className='colu2'>{Commission.commissionTitle}</td>
                <td className='colu3'>{Commission.employerID}</td>
                <td className='colu4'>{Commission.commissionType}</td>
                <td className='colu5'>{Commission.commissionPay}</td>
                <td className='colu6'>{Commission.DatePosted}</td>
                <td className='colu7'>{Commission.DateCompleted}</td>
                <td className='colu8'>{Commission.commissionStatus}</td>
                <td><button onClick={()=>handleDelete(Commission.commissionID)}>DELETE</button>
                <button className='update'><Link to={`/update-commission/${Commission.commissionID}`}>View</Link></button></td>
            </tr>
        ))}
            </tbody>
            </table>
          </div> 
      </div>
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