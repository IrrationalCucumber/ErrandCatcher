import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ButtonSI } from './ButtonSI';
import './Navbar.css'


function CatcherNavbar() {
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
  const location = useLocation()
    //pathname to array from
    //get the id
    const userID = location.pathname.split("/")[2]

  useEffect(() => {
    showButton()
  }, [])

//handles the resizing of window
window.addEventListener('resize', showButton)

  return (
    <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to={`/c-home/${userID}`} className="navbar-logo" onClick={closeMobileMenu}>
                    ERRAND CATCHER<i className="fab fa-typo3"></i>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                  <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                  <li className='nav-item'>
                    <Link to={`/c-home/${userID}`} className='nav-links' onClick={closeMobileMenu}>
                      Home
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/commission' className='nav-links' onClick={closeMobileMenu}>
                      Commission
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/application' className='nav-links' onClick={closeMobileMenu}>
                      Application
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/map' className='nav-links' onClick={closeMobileMenu}>
                      MAP
                    </Link>
                  </li>
                </ul>
                {button && <ButtonSI buttonStyle='btn--outline'>SIGN OUT</ButtonSI>}
            </div>
        </nav>
    </>
  )
}

export default CatcherNavbar