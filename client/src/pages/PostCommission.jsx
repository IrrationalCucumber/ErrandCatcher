import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
            await(axios.post('http://localhost:8800/commission', commission))
            navigate("/commission-list")
        }catch(err){
            console.log(err)
        }
}


console.log(commission)

  return (
    <div className=''>
      <h1>Post Commission</h1>
      <label>
        Commission Title
        <input type="text" placeholder='Commission Title' onChange={handleChange} name='comTitle'/>
      </label>     
      <br />
      <label>
        
         <input type="date" placeholder='Deadline' onChange={handleChange} name='comDeadline'/>

      </label>
      
      <br />
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


      <button onClick={handleClick}>POST</button>

    </div>
  
  )
}

export default PostCommission
