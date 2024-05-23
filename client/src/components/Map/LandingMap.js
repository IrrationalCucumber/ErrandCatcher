import React, { useRef, useEffect, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import axios from "axios";
import "./css/map.css";
import Filter from "./Filter";

function LandingMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(123.8854);
  const [lat] = useState(10.3157);
  const [zoom] = useState(10);
  const [API_KEY] = useState("ZQyqv6eWtI6zNE29SPDd");
  const [errands, setErrands] = useState([]);

  useEffect(() => {
    //fetch all errands
    //regardless of status
    //change api endpoint to "/available/" for available only
    const fetchErrands = async () => {
      try {
        const response = await axios.get("http://localhost:8800/errands/");
        setErrands(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchErrands();
    //refresh map for 5 sec
    const interval = setInterval(fetchErrands, 5000);
    return () => clearInterval(interval);
  }, []);
  //filter
  const [filter, setFilter] = useState([]); // State to store filtered errands
  const handleChange = (e) => {
    setFilter(e);
  };

  // Search commmissions using JS filter method //
  const filterErrand = errands.filter((errand) => {
    const type = errand.commissionType.includes(filter);
    return /**titleMatches && locationMatches && priceMatches &&*/ type;
  });
  // display errand location markers to map
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
    <>
      <div className="map-wrap">
        <div>
          <Filter onFilterChange={handleChange} />
        </div>
        <div ref={mapContainer} className="map-landing" />
      </div>
    </>
  );
}

export default LandingMap;
