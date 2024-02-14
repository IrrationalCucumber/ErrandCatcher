import React from 'react';
import NavbarPage from '../components/CatcherPageNavbar';
import './profile.css';

const Profile = () => {
  return (
    <div>
      <NavbarPage /> 
      <div className='profile'> 
        <div className='profile-info'>
          
          <div className='description-form'>
            <form>
              <div className='FileContainer'>
                <label htmlFor="file" className='File'>Upload Image</label>
                <input type="file" id="file" className='file'/>
              </div>
              <div className='username-container'>
                <label className='username'>Username</label>
              </div>
              <div className='rating-box'>
                <label className='Rating'>Rating</label>
                <label className='RateNo'>00 / 05</label>
              </div>
  
              <textarea className='description' placeholder='Description'></textarea>
            </form>
          </div>

        {/* User Information */}
          <div className='info-form'>
            <form>
            <label>About</label>
            <label>History</label>
            <div className='input-row'>
                  <label className='PP'>Name:</label>
                  <label type='text' className='display-data'>hello</label>
            </div>
            <div className='input-row'>
                  <label className='PP'>Email Address:</label>
                  <label type='text' className='display-data'>hello</label>
            </div>
            <div className='input-row'>
                  <label className='PP'>Contact Number:</label>
                  <label type='number' className='display-data'>hello</label>
            </div>
            <div className='input-row'>
                  <label className='PP'>Address:</label>
                  <label type='text' className='display-data'> hello</label>
            </div>
            <div className='input-row1'>
                  <label className='PP'>Birth Date</label>
                  <label type='number' className='display-data1'> 00-00-0000</label>
            </div>
            <div className='input-row1'>
                  <label className='PP'>Age</label>
                  <label type='number' className='display-data1'> 00</label>
            </div>
            <div className='input-row1'>
                  <label className='PP'>Gender</label>
                  <label className='display-data1'> gender</label>
            </div>
            
              <button>Save</button>
              <button>Edit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
