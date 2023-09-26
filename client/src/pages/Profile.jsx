import React from 'react'
import NavbarPage from '../components/CatcherPageNavbar'
//import ImageUploader from '../components/ImageUploader';
import './profile.css';

const Profile = () => {
  //const [uploadedImage, setUploadedImage] = useState('');

  return (
    <div className='profile'>
      <NavbarPage></NavbarPage>

      <textarea className='PP' placeholder='decription'></textarea>
      <br />
      <label className='PP'>Username<input type="text"/></label> 
      <br />
      <label className='PP'>Name<input type='text'/><input type='text'/></label>
      <br />
      <label >
        Gender
        <select name='gender' >
          <option value="">Choose gender....</option>
          <option value="male" >Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <br />
      <label className='PP'>Age<input type='number' /></label>
      <br />
      <label className='PP'>Email Address<input type='text'/></label>
      <br />
      <label className='PP'>Contact Number<input type='number' /></label>
      <br />
      <label className='PP'>Address<input type='text'/></label>
      <button>Save</button>
      <button>Edit</button>

    </div>
  )
}

export default Profile

//<ImageUploader uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} />
