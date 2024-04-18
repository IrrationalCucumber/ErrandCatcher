import React from "react";
import Map from "../../components/Map";
import NavBar from "../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";

/** update navbar for map
 * fix navbar map for:
 *  catcher
 *  admin
 *  employer
 */

function CommissionMap() {
  //carry id to other page
  // const location = useLocation();
  // const userID = location.pathname.split("/")[2];
  //pathname to array from
  return (
    <div>
      {/* <NavBar
        page1="HOME"
        home={`/admin-home/${userID}`}
        // {`admin-home/${userID}`}
        page2="ACCOUNTS"
        commissionList={`/accounts/${userID}`}
        page3="ERRANDS"
        applicants={`/commission-list/${userID}`}
        page4="MAP"
        map={`/map/${userID}`}
      /> */}
      <Map />
    </div>
  );
}

export default CommissionMap;

{
  /* <iframe width="500" height="300" src="https://api.maptiler.com/maps/streets-v2/?key=ZQyqv6eWtI6zNE29SPDd#0.2/-36.82166/14.10913"></iframe>
        <Map mapLib={maplibregl}
            initialViewState={{
                longitude: 16.62662018,
                latitude: 49.2125578,
                zoom: 14
            }}
        style={{width: "100%", height: "100vh"}}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=ZQyqv6eWtI6zNE29SPDd ">

    </Map> */
}
