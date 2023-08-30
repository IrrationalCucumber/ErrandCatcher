import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar';
import Cards from '../components/Cards';
import HeroSection from '../components/HeroSection';


const Home = () => {
     //change the state of the menu
  const [click, setClick] = useState(false);
  //const [button, setButton] = useState(true);
//reverse the state of the above funstion
  //const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <>
      <Navbar />
      <HeroSection />
        <Cards />
    </>
  )
}

export default Home
