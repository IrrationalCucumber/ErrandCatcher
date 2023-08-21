import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import './PostCommission.css'; // Import your CSS file


const PostCommission = () => {
  const [commission,setCommission] = useState({
    comTitle:"",
    comDeadline:"",
    comLocation:"",
    comType:"",
    comDescription:"",
    comPay:"",
    comStatus:"",
    catcherID:"",
    DatePosted:"",
    DateCompleted:"",
    Contactno: "",
   })

const navigate = useNavigate();

  //get current date
        
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  };

const handleChange = (e) => {
  if (e.target.name === 'comType') {
    setCommission((prev) => ({ ...prev, comType: e.target.value }));
  }
  else {
    // For other fields, use spread syntax as before
    setCommission((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

};

const handleClick = async e =>{
  e.preventDefault()
        try{
            commission.DatePosted = getCurrentDate();
            await(axios.post('http://localhost:8800/commission', commission))
            navigate("/commission-list")
        }catch(err){
            console.log(err)
        }
};


console.log(commission)

  return (
    <div className='backhome'>
      <nav>
        <Link to='/accounts'>
          BACK 
        </Link>
        <Link to='/'>HOME </Link>
      </nav>
      <h1>Post Commission</h1>
      <div className='in'>
        <label>
          Commission Title
          <input type="text" placeholder='Commission Title' onChange={handleChange} name='comTitle'/>
        </label> 
        <br />
        <label>Deadline
         <input type="date" placeholder='Deadline' onChange={handleChange} name='comDeadline'/>
        </label>
        <br />Location
        <input type="text" placeholder='Location' onChange={handleChange} name='comLocation'/>
        <br />
        <label htmlFor="">
        Commission Type
        <select name='comType' onChange={handleChange} value={commission.comType}>
          <option value="">Choose type....</option>
          <option value="HomeService - Indoor">Home Service - Indoor</option>
          <option value="HomeService - Outdoor">Home Service - Outdoor</option>
          <option value="Delivery">Delivery Service</option>
          <option value="Transport">Transport Service</option>
        </select>
      </label>
      <br />
      <textarea cols='20' rows='11' type="text" placeholder='Description' onChange={handleChange} name='comDescription'/>
      <br />
      <label>
        Amount: ₱
          <input type='number' placeholder='0.00' onChange={handleChange} name='comPay'/>
      </label>
      <input type="text" placeholder='Contact Number' onChange={handleChange} name='ContactNo'/>
      <br />
      <button onClick={handleClick}>POST</button>
      </div>

    </div>
  
  )
}

export default PostCommission
