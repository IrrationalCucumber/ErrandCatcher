//03-26-24 no connection to backend
import React from 'react';
import './invoice.css'; // Import CSS file for styling

const Invoice = ({ errand }) => {

  const handleExit = () => {
    // Define the functionality to handle exit button click
    console.log('Exit button clicked');
  };

  return (
    <div className="invoice">
      <h2>Invoice Form</h2>
      <form className="invoice-form">
        <div className="invoice-info">
          <label>
            Invoice No.:
            <span/>
          </label>
          <label>
            Invoice Date:
            <span />
          </label>
          <label>
            Due Date:
            <span />
          </label>
          <label>
            Employer Name:
            <span />
          </label>
          <label>
            Billing Address:
            <span/>
          </label>
        </div>
        {errand && errand.length > 0 ? (
          <div className="invoice-items">
            <p>Itemized Billing</p>
            {errand.map((item, index) => (
              <div key={index}>
                <label>
                  Description:
                  <span />
                </label>
                <label>
                  Quantity:
                  <span />
                </label>
                <label>
                  Unit Price:
                  <span />
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p></p>
        )}
        <hr />
        <h2>Payment Details</h2>
        <div className="payment-info">
          <div className="payment-details">
            <label>
              Subtotal:
              <span />
            </label>
            <label>
              Charges:
              <span />
            </label>
            <hr />
            <label>
              Total:
              <span />
            </label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <button className="exit-button" onClick={() => handleExit()}>
        <i className="fa fa-times-circle-o" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default Invoice;
