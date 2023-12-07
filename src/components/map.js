import React, {Component} from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// navigator.geolocation.getCurrentPosition(position => {
//     const { latitude, longitude } = position.coords;
//     // Show a map centered at latitude / longitude.
//   });

const containerStyle = {
    width: '700px',
    height: '400px'
  };
  
  const center = {
    lat: 14.018000,
    lng: 120.835941
  };
  
function MyComponent() {
return (
    <LoadScript
    googleMapsApiKey="AIzaSyC_NLQDH12JUt7zJDLMLnxhfYzJsnH-fVA"
    >
    <GoogleMap
        mapContainerStyle={watchId}
        center={center}
        zoom={14}
    >
        <></>
    </GoogleMap>
    </LoadScript>
)
}
  
export default MyComponent