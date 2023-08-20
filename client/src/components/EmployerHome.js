import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import './Navbar.css'


function EmployerNavbar() {
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
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    ERRAND CATCHER<i className="fab fa-typo3"></i>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                  <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                  <li className='nav-item'>
                    <Link to='/e-home' className='nav-links' onClick={closeMobileMenu}>
                      Home
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/commission' className='nav-links' onClick={closeMobileMenu}>
                      Commission
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/applicant' className='nav-links' onClick={closeMobileMenu}>
                      Applicants
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/map' className='nav-links' onClick={closeMobileMenu}>
                      MAP
                    </Link>
                  </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
            </div>
        </nav>
    </>
  )
}

export default EmployerNavbar
