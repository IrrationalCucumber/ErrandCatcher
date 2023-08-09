import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/Navbar'

const AccountList = () => {
    const [accounts, setAccounts] = useState([])
    //useEffect to handle error
    useEffect(() =>{
        const fetchAllAccount = async ()=>{
            try{
                const res = await axios.get("http://192.168.1.47:8800/user")
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
      <NavBar></NavBar>
      <h1>Account List</h1>
      <div className="accounts">
        {accounts.map(Account=>(
            <div className="account" key={Account.userID}>
                
                <h2>{Account.userID}</h2> 
                <p>{Account.username} {Account.password}</p>
                <p>{Account.userFirstname} {Account.userLastname}</p>
                <p>{Account.userGender}</p>
                <p>{Account.useAddress}</p>
                <p>{Account.accountStatus} {Account.userEmail}</p>
                <p>{Account.accountType} {new Date(Account.dateCreated).toLocaleDateString()}</p>
                
            
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
//{Account.profileImage && <img src={Account.profileImage} alt=''/>}