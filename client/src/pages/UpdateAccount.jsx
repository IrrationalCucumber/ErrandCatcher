import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import '../style.css'

const UpdateAccount = () => {
    const [account,setAccount] = useState({
        username:"",
        password:"",
        lname:"",
        fname:"",
        gender:"",
        email:"",
        contact:"",
        age:"",
        bday:"",
        address:"",
       // desc:"",
        type:"",
        dateCreated:"",
       // profileImage:"",
    })

    const navigate = useNavigate()
    const location = useLocation()

    const userID = location.pathname.split("/")[2]
    //pathname to array from
    //get the id
    console.log(location.pathname.split("/")[2])


    const handleChange = (e) => {
      // For the 'gender' field, directly set the value without using spread syntax
      if (e.target.name === 'gender') {
        setAccount((prev) => ({ ...prev, gender: e.target.value }));
      }
      else if(e.target.name === 'type'){
        setAccount((prev) => ({...prev, type: e.target.value}));
      }
      else {
        // For other fields, use spread syntax as before
        setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      }
    };
    
    //pre-fill the fields
    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/user/${userID}`);
                const retrievedAccount = res.data[0];

                // Update the state with retrieved account data
                setAccount({
                    username: retrievedAccount.username,
                    password: retrievedAccount.password,
                    lname: retrievedAccount.userLastname,
                    fname: retrievedAccount.userFirstname,
                    gender: retrievedAccount.userGender,
                    email: retrievedAccount.userEmail,
                    contact: retrievedAccount.userContactNum,
                    age: retrievedAccount.userAge,
                    bday: retrievedAccount.userBirthday,
                    address: retrievedAccount.userAddress,
                    type: retrievedAccount.accountType,
                    dateCreated: retrievedAccount.dateCreated,
                });
            } catch (err) {
                console.log(err);
            }
        };

        fetchAccount();
    }, [userID]);



    //save the data into db
    const handleClick = async e =>{
        //const updatedAccount = { ...account };
        //refresh the page when button is clicked
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/update-account/"+ userID, account)
            navigate("/accounts")
        }catch(err){
            console.log(err)
        }
    }
    //verify
    const handleV = async e =>{
        //const updatedAccount = { ...account };
        //refresh the page when button is clicked
        e.preventDefault()
        try{
            await axios.put(`http://localhost:8800/verify-account/${userID}`)
            navigate("/accounts")
        }catch(err){
            console.log(err)
        }
    }
    //Deactivate
    const handleDA = async e =>{
        //const updatedAccount = { ...account };
        //refresh the page when button is clicked
        e.preventDefault()
        try{
            await axios.put(`http://localhost:8800/deactivate-account/${userID}`)
            navigate("/accounts")
        }catch(err){
            console.log(err)
        }
    }

    console.log(account)
  return (
    <div className='form'>
      <nav>
        <Link to='/accounts'>
          BACK 
        </Link>
        <Link to='/'> HOME</Link>
      </nav>
      <h1>Update NEW ACCOUNT</h1>
      <input type="text" value={account.username} placeholder='username' onChange={handleChange} name='username'/>
      <input type="text" value={account.password} placeholder='password' onChange={handleChange} name='password'/>
      <input type="text" value={account.fname} placeholder='first name' onChange={handleChange} name='fname'/>
      <input type="text" value={account.lname} placeholder='last name' onChange={handleChange} name='lname'/>
      <label htmlFor="">
        Gender
        <select name='gender' onChange={handleChange} value={account.gender}>
          <option value="">Choose gender....</option>
          <option value="male" >Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <input type="text" value={account.contact} placeholder='contact number' onChange={handleChange} name='contact'/>
      <input type="number" value={account.age} placeholder='Age' onChange={handleChange} name='age'/>
      
      <input type="email" value={account.email} placeholder='Email address' onChange={handleChange} name='email'/>
      <input type="text" value={account.address} placeholder='Address' onChange={handleChange} name='address'/>

      <button className='formButton' onClick={handleClick}>Update</button>
      <button className='formButton' onClick={handleDA}>Deactivate</button>
      <button className='formButton' onClick={handleV}>Verify</button>
    </div>
  )
}

export default UpdateAccount
/**
 *      <input type="text" placeholder='first name' onChange={handleChange} name='fname'/>
      <input type="text" placeholder='last name' onChange={handleChange} name='lname'/>
      <input type="text" placeholder='email' onChange={handleChange} name='email'/>
      <input type="text" placeholder='gender' onChange={handleChange} name='gender'/>

      <input type="text" placeholder='Account type' onChange={handleChange} name='type'/>
 */