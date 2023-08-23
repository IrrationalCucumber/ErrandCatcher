import React, {useLocation} from 'react'
import Navbar from '../components/EmployerNavbar'

function EmployerHome() {
    const location = useLocation()

    const userID = location.pathname.split("/")[2]
    //pathname to array from
  return (
    <div>
        <Navbar></Navbar>
    </div>
  )
}

export default EmployerHome
