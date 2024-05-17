import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import axios from "axios";
import "./css/MapBox.css";

export default function Map({
  accessToken,
  getDistanceCallback,
  initialOrigin,
  initialDestination,
  interactive,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const directions = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      accessToken,
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [initialOrigin.lng, initialOrigin.lat],
      zoom: 10,
    });

    map.current.on("load", () => {
      console.log("Map loaded.");

      directions.current = new MapboxDirections({
        accessToken,
        interactive,
        unit: "metric",
        controls: {
          unit: "metric",
          instructions: false,
          profileSwitcher: false,
        },
      });

      map.current.addControl(directions.current, "top-left");

      if (initialOrigin && initialDestination) {
        directions.current.setOrigin([initialOrigin.lng, initialOrigin.lat]);
        directions.current.setDestination([
          initialDestination.lng,
          initialDestination.lat,
        ]);
      }

      directions.current.on("route", (e) => {
        if (e.route && e.route.length > 0) {
          const route = e.route[0];
          const distance = route.distance;
          const originCoordinates = route.legs[0].steps[0].maneuver.location;
          const destinationCoordinates =
            route.legs[0].steps[route.legs[0].steps.length - 1].maneuver
              .location;
          //   console.log(
          //     "Distance:",
          //     distance,
          //     "Origin:",
          //     originCoordinates,
          //     "Destination:",
          //     destinationCoordinates
          //   );
          getDistanceCallback(
            distance,
            originCoordinates,
            destinationCoordinates
          );
        }
      });
    });
  }, [accessToken, getDistanceCallback, initialOrigin, initialDestination]);

  return (
    <div className="main-map">
      <div className="sidebar">
        Longitude: {initialOrigin.lng} | Latitude: {initialOrigin.lat} | Zoom:
        10
      </div>
      <div
        ref={mapContainer}
        className="map-containers"
        style={{ width: "100%", height: "500px" }}
      />
    </div>
  );
}
