//for the selection of the user
import React from "react";

function RadioInputs({ options, selectedOption, onChange }) {
  return (
    <div className="radio-container">
      <div className="grid-container">
        {options.map((option, index) => (
          <div className="grid-item" key={index}>
            <div className="radio-wrapper">
              <div className={`radio-header ${selectedOption === option.value ? "selected" : ""}`}>
                <input
                  type="radio"
                  id={option.value}
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={onChange}
                />
                <label htmlFor={option.value} className="radio-label">{option.label}</label>
              </div>
              <div className="separator"></div>
              <div className="radio-description">
                <h3>
                  I'm {option.value === "Employer" ? "an employer" : "a catcher"},
                  looking for {option.value === "Employer" ? "catcher" : "errands"}.
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
          .radio-container {
            margin-bottom: 20px;
          }
          
          .grid-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 20px;
          }
          
          .grid-item {
            margin-bottom: 20px;
          }
          
          .radio-wrapper {
            border: 1px solid grey;
            border-radius: 8px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.1s ease;
          }

          .radio-wrapper:hover {
            border: 2px solid #1068C7;
            
          }
          .radio-wrapper.animate {
            transform: scale(1.1);
          }
          
        
          .radio-wrapper:active {
            animation: jump 0.10s;
            
          }
          @keyframes jump {
            0% {
              transform: translateY(0);
            }
            70% {
              transform: translateY(-2px);
            }
            
           }
           
          
          .radio-header {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            cursor: pointer;
            font-size: 100px
            
          }
          
          .radio-header.selected {
            background-color: #0073aa;
            color: #fff;
          }

          .radio-header.selected .radio-label {
            color: white;
          }
          
          
          .radio-header input[type="radio"] {
            display: none;
          }
          
          .radio-label {
            margin-left: 10px;
            color: black;
            border-radius: 90px;
            cursor: pointer;
            font-family: "Helvetica Neue", sans-serif;
            font-size: 100px;
            font-weight: bold;          
          }
          
          .separator {
            border-bottom: 1px solid #ccc;
            margin: 10px 0;
          }
          
          .radio-description {
            margin: 20px;
          }
        `}
      </style>
    </div>
  );
}

export default RadioInputs;
