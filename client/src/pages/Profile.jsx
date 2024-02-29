import React, { useState } from 'react';
import NavbarPage from '../components/Navbar';
import './profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('about');

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
          <div className='info-form'>
            <form>
              <div className='toggle-button'>
                <span 
                  className={activeTab === 'about' ? 'active about-label' : ''}
                  onClick={() => setActiveTab('about')}
                >
                  About
                </span>
                <span 
                  className={activeTab === 'history' ? 'active history-label' : ''}
                  onClick={() => setActiveTab('history')}
                >
                  History
                </span>
              </div>
              {activeTab === 'about' && (
                <div className={`about-section ${activeTab !== 'about' ? 'hidden' : ''}`}>
                  {/* About section content */}
                  <div className='input-row'>
                    <label className='PP'>Name:</label>
                    <textarea type='text' className='display-data' placeholder='Name'></textarea>
                  </div>
                  <div className='input-row'>
                    <label className='PP'>Age</label>
                    <textarea type='number' className='display-data1' placeholder='Age'></textarea>
                  </div> 
                  <div className='input-row'>
                    <label className='PP'>Birth Date</label>
                    <textarea type='number' className='display-data1' placeholder='Date of birth'></textarea>
                  </div>
                  <div className='input-row'>
                    <label className='PP'>Gender</label>
                    <select className='display-data1'> gender
                      <option value="">Choose gender....</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className='input-row'>
                    <label className='PP'>Contact Number:</label>
                    <textarea type='number' className='display-data' placeholder='Contact Number'></textarea>
                  </div>
                  <div className='input-row'>
                    <label className='PP'>Email Address:</label>
                    <textarea type='text' className='display-data' placeholder='Email Address'></textarea>
                  </div>
                  <div className='input-row'>
                    <label className='PP'>Address:</label>
                    <textarea type='text' className='display-data' placeholder='Address'></textarea>
                  </div> 
                  <button>Save</button>
                  <button>Edit</button>
                </div>
              )}
              {activeTab === 'history' && (
                <div className={`history-section ${activeTab !== 'history' ? 'hidden' : ''}`}>
                  <label>THIS IS HISTORY WITH TRANSACTION</label>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
