import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const CommissionList = () => {
    const [commissions, setCommissions] = useState([])
    //handle error
    //rretrieve data
    useEffect(() =>{
        const fetchAllCommission = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/commission")
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
    </div>
  )
}

export default CommissionList
