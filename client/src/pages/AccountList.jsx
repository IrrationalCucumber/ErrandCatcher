import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/Navbar'
import './accountlist.css';

const AccountList = () => {
    const [accounts, setAccounts] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
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
    //fetch all accounts
    //triggers when search input is filled
    const fetchSearchResults = async () => {
      try {
          const res = await axios.get('http://192.168.1.47:8800/search-user', {
              params: { term: searchTerm } // Pass the search term as a query parameter
          });
          setAccounts(res.data);
      } catch (err) {
          console.log(err);
      }
  };
  
  useEffect(() => {
      fetchSearchResults();
  }, [searchTerm]); // Trigger the search whenever searchTerm changes
        
//list need to be in a column
//need filter
  return (
    <div>
      <NavBar></NavBar>
      <h1>Account List</h1>
      <div className='search'>
          <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit' onClick={fetchSearchResults}>
              <i className='fa fa-search'></i>
          </button>
      </div>
      <div className="accounts">
          <table>
            <thead>
              <tr>
                <th className='col1'>ID</th>
                <th className='col2'>Username</th>
                <th className='col3'>Name</th>
                <th className='col4'>Email</th>
                <th className='col5'>Type</th>
                <th className='col6'>Date Created</th>
                <th className='col7'>Status</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(Account=>(
                    <tr className="account" key={Account.userID}>
                        <td className='col1'>{Account.userID}</td>
                        <td className='col2'>{Account.username}</td>
                        <td className='col3'>{Account.userFirstname} {Account.userLastname}</td>
                        <td className='col4'>{Account.userEmail}</td>
                        <td className='col5'>{Account.accountType}</td>
                        <td className='col6'>{new Date(Account.dateCreated).toLocaleDateString()}</td>
                        <td className='col7'>{Account.accountStatus}</td>
                    </tr>
                    ))}
            </tbody>
          </table>
      </div>
      <button>
        <Link to='/add'>Add account</Link>
        </button>
    </div>
  )
}

export default AccountList
//{Account.profileImage && <img src={Account.profileImage} alt=''/>}

// {/* <p>{Account.userID}</p> 
//                 <p>{Account.username} {Account.password}</p>
//                 <p>{Account.userFirstname} {Account.userLastname}</p>
//                 <p>{Account.userGender}</p>
//                 <p>{Account.useAddress}</p>
//                 <p>{Account.accountStatus} {Account.userEmail}</p>
//                 <p>{Account.accountType} {new Date(Account.dateCreated).toLocaleDateString()}</p>
//                 <button>Delete</button> */}
//----------------------------------------------------------
// {accounts.map(Account=>(
//   <div className="account" key={Account.userID}>
//       <td className='userid'>{Account.userID}</td>
//       <td className='username'>{Account.username}</td>
//       <td className='firstname'>{Account.userFirstname}</td>
//       <td className='lastname'>{Account.userLastname}</td>
//       <td className='Status'>{Account.accountStatus}</td>
//       <td className='type'>{Account.accountType}</td>
//       <td className='date'>{new Date(Account.dateCreated).toLocaleDateString()}</td>
//   </div>
// ))}

// const handleChange = async (username) =>{
//   try {
//     await axios.get(`http://192.168.1.47:8800/search-user/${username}`)
//     window.location.reload()
//   } catch (err) {
//     console.log(err)
//   }
// }