//for verification
import React, { useState } from 'react';
import Stepper from '../components/stepper'; // Corrected import path
import './verification.css'; // Import the provided CSS styles
import Navbar from '../components/Navbar';

function Verification() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (firstName.trim() === '' || lastName.trim() === '' || age.trim() === '') {
      alert('Please fill in all the required fields.');
    } else if (parseInt(age) < 18) {
      alert('You must be at least 18 years old to proceed.');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
  }

  const list = [
    <div className="step">
      <h1>Basic Information</h1>
      {/*step 1 for input logic part is lacking where user input auto fill up */}
      <form onSubmit={handleSubmit} className='form-container'>
        <div className='form-group'>
            <div className='input-row'>
            <label className='label' >Full Name</label>
            <input type='text' placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required></input>
            <input type='text' placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} required></input>
        </div>
        <div className='input-row'>
            <label className='label'>Gender</label>
            <select className='select'>
                <option value=''>Choose gender...</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
            </select>
        </div>
        
            <div className='input-row'>
            <label className='label'>Age</label>
            <input type='number' value={age} onChange={handleAgeChange} placeholder='Enter your age' required></input>
            <label className='label'>Birthdate</label>
            <input type='date' required></input>
            </div>
            
        <div className='input-row'>
            <label className='label'>Home Address</label>
            <input type='text' placeholder='Enter your address' required></input>
        </div>
        <div className='input-row'>
            <label className='label'>Contact Number</label>
            <input type='text' placeholder='Enter your Contact Number' required></input>
        </div>
        <div className='input-row'>
            <label className='label'>Email Address</label>
            <input type='text' placeholder='Enter your Email Address' required></input>
        </div>
            <div>
                <button type='submit' onClick={handleNext}>Next</button>
            </div>
        </div>
      </form>
    </div>,
    <div className="step">
  <h1>Upload Image</h1>
  <div className='form-group1'> {/* Wrap the form with form-group */}
    <form className='form-container'>
      <div className='input-row'>
        <label className='label2' htmlFor="fileInput1">Upload your documents in here</label>
      </div>
      <div className='input-row'>
        <input type="file" id="fileInput1" accept="image/*" />
      </div>
      <div className='input-row'>
        <label className='label2' htmlFor="fileInput2">Upload your image here</label>
      </div>
      <div className='input-row'>
        <input type="file" id="fileInput2" accept="image/*" />
      </div>
      <div className='input-row' style={{ justifyContent: 'center' }}>
        <button onClick={() => setCurrentStep(currentStep - 1)}>Prev</button>
        <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
      </div>
    </form>
  </div>
</div>,

    <div className="step">
    <form className='form-container'>
    <h1>Congratulation you are Verified!</h1>
      <label>Explore the services in Errand Catcher</label>

    </form>
    </div>
  ];

  return (
    <div className="App">
    <Navbar></Navbar>
      <Stepper list={list} currentStep={currentStep} />
    </div>
  );
}

export default Verification;