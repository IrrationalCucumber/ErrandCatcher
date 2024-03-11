import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/Navbar'
import './accountlist.css';
import Pagination from '../components/Pagination';
import Table from '../components/Table';


const AccountList = () => {
    const [accounts, setAccounts] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');

    //pagination --Ash
    const [currentPage, setCurrentPage] = useState(1);
    
    //Pagination --Ash
    //display data per page
    const [itemsPerPage] = useState(10);

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
            //http://localhost:8800/user - local
            //http://192.168.1.47:8800/user - network
          const res = await axios.get('http://localhost:8800/search-user', {
              params: { term: searchTerm, type: type, status: status} // Pass the search term as a query parameter
          });
          setAccounts(res.data);
      } catch (err) {
          console.log(err);
      }
  };
  
  useEffect(() => {
      fetchSearchResults();
  }, [searchTerm, type, status]); // Trigger the search whenever searchTerm changes
  
  // // filter type // 
  // const fetchType = async () => {
  //   try{
  //     const res = await axios.get('http://localhost:8800/filter-type', {
  //       params: { type: type, status: status } // Pass the search term as a query parameter
  //   });
  //     setAccounts(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchType(); 
  // }, [type, status]); // reflect changes

  //Logic of Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = accounts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const headers = ['ID', 'Username', 'Name', 'Email', 'Type', 'Date Created', 'Status'];
  const accountData = currentAccounts.map(account => ([
      account.userID,
      account.username,
      `${account.userFirstname} ${account.userLastname}`,
      account.userEmail,
      account.accountType,
      new Date(account.dateCreated).toLocaleDateString(),
      account.accountStatus
  ]));
        
//list need to be in a column
//need filter
  return (
    <div>
      <NavBar
        page1="HOME"
        home={`/admin-home`}
        // {`admin-home/${userID}`}
        page2="ACCOUNTS"
        commissionList={`/accounts`}
        page3="COMMISSIONS"
        applicants={`/commission-list`}
        pageButton='/sign-in'
        button='SIGN OUT'
      />
      
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
          <select name="type" onChange={(e) => setType(e.target.value)} value={type}>
            <option value="">Type</option>
            <option value="Employer">employer</option>
            <option value="Catcher">Catcher</option>
            <option value="admin">Admin</option>
          </select>
          <select name="status" onChange={(e) => setStatus(e.target.value)} value={status}  id="">
            <option value="">Status</option>
            <option value="Verified">Verified</option>
            <option value="Unverified">Unverified</option>
            <option value="Suspended">Suspended</option>
          </select>
      </div>
      <div className="accounts">
      {/*table*/}
      <Table headers={headers} data={accountData} />
      
      <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={accounts.length}
                    paginate={paginate}
                />
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