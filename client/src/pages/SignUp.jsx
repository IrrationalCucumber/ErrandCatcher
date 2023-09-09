import React, { useState } from 'react';
//import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import tawo from '../imgs/tawo.png';
import './SignUp.css';

const SignUp = () => {
  return (
    <div className='shesh'>
    <div className='container'>
    <input type='checkbox' id='flip' />
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
                  <div className="button1">
                    <input type="submit" value="Submit" />
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
                  <div className="button input-box">
                    <input type="submit" value="Submit" />
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
/**
 *      <input type="text" placeholder='first name' onChange={handleChange} name='fname'/>
      <input type="text" placeholder='last name' onChange={handleChange} name='lname'/>
      <input type="text" placeholder='email' onChange={handleChange} name='email'/>
      <input type="text" placeholder='gender' onChange={handleChange} name='gender'/>

      <input type="text" placeholder='Account type' onChange={handleChange} name='type'/>
 */