import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";

function MapLibre({ getCoords }) {
  //event handler when user add marker
  //variables for map
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [API_KEY] = useState("ZQyqv6eWtI6zNE29SPDd");
  const [zoom] = useState(10);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [123.8854, 10.3157],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLng = position.coords.longitude;
        const currentLat = position.coords.latitude;
        getCoords(currentLat, currentLng);
        // getLat(currentLat);
        // getLong(currentLng);

        const marker = new maplibregl.Marker({
          color: "#00FF00",
          draggable: true,
        }) // Set draggable to true
          .setLngLat([currentLng, currentLat])
          .setPopup(new maplibregl.Popup().setHTML("<h3>Add location</h3>"))
          .addTo(map.current);

        // Event listener for marker dragend event
        marker.on("dragend", () => {
          const newLngLat = marker.getLngLat();
          getCoords(newLngLat.lat, newLngLat.lng);
        });
      });
    }
  }, [API_KEY, zoom]);
  return (
    <div>
      <div ref={mapContainer} className="map-small" />
    </div>
  );
}

export default MapLibre;
