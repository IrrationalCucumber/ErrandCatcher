//Employer side
import React from "react";
import Table from "../../components/Table";
import Navbar from "../components/EmployerPageNavbar";
import "./applicant.css";

const headers = ["DATE", "CATCHER", "ERRAND TITLE", "ACTION"];
const applicants = [
  // Define your applicant data here
];

function Applicants() {
  return (
    <div>
      <Navbar
        page1="HOME"
        home={`/e-home`} //:userID
        page2="APPLICANTS"
        //Application={``}
        page3="COMMISSIONS"
        Commission={`/`}
      />
      <h1>Applicants</h1>
      {/*search the applicants or title */}
      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="applicants-table">
        <Table
          headers={headers}
          data={applicants.map(applicant, (rowIndex) => {
            const actions = applicant.map((action, cellIndex) => {
              if (cellIndex === 3) {
                // Assuming action is at index 3 in each row
                return (
                  <button key={cellIndex} className="action-btn">
                    {action === "Accept" && (
                      <>
                        {/* <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} /> */}
                        Accept
                      </>
                    )}
                    {action === "Decline" && (
                      <>
                        {/* <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} /> */}
                        Decline
                      </>
                    )}
                  </button>
                );
              }
              return <td key={cellIndex}>{action}</td>;
            });

            return <tr key={rowIndex}>{actions}</tr>;
          })}
        />
      </div>
    </div>
  );
}

export default Applicants;
