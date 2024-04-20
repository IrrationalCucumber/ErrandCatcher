import React, { useRef, useEffect, useState } from "react";
import Map from "../../components/Map.js";
import { useAuth } from "../../components/AuthContext";
import maplibregl from "maplibre-gl";
//import NavBar from "../../components/Navbar/Navbar.js";

function CommissionMap() {
  const { user } = useAuth();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(123.8854);
  const [lat] = useState(10.3157);
  const [zoom] = useState(10);
  const [API_KEY] = useState("ZQyqv6eWtI6zNE29SPDd");

  const fetchCommissions = async () => {
    try {
      const response = await fetch("http://localhost:8800/errands/");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Fetch commission data and add markers
    fetchCommissions().then((commissions) => {
      commissions.forEach((commission) => {
        const marker = new maplibregl.Marker({ color: "#FF0000" }) // Red marker for commissions
          .setLngLat([commission.commissionLong, commission.commissionLat])
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<h3>${commission.commissionTitle}</h3><p>${commission.commissionDesc}</p>`
            )
          )
          .addTo(map.current);
      });
    });
    map.current.addControl(new maplibregl.GeolocateControl(), "top-right"); // button to get location
  }, [API_KEY, lat, lng, zoom]);
  return (
    <div>
      {/* <NavBar
        page1="REQUESTS"
        one={`/request/${userID}`}
        // {`admin-home/${userID}`}
        page2="ACCOUNTS"
        commissionList={`/accounts/${userID}`}
        page3="ERRANDS"
        applicants={`/commission-list/${userID}`}
        page4="MAP"
        map={`/map/${userID}`}
      /> */}
      <Map mapContainer={mapContainer} />
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
