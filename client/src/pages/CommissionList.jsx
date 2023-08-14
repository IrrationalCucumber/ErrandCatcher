import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/Navbar.js'
//import "./ash-buttton.css"

const CommissionList = () => {
    const [commissions, setCommissions] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
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
        {commissions.map(Commission=>(
            <div className="commission" key={Commission.commissionID}>
                
                <h2>{Commission.commissionTitle}</h2>
                <p>{Commission.commissionDeadline}</p>
                <p>{Commission.commissionLocation}</p>
                <p>{Commission.commissionType}</p>
                <p>{Commission.commissionDesc}</p>
                <p>{Commission.commissionPay}</p>
                <p>{Commission.commissionStatus}</p>
                <p>{Commission.DatePosted}</p>
                <p>{Commission.DateCompleted}</p>
                <p>{Commission.ContactNumber}</p>
                <button onClick={()=>handleDelete(Commission.commissionID)}>DELETE</button>
            </div>
        ))}
      </div>
      <button>
        <Link to='/post-commission'>Add Commission</Link>
        </button>

      <button className='delete'>Delete</button>
      <button className='update'>Update</button>
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