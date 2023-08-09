import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/Navbar.js'
//import "./ash-buttton.css"

const CommissionList = () => {
    const [commissions, setCommissions] = useState([])
    //handle error
    //rretrieve data
    useEffect(() =>{
        const fetchAllCommission = async ()=>{
            try{
                const res = await axios.get("http://192.168.1.47:8800/commission")
                setCommissions(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllCommission()
    }, [])

  return (
    <div>
      <NavBar />
      <h1>Commission List</h1>
      <div className="commissions">
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
