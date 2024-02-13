import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const UserLocation = () => {
  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newUserLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setUserLocation(newUserLocation);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          console.error("User denied geolocation access");
        } else {
          console.error("Error getting user location:", error.message);
        }
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setUserLocation({ lat, lng });
  };

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={2.5}
      style={{
        height: "500px",
        width: "80%",
        margin: "50px auto",
      }}
      onClick={handleMapClick}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {userLocation.lat !== 0 && userLocation.lng !== 0 && (
        <Marker position={userLocation}>
          <Popup>Your Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default UserLocation;
