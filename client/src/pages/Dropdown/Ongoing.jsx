import React from 'react';
//import Cards from '../../components/Cards';
import OngoingCards from './OngoingCards';
import NavBar from '../../components/Navbar';

function Ongoing() {

  return (
    <div>
      {/* No user ID */}
        <NavBar
        page1="HOME"
        home={`/home/`}
        page2="COMMISSIONS"
        commissionList={`/commissions/`}
        page3="APPLICANTS"
        applicants={`/applicants/`}
        map={`/e-map/`}
        page4="MAP"
      />

      <OngoingCards/>

      <style>
        {`

        `}
      </style>
    </div>
  );
}

export default Ongoing;
