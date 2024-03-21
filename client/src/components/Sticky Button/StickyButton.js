import React, { useState, useEffect } from 'react';
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

  const handleClick = () => {
    // Add your button click functionality here
    console.log('Button clicked!');
  };

  return (
    <button
      className={`sticky-button ${scrolled ? 'scrolled' : ''}`}
      style={{
        backgroundColor: props.buttonColor,
        color: props.buttonTextColor,
        borderRadius: props.buttonRadius
      }}
      onClick={handleClick}
    >
      {props.buttonText}
    </button>
  );
}

StickyButton.defaultProps = {
  buttonText: '',
  buttonColor: '#ce9251',
  buttonTextColor: '#fff',
  buttonRadius: '5px',
  scrollThreshold: 100,
  destination: ''
};

export default StickyButton;
