import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const AccountList = () => {
    const [accounts, setAccounts] = useState([])
    //useEffect to handle error
    useEffect(() =>{
        const fetchAllAccount = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/user")
                setAccounts(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllAccount()
    }, [])

  return (
    <div>
      <h1>Account List</h1>
      <div className="accounts">
        {accounts.map(Account=>(
            <div className="account" key={Account.userID}>
                
                <h2>{Account.username}</h2>
                <h2>{Account.password}</h2>
                <p>{Account.userFirstname} {Account.userLastname}</p>
                <p>{Account.userGender}</p>
                <p>{Account.useAddress}</p>
                <h2>{Account.accountStatus} {Account.userEmail}</h2>
                <h2>{Account.accountType}</h2>
            
            </div>
        ))}
      </div>
      <button>
        <Link to='/add'>Add account</Link>
        </button>
    </div>
  )
}

export default AccountList
