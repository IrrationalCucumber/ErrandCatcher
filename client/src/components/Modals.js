import React from 'react';
import ReactDOM from 'react-dom';

const Modals = ({ isOpen, onClose, children }) => {

  //const [rating, setRating] = useState(0); 
    
  const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isOpen ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,

  };

  const styles = {
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: 'blue',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '10px',
    },
  };
  

  return isOpen
    ? ReactDOM.createPortal(
        <div style={modalStyles} onClick={onClose}>
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '90%',
              maxHeight: '80%',
              overflow: 'auto',
              width: '30%'
              
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modals;