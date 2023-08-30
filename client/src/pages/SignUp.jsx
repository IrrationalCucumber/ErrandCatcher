import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './SignUp.css';

const SignUp = () => {
   // Create a state variable to store the age
   const [age, setAge] = useState('');

   // Function to handle changes in the age input field
   const handleAgeChange = (event) => {
     setAge(event.target.value);
   };
 
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
                  <div>
                    <input type="submit" value="Submit" />
                  </div>
                  <div>
                    I am a <label htmlFor="flip">Catcher</label>
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
                  <div>
                    <input type="submit" value="Submit" />
                  </div>
                  <div>
                    Switch to <label htmlFor="flip">Employer</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
   
export default SignUp