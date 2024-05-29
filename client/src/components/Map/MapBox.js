import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import * as MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import axios from "axios";
import "./css/MapBox.css";

export default function Map({ accessToken, getDistanceCallback }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Initial state of map, e.g position and zoom
  const [lng, setLng] = useState(123.8983);
  const [lat, setLat] = useState(10.2981);
  const [zoom, setZoom] = useState(16.5);

  const directions = useRef(null);
  //   const [isReady, setReady] = useState(false);
  //   const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      accessToken,
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // Controller at the top-left corner of the map. Object responsible for origin, destination, distance and etc.
    directions.current = new MapboxDirections({
      accessToken,
      controls: {
        unit: "metric",
        instructions: false,
        profileSwitcher: false,
      },
    });

    directions.current.on("route", (e) => {
      const route = e.route[0];

      //console.log(route);

      // Accessing coordinates of origin and destination
      const originCoordinates = route.legs[0].steps[0].maneuver.location;
      const destinationCoordinates =
        route.legs[0].steps[route.legs[0].steps.length - 1].maneuver.location;

      //getLngLat(startLat, startLng, endLng, endLat);
      getDistanceCallback(
        route.distance,
        originCoordinates,
        destinationCoordinates
      );

      // console.log("Origin Coordinates:", originCoordinates);
      // console.log("Destination Coordinates:", destinationCoordinates);
    });

    map.current.addControl(directions.current);
  });

  return (
    <div className="main-map">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" id="map-container" />
    </div>
  );
}

// Function to handle onClick button events, e.g when the user wants to pay
export function handlePayment(distance) {
  // backend route to receive and process payment
  const paymentUrl = "http://localhost:8800/process-payment";

  // Change the amount
  const amount = 100;

  axios
    .post(paymentUrl, { distance: distance, amount: amount })
    .then((response) => {
      window.open(response.data.url);
    });
}
