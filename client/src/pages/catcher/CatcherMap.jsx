import React from "react";
import Map from "../../components/Map.js";
import NavBar from "../../components/Navbar/Navbar.js";

function CatcherMap() {
  return (
    <div>
      {/* <NavBar
        page1="HOME"
        home={`/home/${userID}`}
        page2="COMMISSIONS"
        commissionList={`/catcher-errands/${userID}`}
        page3="APPLICATIONS"
        applicants={`/my-application/${userID}`}
        map={`/c-map/${userID}`}
        page4="MAP"
      /> */}
      <Map />
    </div>
  );
}

export default CatcherMap;
