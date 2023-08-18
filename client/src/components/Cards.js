import React from 'react'
import CardItem from './CardItem'
//import './Cards.css'

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out this epic Destination!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
            <ul className='cards__items'>
                 <CardItem src='images/image-test-1.jpg'
                 text='Discover a rare creature in its natural habitat'
                 label='Discover'
                 path='/services'
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
      </div>
    </div>
  )
}

export default Cards
