import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './sticky.css';

function StickyButton(props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > props.scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [props.scrollThreshold]);


  return (
    <Link to={props.destination}> {/* Use Link component */}
      <button
        className={`sticky-button ${scrolled ? 'scrolled' : ''}`}
        style={{
          backgroundColor: props.buttonColor,
          color: props.buttonTextColor,
          borderRadius: props.buttonRadius,
          boxShadow: scrolled ? '0px 2px 5px rgba(0, 0, 0, 0.5)' : 'none'
        }}
      >
        {props.buttonText}
      </button>
    </Link>
  );
}

StickyButton.defaultProps = {
  buttonText: '',
  buttonColor: '#1679AB',
  buttonTextColor: '#fff',
  buttonRadius: '5px',
  scrollThreshold: 100,
  destination: '', 
};

export default StickyButton;
