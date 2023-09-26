import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './PostCommission.css'; // Import your CSS file

const PostCommission = () => {
    const [commission, setCommission] = useState({
        empID: "",
        comTitle: "",
        comDeadline: "",
        comLocation: "",
        comType: "",
        comDescription: "",
        comPay: "",
        DatePosted: "",
        DateCompleted: "",
        Contactno: "",
        comLong: "",
        comLat: "",
    });

    const navigate = useNavigate();
    //get user id from url
    const location = useLocation();
    const userID = location.pathname.split("/")[2];
    //use state for adding marker
    const [addingMarker, setAddingMarker] = useState(false);
    const [lng, setLng] = useState(123.8854);
    const [lat, setLat] = useState(10.3157);

    // Event handler to toggle marker adding mode
    const handleAddMarkerClick = () => {
      console.log("Add Marker button clicked");
      setAddingMarker(!addingMarker); // Toggle the mode
  };

  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);


    // Add a state to track the marker's longitude and latitude
    const [markerLngLat, setMarkerLngLat] = useState([123.8854, 10.3157]); // Default values

    const handleChange = (e) => {
        if (e.target.name === 'comType') {
            setCommission((prev) => ({ ...prev, comType: e.target.value }));
        } else {
            setCommission((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    //store the inputted info to db
    //trigers when clicked
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const currentDate = getCurrentDate();
            const updatedCommission = {
                ...commission,
                DatePosted: currentDate,
                empID: userID,
            };

            await axios.post('http://localhost:8800/commission', updatedCommission);
            navigate(`/commissions/${userID}`);
        } catch (err) {
            console.log(err);
        }
    };
    //event handler when user add marker
    const handleMapClick = (e) => {
      if (addingMarker) {
          const { lng, lat } = e.lngLat;
  
          // If there's no existing marker, create a new marker
          if (!markerLngLat) {
              setMarkerLngLat([lng, lat]);
          } else {
              // Move the existing marker to the new location
              setMarkerLngLat([lng, lat]);
          }
  
          // Log the longitude and latitude
          console.log('Clicked at Longitude:', lng);
          console.log('Clicked at Latitude:', lat);
  
          setCommission((prev) => ({ ...prev, comLong: lng, comLat: lat }));
          setAddingMarker(false); // Disable marker adding mode after adding or moving the marker
      }
  };

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [API_KEY] = useState('ZQyqv6eWtI6zNE29SPDd');
    const [zoom] = useState(10);

    useEffect(() => {
      if (map.current) return;
  
      map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
          center: markerLngLat,
          zoom: zoom,
      });
  
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
  
      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(position => {
              const currentLng = position.coords.longitude;
              const currentLat = position.coords.latitude;
  
              const marker = new maplibregl.Marker({ color: "#00FF00", draggable: true }) // Set draggable to true
                  .setLngLat([currentLng, currentLat])
                  .setPopup(new maplibregl.Popup().setHTML("<h3>Add location</h3>"))
                  .addTo(map.current);
  
              setCurrentLocationMarker(marker);
  
              // Event listener for marker dragend event
              marker.on('dragend', () => {
                  const newLngLat = marker.getLngLat();
                  setCommission(prev => ({ ...prev, comLong: newLngLat.lng, comLat: newLngLat.lat }));
              });
          });
      }
  }, [API_KEY, zoom]);

    // Handle dragend event of the marker to update coordinates
    useEffect(() => {
      if (currentLocationMarker) {
          currentLocationMarker.on('dragend', () => {
              const newLngLat = currentLocationMarker.getLngLat();
              setCommission(prev => ({ ...prev, comLong: newLngLat.lng, comLat: newLngLat.lat }));
          });
      }
  }, [currentLocationMarker]);

    return (

        <div className='backhome'>
            <nav>
                <Link to='/accounts'>BACK</Link>
                <Link to='/'>HOME</Link>
            </nav>
            <h1>Post Commission</h1>
            <div className='in'>
                <label className='pc'>Commission Title<input type="text" placeholder='Commission Title' onChange={handleChange} name='comTitle'/>
                </label> 
                <br />
                <label className='pc'>Deadline<input type="date" placeholder='Deadline' onChange={handleChange} name='comDeadline'/>
                </label>
                <br />
                <label className='pc'>Location
                    <input type="text" placeholder='Location' onChange={handleChange} name='comLocation'/>
                </label>
                <br />
                <label className='pc' htmlFor="">
                    Commission Type
                    <select name='comType' onChange={handleChange} value={commission.comType}>
                        <option value="">Choose type....</option>
                        <option value="HomeService - Indoor">Home Service - Indoor</option>
                        <option value="HomeService - Outdoor">Home Service - Outdoor</option>
                        <option value="Delivery">Delivery Service</option>
                        <option value="Transport">Transport Service</option>
                    </select>
                </label>
                <br />
                <div class="textarea-container">
                <label className='pc'> Description
                    <textarea cols='20' rows='11' type="text" placeholder='Description' onChange={handleChange} name='comDescription'/>
                </label>
                </div>
                <br />
                <label className='pc'>
                    Amount: ₱
                    <input type='number' placeholder='0.00' onChange={handleChange} name='comPay'/>
                </label>
                <br />
                <label className='pc'>Contact Number
                    <input type="tel" placeholder='Contact Number' onChange={handleChange} name='Contactno'/>
                </label>
                <br />
                <div className="map-post-wrap">
                    <div ref={mapContainer} className="map" />
                </div>
                <button onClick={handleAddMarkerClick}>Add Marker</button>
                <label>
                    <p>X: {commission.comLong}</p>
                </label>
                <label>
                    <p>Y: {commission.comLat}</p>
                </label>
                <button onClick={handleClick}>POST</button>
            </div>
        </div>
    );
};

export default PostCommission;
