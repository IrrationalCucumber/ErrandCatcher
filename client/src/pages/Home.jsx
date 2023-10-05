import React from 'react'
import Navbar from '../components/Navbar';
import Cards from '../components/Cards';
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'



const Home = () => {
     
  return (
    <>
    <div>
    <Navbar
        button="SIGN IN"
        pageButton='/sign-in'
      />
      <HeroSection></HeroSection>
      <Cards />
      <Footer />
    </div>
    </>
  )
}

export default Home
