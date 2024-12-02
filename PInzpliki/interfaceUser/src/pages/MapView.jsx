import React, { useState, useEffect } from "react";
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import '../styles/App.css';
import Navbar from "../components/Navbar";
const MapView = () => {
  const [raports, setRaports] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [selectedRaport, setSelectedRaport] = useState(null);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const fetchRaports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/AllRaports');
        console.log('Fetched raports:', response.data);
        setRaports(response.data);
      } catch (error) {
        console.error('Błąd pobierania raportów:', error);
      }
    };

    fetchRaports();
  }, []);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const newCoordinates = await Promise.all(
        raports.map(async (raport) => {
          const { data } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
              address: raport.address,
              key: googleMapsApiKey
            }
          });
          const location = data.results[0]?.geometry.location;
          return { ...raport, lat: location.lat, lng: location.lng };
        })
      );
      setCoordinates(newCoordinates);
    }; 

    if (raports.length > 0) {
      fetchCoordinates();
    }
  }, [raports]);

  const getIcon = (category) => {
    switch (category) {
      case 'Parkowanie':
        return '/Public/Parking.jpg';
    case 'Drogi':
      return'/Public/road.jpg'
    case 'Komunikacja':
      return'/Public/bus.jpg'
    case 'Śmieci':
      return'/Public/trash.jpg'
    case 'Zwierzęta':
      return '/Public/animal.jpg'
    case 'Porządek i bezpieczeństwo':
      return 'Public/shield.jpg'
    case 'Inne':
      return'/Public/inne.jpg'
    }
  };




  const pszczynaPosition = { lat: 49.980, lng: 18.949 };

  const containerStyle = {
    width: '100%',
    height: '100vh'
  };

  return (
    <>
    <Navbar/>
    <div className="container">
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={pszczynaPosition}
          zoom={13}
            mapTypeId="hybrid"
            
        >
          {coordinates.map((raport, index) => (
            <Marker 
              key={index}
              position={{ lat: raport.lat, lng: raport.lng }}
              onClick={() => setSelectedRaport(raport)}
              icon={{
                url: getIcon(raport.category),
                scaledSize: new window.google.maps.Size(30, 30)
              }}
            />
          ))}

          {selectedRaport && (
            <InfoWindow
              position={{ lat: selectedRaport.lat, lng: selectedRaport.lng }}
              onCloseClick={() => setSelectedRaport(null)}
            >
              <div>
                <h2>{selectedRaport.category}</h2>
                <p>{selectedRaport.date.substring(0, 10)}</p>
                <p>{selectedRaport.description}</p>
                
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
    </>
  );
};

export default MapView;
