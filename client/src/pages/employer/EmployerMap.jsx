import React, { useRef, useEffect, useState } from "react";
import Map from "../../components/Map/Map.js";
//import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../components/AuthContext";
import maplibregl from "maplibre-gl";
import axios from "axios";
import Filter from "../../components/Map/Filter.jsx";

function CommissionMap() {
  const { user } = useAuth();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(123.8854);
  const [lat] = useState(10.3157);
  const [zoom] = useState(10);
  const [API_KEY] = useState("ZQyqv6eWtI6zNE29SPDd");
  const [errands, setErrands] = useState([]);

  //fetch and store errand
  useEffect(() => {
    const fetchErrand = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/your-commission/" + user.userID
        );
        setErrands(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchErrand();
  }, []);
  /**
   * ERRAND MAP FILTER
   */
  //filter
  const [filter, setFilter] = useState([]); // State to store filtered errands
  const handleChange = (e) => {
    setFilter(e);
  };
  // Search commmissions using JS filter method //
  const filterErrand = errands.filter((errand) => {
    const type = errand.commissionType.includes(filter);
    // const titleMatches = commission.commissionTitle
    //   .toLowerCase()
    //   .includes(term.toLowerCase());

    return /**titleMatches && */ type;
  });
  //apply markers to map
  //add/remove markers based on filter
  useEffect(() => {
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: [lng, lat],
        zoom: zoom,
      });
      map.current.addControl(new maplibregl.NavigationControl(), "top-right");
      map.current.addControl(new maplibregl.GeolocateControl(), "top-right"); // button to get location
    }

    let markers = []; // Array to store markers
    // Clear existing markers
    map.current?.markers?.forEach((marker) => marker.remove());

    // Add markers for filtered errands
    filterErrand.forEach((errand) => {
      const marker = new maplibregl.Marker({ color: "#FF0000" }) // Red marker for commissions
        .setLngLat([errand.commissionLong, errand.commissionLat])
        .setPopup(
          new maplibregl.Popup().setHTML(
            `<h3>${errand.commissionTitle}</h3><p>${errand.commissionDesc}</p><a href="/errand/view-errand/${errand.commissionID}">View</a>`
          )
        )
        .addTo(map.current);
      markers.push(marker); // Add marker to markers array
    });
    // Store markers in the map object for future reference
    map.current.markers = markers;
  }, [API_KEY, filterErrand, lat, lng, zoom]);
  return (
    <div>
      {/* <Navbar
        page1="REQUESTS"
        one={`/request/${userID}`}
        page2="COMMISSIONS"
        commissionList={`/commissions/${userID}`}
        page3="APPLICANTS"
        applicants={`/applicants/${userID}`}
        page4="MAP"
        map={`/e-map/${userID}`}
      /> */}
      <Filter onFilterChange={handleChange} />
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
