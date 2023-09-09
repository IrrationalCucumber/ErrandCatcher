import React from 'react'
import { Button } from './NavButton'
import { ButtonMap } from './ButtonMap'
import './HeroSection.css'
import '../App.css'

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-test-1.mp4' autoPlay loop muted />
      <h1>ERRAND CATCHER</h1>
      <p>See what errand is available</p>
      <div className='hero-btns'>
        <Button 
            className='btns' 
            buttonStyle='btn--outline'
            buttonSize='btn--large'
            >
            GET STARTED
        </Button>
        <ButtonMap 
            className='btns' 
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            >
            VIEW NEARBY COMMISSION
        </ButtonMap>
        </div> 
    </div>
  )
}

export default HeroSection
