import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import './PostCommission.css'; // Import your CSS file

export const Box = () => {
  return (
    <div className="box">
      <div className="rectangle"/>
    </div>
  )
}
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
            //account.dateCreated = getCurrentDate();
            await(axios.post('http://192.168.1.47:8800/commission', commission))
            navigate("/commission-list")
        }catch(err){
            console.log(err)
        }
}


console.log(commission)

  return (
    <div className=''>
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
        <label>
         <input type="date" placeholder='Deadline' onChange={handleChange} name='comDeadline'/>
        </label>
        <input type="text" placeholder='Location' onChange={handleChange} name='comLocation'/>
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

      </div>
      <button onClick={handleClick}>POST</button>

    </div>
  
  )
}

export default PostCommission
