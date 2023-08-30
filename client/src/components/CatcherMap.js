import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
/**
 *  Need method to add longitude and latitude
 *  Employer can add marker in a map
 *  mini map in PostCommission
 */
export default function CatcherMap() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(123.8854);
    const [lat] = useState(10.3157);
    const [zoom] = useState(10);
    const [API_KEY] = useState('ZQyqv6eWtI6zNE29SPDd');

    useEffect(() => {
        if (map.current) return; // stops map from initializing more than once
      
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom
        });

        // Add control
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

        // Get current location using Geolocation API
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const currentLng = position.coords.longitude;
                const currentLat = position.coords.latitude;

                // Create a marker for the current location
                new maplibregl.Marker({ color: "#00FF00" })
                    .setLngLat([currentLng, currentLat])
                    .setPopup(new maplibregl.Popup().setHTML("<h3>Your Current Location</h3>"))
                    .addTo(map.current);
            });
        }
    }, [API_KEY, lat, lng, zoom]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    )
}
