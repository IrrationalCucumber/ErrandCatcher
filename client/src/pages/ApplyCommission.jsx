import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import '../style.css'



const ApplyCommission = () => {
  const [commission,setCommission] = useState({
    comID:"",
    comTitle:"",
    comDeadline:"",
    comLocation:"",
    comType:"",
    comDescription:"",
    comPay:"",
    comStatus:"",
    DateCompleted:"",
    ContactNo:"",
   })
   const [application, setApplication] = useState({
    catcherID:"",
    comID:"",
    applicationDate:"",
   })

    const navigate = useNavigate();
    const location = useLocation()
    //pathname to array from
    //get the id
    const commissionID = location.pathname.split("/")[2]
    const userID = location.pathname.split("/")[3]
    console.log(location.pathname.split("/")[2])
    console.log(location.pathname.split("/")[3])
    
    //handle changes 
    const handleChange = (e) => {
        if (e.target.name === 'comType') {
            setCommission((prev) => ({ ...prev, comType: e.target.value }));
            //setImageURL(commissionTypeImages[e.target.value]);
          }
    else if(e.target.name === 'comDescription')
    {
        setCommission((prev) => ({...prev, comDescription: e.target.value }))
    }
    else {
        // For other fields, use spread syntax as before
        setCommission((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    };

    //get current date
        
    const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  };

    //pre-fill the fields
    useEffect(() => {
        const fetchCommission = async () => {
            try {
                const res = await axios.get (`http://localhost:8800/commission/${commissionID}`);
                const retrievedCommission = res.data[0];
                //format date
                const formattedDate = new Date(retrievedCommission.commissionDeadline).toISOString().substr(0, 10);

                // Update the state with retrieved account data
                setCommission({
                    comID:retrievedCommission.commissionID,
                    comTitle:retrievedCommission.commissionTitle,
                    comDeadline:formattedDate,
                    comLocation:retrievedCommission.commissionLocation,
                    comType:retrievedCommission.commissionType,
                    comDescription:retrievedCommission.commissionDesc,
                    comPay:retrievedCommission.commissionPay,
                    comStatus:retrievedCommission.commissionStatus,
                    //DatePosted:"",
                    //DateCompleted:retrievedCommission.,
                    ContactNo: retrievedCommission.ContactNumber,
                });
            } catch (err) {
                console.log(err);
            }
        };

        fetchCommission();
    }, [commissionID]);


    const handleClick = async (e) => {
        e.preventDefault();
        try {
          console.log(userID); // Check if userID is correct
      
            application.applicationDate = getCurrentDate();
            application.comID = commissionID;
            application.catcherID = userID;
      
          console.log(application); // Check the updated commission object
      
          await axios.post('http://localhost:8800/apply', application);
          navigate(`/application/${userID}`);
        } catch (err) {
          console.log(err);
        }
      };

    console.log(commission)

    return (
        <div className='form'>
            <nav>
                <Link to='/accounts'>
                BACK 
                </Link>
                <Link to='/'>HOME </Link>
            </nav>
            <h1>Post Commission</h1>
            
                {/* {imageURL && <img src={imageURL} alt='Commission Type' />} */}
                <label>
                Commission Title<p>{commission.comTitle}</p>
                {/* <input type="text" placeholder='Commission Title' onChange={handleChange} name='comTitle' value={commission.comTitle}/> */}
                
                </label>
                <label>Deadline {commission.comDeadline}
                    {/* <input type="date" placeholder='Deadline' onChange={handleChange} name='comDeadline' value={commission.comDeadline}/> */}
                </label>Location
                    <input type="text" placeholder='Location' onChange={handleChange} name='comLocation' value={commission.comLocation}/>
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
                <textarea cols='20' rows='11' type="text" placeholder='Description' onChange={handleChange} name='comDescription' value={commission.comDescription}/>
                <label>
                    Amount: ₱
                    <input type='number' placeholder='0.00' onChange={handleChange} name='comPay' value={commission.comPay}/>
                </label>
                <input type="text" value={commission.ContactNo} onChange={handleChange} placeholder='Contact Number' name='ContactNo'/>
                  
                    <button className='formButton' onClick={handleClick}>APPLY</button>
            

        </div>
    
    )
    }

export default ApplyCommission