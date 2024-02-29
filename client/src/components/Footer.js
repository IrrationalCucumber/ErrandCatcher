import React from 'react'
import { Button } from './NavButton'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <div className='footer-container'>
        <section className='footer-subscription'>
            
           
            <div className='input-areas'>

            </div>
        </section>
        <div className='footer-links'>
            <div className='footer-link-wrapper'>
                <div className='footer-link-items'>
                    <h2>Errand Catcher</h2>
                
                </div>
            </div>
        </div>
        <section className='social-media'>
            <div className='social-media-wrap'>
                <div className='footer-logo'>
                    <Link to='/' className='social-logo'>
                        About Us <i fab fab-typo3></i>
                    </Link>
                </div>
                <div className='footer-logo'>
                    <Link to='/' className='social-logo'>
                        Contact Us <i fab fab-typo3></i>
                    </Link>
                </div>
                <small className='website-rights'>ERRAND CATCHER</small>
                <div className='social-icons'>
                    <Link className='social-icon-link facebook'
                    to='/'
                    target='_blank'
                    aria-label='Facebook'
                    >
                        <i className='fab fa-facebook-f'></i>
                    </Link>

                    <Link className='social-icon-link instagram'
                    to='/'
                    target='_blank'
                    aria-label='Instagram'
                    >
                        <i className='fab fa-instagram'></i>
                    </Link>

                    <Link className='social-icon-link twitter'
                    to='/'
                    target='_blank'
                    aria-label='Twitter'
                    >
                        <i className='fab fa-twitter'></i>
                    </Link>

                    <Link className='social-icon-link linkedin'
                    to='/'
                    target='_blank'
                    aria-label='LinkedIn'
                    >
                        <i className='fab fa-linkedin'></i>
                    </Link>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Footer
