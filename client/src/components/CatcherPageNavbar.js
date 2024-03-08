import React, {useState, useEffect} from 'react'
import { Button } from './NavButton';
import './Navbar.css'
import NavBar from '../components/Navbar'

//only for CATCHER

function CatcherPageNavbar() {
  //change the state of the menu
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
//reverse the state of the above funstion
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if(window.innerWidth <= 960){
      setButton(false)
    } else{
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
  }, [])

//handles the resizing of window
window.addEventListener('resize', showButton)

  return (
    <>
        <NavBar
        page1="HOME"
        home={`/admin-home`}
        // {`admin-home/${userID}`}
        page2="COMMISSION"
        commissionList={`/`}
        page3="APPLICATION"
        applicants={`/`}
      />
        {/*<nav className="navbar">
            <div className="navbar-container">
              
                <div className='menu-icon' onClick={handleClick}>
                  <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                {button && <Button page='/sign-in' buttonStyle='btn--outline'>SIGN OUT</Button>}
            </div>
        </nav>*/}
    </>
  )
}

export default CatcherPageNavbar
