/*
import React from "react";

function RadioInputs({ options, selectedOption, onChange }) {
  return (
    <div className="radio-container">
      <div className="grid-container">
        {options.map((option, index) => (
          <div className="grid-item" key={index}>
            <div className="radio-wrapper">
              <div
                className={`radio-header ${
                  selectedOption === option.value ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  id={option.value}
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={onChange}
                />
                <label htmlFor={option.value} className="radio-label">
                  {option.label}
                </label>
              </div>
              <div className="separator"></div>
              <div className="radio-description">
                <h3>
                  //I'm {option.value === "employer" ? "an employer" : "a catcher"},
                  //looking for {option.value === "employer" ? "catcher" : "errands"}. 
                  I'm{" "}
                  {option.value === "Employer" ? "an employer" : "a catcher"},
                  looking for{" "}
                  {option.value === "Employer" ? "catcher" : "errands"}.
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


          @media screen and (max-width: 964px) {
           
            .radio-wrapper {
            border: 1px solid #0073aa;
            border-radius: 5px;
            padding: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            height: 250px;
            display: flex;
            flex-direction: column;
            
          }
            
           .radio-description {
            margin: 20px;
            height: 500px;
            // color: rgb(0, 90, 128);
            display: flex;
            justify-content: center;

          }

          .radio-description h3 {
            font-size: 1.5rem;
            // font-weight: 900; 
          }

        }
        `}
      </style>
    </div>
  );
}

export default RadioInputs;

*/

import React from "react";

function RadioInputs({ options, selectedOption, onChange }) {
  const handleWrapperClick = (optionValue) => {
    onChange({ target: { value: optionValue } });
    // Apply the 'animate' class to the clicked radio-wrapper
    const wrapper = document.getElementById(`wrapper-${optionValue}`);
    wrapper.classList.add('animate');
    setTimeout(() => wrapper.classList.remove('animate'), 100);
  };

  return (
    <div className="radio-container">
      <div className="grid-container">
        {options.map((option, index) => (
          <div className="grid-item" key={index}>
            <div
              id={`wrapper-${option.value}`}
              className={`radio-wrapper ${selectedOption === option.value ? "selected" : ""}`}
              onClick={() => handleWrapperClick(option.value)}
            >
              <div className="radio-header">
                <input
                  type="radio"
                  id={option.value}
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={onChange}
                />
                <label htmlFor={option.value} className="radio-label">
                  {option.label}
                </label>
              </div>
              <div className="separator"></div>
              <div className="radio-description">
                <h3>
                  I'm{" "}
                  {option.value === "Employer" ? "an employer" : "a catcher"},
                  looking for{" "}
                  {option.value === "Employer" ? "catcher" : "errands"}.
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
            border: 1px solid #0073aa;
            border-radius: 5px;
            padding: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
          }

          .radio-wrapper.selected {
            background-color: #0073aa;
            color: #fff;
          }

          .radio-wrapper.selected .radio-label {
            color: white;
          }

          .radio-header {
            display: flex;
            align-items: center;
            margin: 10px;
          }

          .radio-header input[type="radio"] {
            display: none;
          }

          .radio-label {
            margin-left: 10px;
            color: black;
            font-size: 1.5rem;
            cursor: pointer;
            font-weight: 800;
            line-height: 1.2;
            color: #0073aa;
          }

          .separator {
            border-bottom: 1px solid #ccc;
            margin: 10px 0;
          }

          .radio-description {
            margin: 20px;
          }

          .radio-wrapper.animate {
            background-color: #0073aa;
            color: white;
            transform: scale(0.95);
            box-shadow: 0 2px 25px rgba(0, 115, 170, 0.5);
            transition: transform 0.1s, box-shadow 0.25s;
          }

          @media screen and (max-width: 964px) {
            .radio-wrapper {
              height: 250px;
              display: flex;
              flex-direction: column;
            }

            .radio-description {
              height: 500px;
              display: flex;
              justify-content: center;
            }

            .radio-description h3 {
              font-size: 1.5rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default RadioInputs;
