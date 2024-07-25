import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./css/map.css";
import Filter from "./Filter";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "./css/MapBox.css";

//for map pages
export default function Map(props) {
  return (
    <>
      <div className="map-wrap">
        <div div className="map__filter">
          <Filter onFilterChange={props.change} />
        </div>

        <div ref={props.mapContainer} className="map" />
      </div>
    </>
  );
}
//for Landing page
export function LandingMap() {
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
//view errand
export function ViewMap({ id }) {
  const [long, setLong] = useState(null);
  const [lat, setLat] = useState(null);
  //get the coordinates of the cerrand
  const fetchLoc = async () => {
    try {
      const response = await fetch(`http://localhost:8800/errand/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  //MAP
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

    //display the current coordinate of the errand
    fetchLoc().then((commissions) => {
      commissions.forEach((commission) => {
        const currentLng = commission.commissionLong;
        const currentLat = commission.commissionLat;
        setLat(currentLat);
        setLong(currentLng);
        new maplibregl.Marker({
          color: "#FF0000",
          //draggable: true,
        }) // Red marker for commissions
          .setLngLat([currentLng, currentLat])
          .setPopup(
            new maplibregl.Popup().setHTML(`<h3>The Errand is here!</h3>`)
          )
          .addTo(map.current);
      });
    });
  }, [API_KEY, zoom]);

  return (
    <>
      <div className="map--wrap">
        <div ref={mapContainer} className="map-small" />
        <p className="coords">
          X: {long} Y: {lat}
        </p>
      </div>
    </>
  );
}

//view
//for errand page
//delivery/transpo type obly
export function MapLibre({ getCoords }) {
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
  }, [API_KEY, zoom, getCoords]);
  return (
    <div>
      <div ref={mapContainer} className="map-small" />
    </div>
  );
}

//Update errand map
//for Transpo/Deliveru errand type map
export function ViewMapBox({
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

//post errand
//For transpo/delivery type errand only
export function PostMapBox({ accessToken, getDistanceCallback }) {
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
