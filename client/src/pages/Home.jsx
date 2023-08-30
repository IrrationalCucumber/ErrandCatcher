import React from 'react'
import Navbar from '../components/Navbar';
import Cards from '../components/Cards';
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'



const Home = () => {
     
  return (
    <>
    <div>
      <Navbar />
      <HeroSection></HeroSection>
      <Cards />
      <Footer />
    </div>
    </>
  )
}

export default Home
