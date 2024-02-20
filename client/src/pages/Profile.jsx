import React from 'react';
import NavbarPage from '../components/CatcherPageNavbar';
import './Profile.css';

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
            <label className='toggle'>About</label>
            <label className='toggle'>History</label>
            <div className='input-row'>
                  <label className='PP'>Name:</label>
                  <textarea type='text' className='display-data' placeholder='Name'></textarea>
                  <div className='textarea-container'>
                  {/*<label htmlFor="name" className='username'>Name</label> */}

                  </div>  
            </div>
            <div className='input-row'>
                  <label className='PP'>Email Address:</label>
                  <textarea type='text' className='display-data' placeholder='Email Address'></textarea>
            </div>
            <div className='input-row'>
                  <label className='PP'>Contact Number:</label>
                  <textarea type='number' className='display-data' placeholder='Contact Number'></textarea>
            </div>
            <div className='input-row'>
                  <label className='PP'>Address:</label>
                  <textarea type='text' className='display-data' placeholder='Address'></textarea>
            </div>  
            <div className='input-row'>
                  <label className='PP'>Birth Date</label>
                  <textarea type='number' className='display-data1' placeholder='Date of birth'></textarea>
            </div>
            <div className='input-row'>
                  <label className='PP'>Age</label>
                  <textarea type='number' className='display-data1' placeholder='Age'> 00</textarea>
            </div>
            <div className='input-row'>
                  <label className='PP'>Gender</label>
                  <select className='display-data1'> gender
                  <option value="">Choose gender....</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
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

/* toggle
const [activeSection, setActiveSection] = useState('about');

const toggleSection = (section) => {
    setActiveSection(section);

/* About section */
          //<div className='username-container'>
          //<label className='username' onClick={() => toggleSection('about')}>About</label>
          //{activeSection === 'about' && (
            //<div className='info-form'>
              //<label>About</label>
              //<div className='input-row'>
                //<label className='PP'>Name:</label>
                //<textarea type='text' className='display-data' placeholder='Name'></textarea>
              //</div>
              //<div className='input-row'>
                //<label className='PP'>Email Address:</label>
                //<textarea type='text' className='display-data' placeholder='Email Address'></textarea>
              //</div>
              //<div className='input-row'>
                //<label className='PP'>Contact Number:</label>
                //<textarea type='number' className='display-data' placeholder='Contact Number'></textarea>
              //</div>
              //<div className='input-row'>
                //<label className='PP'>Address:</label>
                //<textarea type='text' className='display-data' placeholder='Address'></textarea>
              //</div>  
              //<div className='input-row'>
                //<label className='PP'>Birth Date</label>
                //<textarea type='number' className='display-data1' placeholder='Date of birth'></textarea>
              //</div>
              //<div className='input-row'>
                //<label className='PP'>Age</label>
                //<textarea type='number' className='display-data1' placeholder='Age'> 00</textarea>
              //</div>
              //<div className='input-row'>
                //<label className='PP'>Gender</label>
                //<select className='display-data1'> gender
                  //<option value="">Choose gender....</option>
                  //<option value="male">Male</option>
                  //<option value="female">Female</option>
                //</select>
              //</div>
              //<button>Save</button>
              //<button>Edit</button>
            //</div>
//History section
//<div className='username-container'>
//<label className='history' onClick={() => toggleSection('history')}>History</label>
//{activeSection === 'history' && (
//  <div>
//  </div>
