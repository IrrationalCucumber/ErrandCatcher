import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import { ButtonSI } from './ButtonSI';
import './Navbar.css'
import { ReactComponent as CustomIcon } from '../custom-icon.svg';



function Navbar() {
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
                    ERRAND CATCHER
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                  <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                </ul>
                {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
                {button && <ButtonSI buttonStyle='btn--outline'>SIGN IN</ButtonSI>}
            </div>
        </nav>
    </>
  )
}

export default Navbar
