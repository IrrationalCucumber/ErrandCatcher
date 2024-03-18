import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import Navbar from "../components/NavBarPage";
import maplibregl from "maplibre-gl";
import Map from '../components/Map';
import '../style.css'
import './Commission.css'

const ViewCommission = () => {
  const [commission, setCommission] = useState({
    comID: '',
    comTitle: '',
    comDeadline: '',
    comLocation: '',
    comType: '',
    comDescription: '',
    comPay: '',
    comStatus: '',
    catcherID: '',
    //DatePosted:"",
    DateCompleted: '',
    ContactNo: ''
  })

  const navigate = useNavigate()
  const location = useLocation()
  //pathname to array from
  //get the id
  const commissionID = location.pathname.split('/')[2]
  console.log(location.pathname.split('/')[2])

  //handle changes
  const handleChange = e => {
    if (e.target.name === 'comType') {
      setCommission(prev => ({ ...prev, comType: e.target.value }))
      //setImageURL(commissionTypeImages[e.target.value]);
    } else if (e.target.name === 'comDescription') {
      setCommission(prev => ({ ...prev, comDescription: e.target.value }))
    } else {
      // For other fields, use spread syntax as before
      setCommission(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  //funtion to delete commission
  // const handleDelete = async (commissionID) =>{
  //     try {
  //           //"http://localhost:8800/commission" - local computer
  //           //"http://192.168.1.47:8800/commission" - netwrok
  //       await axios.delete(`http://localhost:8800/commission/${commissionID}`)
  //       window.location.reload()
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

  //pre-fill the fields
  useEffect(() => {
    const fetchCommission = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/commission/${commissionID}`
        )
        const retrievedCommission = res.data[0]
        //format date
        const formattedDate = new Date(retrievedCommission.commissionDeadline)
          .toISOString()
          .substr(0, 10)

        // Update the state with retrieved account data
        setCommission({
          comID: retrievedCommission.commissionID,
          comTitle: retrievedCommission.commissionTitle,
          comDeadline: formattedDate,
          comLocation: retrievedCommission.commissionLocation,
          comType: retrievedCommission.commissionType,
          comDescription: retrievedCommission.commissionDesc,
          comPay: retrievedCommission.commissionPay,
          comStatus: retrievedCommission.commissionStatus,
          catcherID: retrievedCommission.catcherID,
          //DatePosted:"",
          //DateCompleted:retrievedCommission.,
          ContactNo: retrievedCommission.ContactNumber
        })
      } catch (err) {
        console.log(err)
      }
    }

    fetchCommission()
  }, [commissionID])

  const handleClick = async e => {
    e.preventDefault()
    try {
      //account.dateCreated = getCurrentDate();
      await axios.put(
        'http://localhost:8800/update-commission/' + commissionID,
        commission
      )
      navigate('/commission-list')
    } catch (err) {
      console.log(err)
    }
  }

  console.log(commission)

  return (
    <div>
            <Navbar />
    <div className='form errand-cont'>
      <div className='input-cont'>
        <div className='errand-inputs'>
          <h1>View Commission</h1>
          {/* {imageURL && <img src={imageURL} alt='Commission Type' />} */}
          {/* commision title */}
          <div className='input-group'>
              <label>
                Commission Title:
              </label>
              <p> This is title: {commission.comTitle}</p>
          </div>
          {/* deadline */}
          <div className='input-group'>
            <label>
              Deadline:
            </label>
            <p>this is deadline{commission.comDeadline}</p>
          </div>
          {/* location */}
          <div className='input-group'>
            <label>
                Location
            </label>
            <p>this is location{commission.comLocation}</p>
          </div>
          {/* commission type */}
          <div className='input-group'>
            <label htmlFor=''>
              Commission Type:
            </label>
            <p>this is commission type{commission.comType}</p>
          </div>
          {/* description */}
          <div className='input-group'>
            <label>
              Description
            </label>
            <p> some description{commission.comDescription}</p>
          </div>
          {/* Amount */}
          <div className='input-group'>
            <label>
              Amount: ₱
            </label>
            <p>1000{commission.comPay}</p>
          </div>
        </div>
          <Map />
        </div>
      {/* <input type="text" value={commission.ContactNo} onChange={handleChange} placeholder='Contact Number' name='ContactNo'/> */}
      <div className='btn-container'>
        <button
          className='formButton btn'
          onClick={e => {
            navigate(`/update-commission/${commission.commissionID}`)
          }}
        >
          APPLY
        </button>
      </div>
    </div>
    </div>
  )
}

export default ViewCommission