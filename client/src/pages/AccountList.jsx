import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/Navbar'
import './accountlist.css';

const AccountList = () => {
    const [accounts, setAccounts] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    //useEffect to handle error
    useEffect(() =>{
        const fetchAllAccount = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/user")
                //http://localhost:8800/user - local
                //http://192.168.1.47:8800/user - network
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
          console.log("Search Term:", searchTerm);
          console.log("Selected Type:", selectedType);
          console.log("Selected Status:", selectedStatus);
            //http://localhost:8800/user - local
            //http://192.168.1.47:8800/user - network
          const res = await axios.get('http://localhost:8800/search-user', {
            params: {
              accountType: selectedType,
              term: searchTerm,
              //type: selectedType,
              accountStatus: selectedStatus
          }  // Pass the search term as a query parameter
          });
          setAccounts(res.data);
      } catch (err) {
          console.log(err);
      }
  };
  
  useEffect(() => {
    fetchSearchResults();
}, [searchTerm, selectedType, selectedStatus]);
 // Trigger the search whenever searchTerm changes

        
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
              <i className='fa fa-search' place></i>
          </button>

          <select name="type" value={selectedType} onChange={(e) => {
            console.log('Selected Type:', e.target.value);
            setSelectedType(e.target.value);
            }}>
            <option value=""></option>
            <option value="Employer">employer</option>
            <option value="Catcher">Catcher</option>
            <option value="admin">Admin</option>
          </select>
          <select name="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value=""></option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
            <option value="Suspended">Suspended</option>
          </select>
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
              {console.log("Filtered Accounts:", accounts)}
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
