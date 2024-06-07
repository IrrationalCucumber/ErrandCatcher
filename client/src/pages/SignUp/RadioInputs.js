import React from "react";

function RadioInputs({ selectedOption, onChange }) {
  const options = [
    { value: "employer", label: "I'm an Employer, looking for Catcher" },
    { value: "catcher", label: "I'm a Catcher, looking for Errands" }
  ];  

  return (
    <div className="radio-container">
      <div className="grid-container">
        {options.map((option, index) => (
          <div className="grid-item" key={index}>
            <div className="radio-wrapper">
              <div className={`radio-header ${selectedOption === option.value ? "selected" : ""}`} >
                <input
                  type="radio"
                  id={option.value}
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={onChange}
                />
                <label htmlFor={option.value} className="radio-label">{option.label}</label>
              </div>
              {/* <div className="separator"></div>
              <div className="radio-description">
                <h3>
                  I'm {option.value === "employer" ? "an employer" :  "a catcher"},
                  looking for {option.value === "employer" ? "catcher" : "errands"}.
                </h3>
              </div> */}
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
            border: 1px solid #0073aa;
            border-radius: 5px;
            padding: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .radio-header {
            display: flex;
            align-items: center;
            margin: 10px;
            
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
            font-size: 130px; 
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
