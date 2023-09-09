import React from 'react'
import NavBar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import { useLocation } from 'react-router-dom'

function EmployerHome() {

//carry id to other page
const location = useLocation()
const userID = location.pathname.split("/")[2]
//pathname to array from

  return (
    <div>
        <NavBar
        page1="HOME"
        home={`/e-home/${userID}`}
        page2="COMMISSIONS"
        commissionList={`/commissions/${userID}`}
        page3="APPLICANTS"
        applicants={`/applicants/${userID}`}
      />
        <HeroSection />
    </div>
  )
}

export default EmployerHome
