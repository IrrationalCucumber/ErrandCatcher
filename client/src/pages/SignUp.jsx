import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './Error.css'

const SignUp = () => {
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
    //handle state of error message
    const [errorMessage, setErrorMessage] = useState('')
      
    //function for getting current date
    //triggers when  button clicked
       const getCurrentDate = () => {
         const currentDate = new Date();
         const year = currentDate.getFullYear();
         const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
         const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
       };

    //function to navigate pages
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
      //if fileds are empty
      //error message
      if (!account.username || !account.password || !account.email || !account.fname || !account.lname || !account.contact || !account.age || !account.bday || !account.gender || !account.type || !account.address) {
        setErrorMessage('Missing fields.Please try again.');
        return;
      }
  
        //const updatedAccount = { ...account };
        //refresh the page when button is clicked
        e.preventDefault()
        try{
            account.dateCreated = getCurrentDate();
            await(axios.post('http://localhost:8800/user', account))
            navigate("/accounts")
        }catch(err){
            console.log(err)
        }
    }

    console.log(account)
  return (
    <div className='container'>
    <input type='checkbox' id='flip' />
    <div className='cover'>
      <div className='front'>
      <img src="images/tawo.png" alt='' />
      </div>
      <div className='back'>
        <img className='ErrandCatcher' src="" alt=''/>
      </div>
    </div>
    <div>
        <div className='form-content'>
          <div>
            <div>Employer</div>
            <form action='#'>
              <div>
                <div>
                  
                  <input type='text' placeholder='Email Address' required /> 
                  <br />
                  <input type='text' placeholder='Username' required />
                  <br />
                  <input type='text' placeholder='First Name' />
                  <br />
                  <input type='text' placeholder='Last Name' />
                  <br />
                  <input type='text' placeholder='Birthday' />
                  <br />
                  <input
          type='number' // Use 'number' type for age input
          placeholder='Age'
          value={age} // Bind the value to the state variable
          onChange={handleAgeChange} // Handle changes to the input
        />
                  <br />
                  <input type='text' placeholder='Address' />
                  <br />
                  <input type='password' placeholder='Enter Password' required />
                  <br />
                  <input type='password' placeholder='Confirm Password' required />
                  <br />
                  <button>
                    <Link to='/Sign-in'>Submit</Link>
                  </button>
                  <div>
                    I am a <label htmlFor="flip">Catcher</label>
                    <p><i>Sign-in <Link to="/sign-in">here!</Link></i></p>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div>
            <div>Catcher</div>
            <form action='#'>
              <div>
                <div>
                  <input type='text' placeholder='Email Address' required />
                  <br />
                  <input type='text' placeholder='Username' required />
                  <br />
                  <input type='text' placeholder='First Name' />
                  <br />
                  <input type='text' placeholder='Last Name' />
                  <br />
                  <input type='number' placeholder='Age' />
                  <br />
                  <input type='text' placeholder='Address' />
                  <br />
                  <input type='password' placeholder='Enter Password' required />
                  <br />
                  <input type='password' placeholder='Confirm Password' required />
                  <br />
                  <button>
                    <Link to='/Sign-in'>Submit</Link>
                  </button>
                  <div>
                    Switch to <label htmlFor="flip">Employer</label>
                    <p><i>Sign-in <Link to="/sign-in">here!</Link></i></p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
/**
 *      <input type="text" placeholder='first name' onChange={handleChange} name='fname'/>
      <input type="text" placeholder='last name' onChange={handleChange} name='lname'/>
      <input type="text" placeholder='email' onChange={handleChange} name='email'/>
      <input type="text" placeholder='gender' onChange={handleChange} name='gender'/>

      <input type="text" placeholder='Account type' onChange={handleChange} name='type'/>
 */