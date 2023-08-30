import React from 'react';
import './Cards.css';
import CardItem from './CardItem.js';

function Cards() {
  return (
    <div className='cards'>
    <h1>Check out these services in Errand Catcher!</h1>
    <div className='cards__container'>
      <div className='cards__wrapper'>
        <ul className='cards__items'>
          <CardItem
            src='images/homerepair.jpg'
            text='Book for errands for home repair now'
            label='Home Repair'
            path='/sign-up'
          />
           <CardItem
            src='images/grocerry.jpg'
            text='Book for someone to do grocerry for you!'
            label='Grocery'
            path='/sign-up'
          />
         <CardItem
            src='images/plumber.png'
            text='Book for plumber now!'
            label='Plumbing'
            path='/sign-up'
          />
        </ul>
        <ul className='cards__items'>
          <CardItem
            src='images/gardening.jpg'
            text='Book for someone to do gardening!'
            label='Gardening'
            path='/sign-up'
          />
          <CardItem
            src='images/laundry.jpg'
            text='Experience hiring someone to do your laundry just today!'
            label='Laundry'
            path='/sign-up'
          />
          <CardItem
            src='images/carpentry.jpg'
            text='Hire someone to do carpentry!'
            label='Carpentry'
            path='/sign-up'
          />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;