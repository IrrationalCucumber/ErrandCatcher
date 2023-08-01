import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddAccount = () => {
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
    // const formatDate = (dateString) => {
    //     // Input date format: MM/DD/YYYY
    //     const [month, day, year] = dateString.split('/');
    //     // Output date format: YYYY-MM-DD
    //     return `${year}-${month}-${day}`;
    //   };
      //get current date
      
    //   const getCurrentDate = () => {
    //     const currentDate = new Date();
    //     const year = currentDate.getFullYear();
    //     const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    //     const day = String(currentDate.getDate()).padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    //   };

    const navigate = useNavigate()

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
    
    


    //save the data into db
    const handleClick = async e =>{
        //const updatedAccount = { ...account };
        //refresh the page when button is clicked
        e.preventDefault()
        try{
            //account.dateCreated = getCurrentDate();
            await(axios.post('http://localhost:8800/user', account))
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    console.log(account)
  return (
    <div className='from'>
      <h1>ADD NEW ACCOUNT</h1>
      <input type="text" placeholder='username' onChange={handleChange} name='username'/>
      <input type="text" placeholder='password' onChange={handleChange} name='password'/>
      <input type="text" placeholder='first name' onChange={handleChange} name='fname'/>
      <input type="text" placeholder='last name' onChange={handleChange} name='lname'/>
      <label htmlFor="">
        Gender
        <select name='gender' onChange={handleChange} value={account.gender}>
          <option value="">Choose gender....</option>
          <option value="male" >Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <input type="text" placeholder='contact number' onChange={handleChange} name='contact'/>
      <input type="number" placeholder='Age' onChange={handleChange} name='age'/>
      
      <input type="email" placeholder='Email address' onChange={handleChange} name='email'/>
      <input type="text" placeholder='Address' onChange={handleChange} name='address'/>
      

      <select name='type' onChange={handleChange} value={account.type}>
        <option value="">Choose Type</option>
        <option vlaue="Employer">Employer</option>
        <option value="Catcher">Catcher</option>
      </select>

      <button onClick={handleClick}>Add Account</button>
    </div>
  )
}

export default AddAccount
/**
 *      <input type="text" placeholder='first name' onChange={handleChange} name='fname'/>
      <input type="text" placeholder='last name' onChange={handleChange} name='lname'/>
      <input type="text" placeholder='email' onChange={handleChange} name='email'/>
      <input type="text" placeholder='gender' onChange={handleChange} name='gender'/>

      <input type="text" placeholder='Account type' onChange={handleChange} name='type'/>
 */