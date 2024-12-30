import React, { useRef, useEffect, useState } from "react";
import Map from "../../components/Map/Map.js";
import { useAuth } from "../../components/AuthContext";
import maplibregl from "maplibre-gl";
import axios from "axios";
import "./style.css";

function CatcherMap() {
  const { user } = useAuth();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(123.8854);
  const [lat, setLat] = useState(10.3157);
  const [zoom] = useState(10);
  const [API_KEY] = useState("ZQyqv6eWtI6zNE29SPDd");
  const [errands, setErrands] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [proximity, setProximity] = useState(10); // Proximity in kilometers
  const [filter, setFilter] = useState(""); // State for type filter

  // Fetch errands from the API
  useEffect(() => {
    const fetchErrands = async () => {
      try {
        const response = await axios.get("http://localhost:8800/available/");
        setErrands(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchErrands();

    // Refresh map every 5 seconds
    // const interval = setInterval(fetchErrands, 5000);
    // return () => clearInterval(interval);
  }, []);

  // Get user's current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLat(latitude);
          setLng(longitude);
        },
        (err) => {
          console.error("Error getting user location:", err);
        }
      );
    }
  }, []);

  // Function to calculate distance between two coordinates
  // (Haversine formula)
  const haversineDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in km
    const toRad = (deg) => (deg * Math.PI) / 180; //to radious

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Filter errands based on proximity and type
  const filterErrand = errands
    .filter((errand) => {
      const distance = haversineDistance(
        userLocation.lat,
        userLocation.lng,
        errand.commissionLat,
        errand.commissionLong
      );
      const matchesProximity = distance <= proximity; // Filter by proximity
      const matchesType = filter
        ? errand.commissionType.includes(filter)
        : true; // Filter by type
      return matchesProximity && matchesType; // Combine both filters
    })
    .sort((a, b) => {
      // Sort errands by proximity
      const distanceA = haversineDistance(
        userLocation.lat,
        userLocation.lng,
        a.commissionLat,
        a.commissionLong
      );
      const distanceB = haversineDistance(
        userLocation.lat,
        userLocation.lng,
        b.commissionLat,
        b.commissionLong
      );
      return distanceA - distanceB;
    });

  // Initialize and update map with markers
  useEffect(() => {
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.addControl(new maplibregl.NavigationControl(), "top-right");
      map.current.addControl(new maplibregl.GeolocateControl(), "top-right"); // Button to get location
    }

    let markers = []; // Array to store markers

    // Clear markers
    map.current?.markers?.forEach((marker) => marker.remove());

    // Add markers for filtered errands
    filterErrand.forEach((errand) => {
      // Create a new popup for hover
      const hoverPopup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 15, // Optional: Position offset
      }).setHTML(`<div class="map-popup">
        <h2 class="map-popup__h2">${errand.commissionTitle}</h2>
        <h4>Php ${errand.commissionPay}</h4>
        <p>${errand.commissionDesc}</p>
        <a href="/errand/view/${errand.commissionID}">View</a></div>`); // Simple hover content
      //pop up
      const marker = new maplibregl.Marker({ color: "#FF0000" }) // Red marker for commissions
        .setLngLat([errand.commissionLong, errand.commissionLat])
        .setPopup(
          new maplibregl.Popup().setHTML(
            `<div class="map-popup">
            <h2 class="map-popup__h2">${errand.commissionTitle}</h2>
            <h4>Php ${errand.commissionPay}</h4>
            <p>${errand.commissionDesc}</p>
            <a href="/errand/view/${errand.commissionID}">View</a></div>`
          )
        )
        .addTo(map.current);
      // Add hover event for the marker
      marker.getElement().addEventListener("mouseenter", () => {
        hoverPopup
          .setLngLat([errand.commissionLong, errand.commissionLat])
          .addTo(map.current);
      });

      marker.getElement().addEventListener("mouseleave", () => {
        hoverPopup.remove(); // Remove popup on mouse leave
      });

      markers.push(marker); // Add marker to markers array
    });

    // Store markers in the map object for future reference
    map.current.markers = markers;
  }, [API_KEY, filterErrand, lat, lng, zoom]);

  return (
    <>
      {/* Map Container */}
      <Map
        mapContainer={mapContainer}
        className="map-container"
        prox={proximity}
        setProximity={(e) => setProximity(Number(e.target.value))}
        change={(value) => setFilter(value)} // Pass filter change handler
      />
    </>
  );
}

export default CatcherMap;
