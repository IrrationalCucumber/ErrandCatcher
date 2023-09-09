import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './NavButton';
import './Navbar.css'
import { ReactComponent as CustomIcon } from '../custom-icon.svg';



function Navbar(props) {
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

  //carry id to other page
  const location = useLocation()
    const userID = location.pathname.split("/")[2]
    //pathname to array from

  return (
    <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to={props.home} className="navbar-logo" onClick={closeMobileMenu}>
                    ERRAND CATCHER<i className="fab fa-typo3"></i>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                  <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                  <li className='nav-item'>
                    <Link to={props.home} className='nav-links' onClick={closeMobileMenu}>
                     {props.page1}
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to={props.commissionList} className='nav-links' onClick={closeMobileMenu}>
                      {props.page2}
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to={props.applicants} className='nav-links' onClick={closeMobileMenu}>
                      {props.page3}
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/map' className='nav-links' onClick={closeMobileMenu}>
                      MAP
                    </Link>
                  </li>
                </ul>
                {button && <Button page='/sign-in' buttonStyle='btn--outline'>SIGN OUT</Button>}
            </div>
        </nav>
    </>
  )
}

export default Navbar
