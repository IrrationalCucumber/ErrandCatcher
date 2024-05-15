import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./css/map.css";
import Filter from "./Filter";

export default function Map(props) {
  return (
    <>
      <div className="map-wrap">
        <Filter onFilterChange={props.change} />
        <div ref={props.mapContainer} className="map" />
      </div>
    </>
  );
}
