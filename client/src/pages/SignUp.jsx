import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './SignUp.css';
import axios from 'axios'
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
            type:"Employer",
            dateCreated:"",
           // profileImage:"",
        })
        //resets when changing forms
        const resetForm = () => {
          setAccount({
            username: "",
            password: "",
            lname: "",
            fname: "",
            gender: "",
            email: "",
            contact: "",
            age: "",
            bday: "",
            address: "",
            type: "Employer", // Set the default type here
            dateCreated: "",
          });
        };
        
        //handle state of error message
        const [errorMessage, setErrorMessage] = useState('')
        //state for type checkbox
        const [isChecked, setIsChecked] = useState(false);
        //handle the state event
        const handleCheckboxChange = () => {
          setIsChecked(!isChecked); // Toggle the checkbox status
          setAccount((prevAccount) => ({
            ...prevAccount,
            type: isChecked ? 'Employer' : 'Catcher', // update type if checked/unchecked
          }));
        
          // Call resetForm to reset the form fields
          resetForm();
        };
        
        
          
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
          if (e.target.name === 'type') {
            if (isChecked) {
              // Checkbox is checked, store one value
              setAccount((prev) => ({ ...prev, type: 'Catcher' }));
            } else {
              // Checkbox is not checked, store another value
              setAccount((prev) => ({ ...prev, type: 'Employer' }));
            }
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
          // if (isChecked) {
          //   // Checkbox is checked, store one value
          //   account.type= 'Catcher'
          // } else {
          //   // Checkbox is not checked, store another value
          //   account.type= 'Emploeyer'
          // }
            //const updatedAccount = { ...account };
            //refresh the page when button is clicked
            e.preventDefault()
            try{
                account.dateCreated = getCurrentDate();
                await(axios.post('http://localhost:8800/user', account))
                navigate("/sign-in")
            }catch(err){
                console.log(err)
            }
        }
    
        console.log(account)

  return (
    <div className='shesh'>
      <div className='container'>
        <input 
          type='checkbox' 
          id='flip' 
          checked={isChecked} // Bind the checkbox to the state variable
          onChange={handleCheckboxChange} // Handle checkbox change
        />
        <div className='cover'>
          <div className='front'>
          <img src={tawo} alt="Tawo" />
          </div>
          <div className='back'>
            <img className='ErrandCatcher' src="" alt=''/>
          </div>
        </div>
      <div className='forms'>
          <div className='form-content'>
            <div className='employer-form'>
              <div className='title'>Employer</div>
              <form action='#'>
                <div className="input-boxes">
                  <div className='input-box'>
                    
                    <input className={errorMessage ? 'error' : ''} type="text" placeholder='Username' onChange={handleChange} name='username'/>
                    <input className={errorMessage ? 'error' : ''} type="password" placeholder='Password' onChange={handleChange} name='password'/>
                    <input className={errorMessage ? 'error' : ''} type="text" placeholder='First name' onChange={handleChange} name='fname'/>
                    <input className={errorMessage ? 'error' : ''} type="text" placeholder='Last name' onChange={handleChange} name='lname'/>
                    <select name='gender' onChange={handleChange} value={account.gender}>
                      <option value="">Choose gender....</option>
                      <option value="male" >Male</option>
                      <option value="female">Female</option>
                    </select>
                    <input className={errorMessage ? 'error' : ''} type="text" placeholder='contact number' onChange={handleChange} name='contact'/>
                    <input className={errorMessage ? 'error' : ''} type="date" onChange={handleChange} name='bday'/>  
                    <input className={errorMessage ? 'error' : ''} type="number" placeholder='Age' onChange={handleChange} name='age'/>     
                    <input className={errorMessage ? 'error' : ''} type="email" placeholder='Email address' onChange={handleChange} name='email'/>
                    <input className={errorMessage ? 'error' : ''} type="text" placeholder='Address' onChange={handleChange} name='address'/>
                    <br />
                    <p className='em'><i>{errorMessage}</i></p>
                    <div className="button1">
                      <button onClick={handleClick}>Sign Up</button>
                    </div>
                    <div className="text sign-up-text">
                      I am a <label htmlFor="flip">Catcher</label>
                    </div>
                    <br/>
                    <div>
                    <Link to="/sign-in">sign in here!</Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='Catcher-form'>
              <div className='title'>Catcher</div>
              <form action='#'>
                <div className="input-boxes">
                  <div className='input-box'>
                  <input className={errorMessage ? 'error' : ''} type="text" placeholder='Username' onChange={handleChange} name='username'/>
                    <input className={errorMessage ? 'error' : ''} type="password" placeholder='Password' onChange={handleChange} name='password'/>
                    <input className={errorMessage ? 'error' : ''} type="text" placeholder='First name' onChange={handleChange} name='fname'/>
                    <input className={errorMessage ? 'error' : ''} type="text" placeholder='Last name' onChange={handleChange} name='lname'/>
                    <select name='gender' onChange={handleChange} value={account.gender}>
                      <option value="">Choose gender....</option>
                      <option value="male" >Male</option>
                      <option value="female">Female</option>
                    </select>
                    <input className={errorMessage ? 'error' : ''} type="text" placeholder='contact number' onChange={handleChange} name='contact'/>
                    <input className={errorMessage ? 'error' : ''} type="number" placeholder='Age' onChange={handleChange} name='age'/>     
                    <input className={errorMessage ? 'error' : ''} type="email" placeholder='Email address' onChange={handleChange} name='email'/>
                    <input className={errorMessage ? 'error' : ''} type="text" placeholder='Address' onChange={handleChange} name='address'/>
                    <br />
                    <p className='em'><i>{errorMessage}</i></p>
                    <div className="button1">
                      <button onClick={handleClick}>Sign Up</button>
                    </div>
                    <div className="text sign-up-text">
                      Switch to <label htmlFor="flip">Employer</label>
                    </div>
                    <div>
                    <Link to="/sign-in">sign in here!</Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
   
export default SignUp