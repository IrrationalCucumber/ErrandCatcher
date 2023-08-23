import React, { useState, useEffect } from 'react'
import CardItem from './CardItem'
import axios from 'axios'
//import './Cards.css'

function Cards() {
  const [commissions, setCommissions] = useState([])

  //rretrieve data
  useEffect(() =>{
    const fetchAllCommission = async ()=>{
        try{
            const res = await axios.get("http://localhost:8800/commission")
            //"http://localhost:8800/commission" - local computer
            //"http://192.168.1.47:8800/commission" - netwrok
            setCommissions(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchAllCommission()
}, [])

  
  return (
    <div className='cards'>
      <h1>Check out this epic Destination!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
        {commissions.map(Commission=>(
          <div className="commission" key={Commission.commissionID}>
            <ul className='cards__items'>
                 <CardItem src='images/hr.png'
                 text={Commission.commissionTitle}
                 label={Commission.commissionType}
                 path={`/view-commission/${Commission.commissionID}`}
                 />
                 <CardItem src='images/image-test-2.jpg'
                 text='Witness one of the bipedal whom the last of its species'
                 label='BuyAndSell'
                 path='/services'
                 />
            </ul>
            <ul className='cards__items'>
                 <CardItem src='images/img-9.jpg'
                 text='Explore the hidden waterfall deep inside the amazon jungle'
                 label='Adventure'
                 path='/services'
                 />
                 <CardItem src='images/img-2.jpg'
                 text='Travel trough the Island of Bali with a private Cruise'
                 label='Luxury'
                 path='/services'
                 />
                 <CardItem src='images/img-3.jpg'
                 text='Explore the hidden waterfall deep inside the amazon jungle'
                 label='Adventure'
                 path='/services'
                 />
            </ul>
            </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Cards
