import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import './navbar-employer.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faBell as regularBell } from '@fortawesome/free-regular-svg-icons';



function NavbarEmployer() {
  //change the state of the menu
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
//reverse the state of the above funstion
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

//   const [account, setAccount] = useState('')
//   useEffect(() =>{
//     const fettchAccount = async ()=>{
//         try{
//             const res = await axios.get("http://192.168.1.47:8800/home/")
//             setAccount(res.data)
//         }
//         catch(err){
//             console.log(err)
//         }
//     }
//     fettchAccount()
// }, [])

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

//fontawsome icon notification
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
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      Home
                    </Link>
                  </li>
                  
                  <li className='nav-item'>
                    <Link to='/Map' className='nav-links' onClick={closeMobileMenu}>
                      Map
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      Applicant
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      Commission
                    </Link>
                  </li>
                </ul>
                {/* <FontAwesomeIcon icon={regularBell} /> */}
                {/* {account.map(Account=>(
                    <div className="account" key={Account.userID}>
                      {button && <Button buttonStyle='btn--outline'>{Account.username}</Button>}
                    </div>
                    ))} */}
            </div>
        </nav>
    </>
  )
}

export default NavbarEmployer
/**
 * <li className='nav-item'>
                    <Link to='/commission' className='nav-links' onClick={closeMobileMenu}>
                      Commission
                    </Link>
                  </li>


notification
 <a href="#" class="notification">
  <span>Inbox</span>
  <span class="badge">3</span>
</a>
 */

