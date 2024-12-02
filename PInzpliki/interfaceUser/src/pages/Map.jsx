import { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import '../styles/App.css';
function Maps({ onAddressSelect, category }) {
  const pszczynaPosition = { lat: 49.980, lng: 18.949 };
  const [open, setOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setAddress] = useState('');

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const geocodeLatLng = useCallback((latLng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setAddress(results[0].formatted_address);
          onAddressSelect(results[0].formatted_address);
        } else {
          console.log("No results");
        }
      } else {
        console.log("Geocoding failed:", status);
      }
    });
  }, [onAddressSelect]);


  const getIcon = () => {
    switch (category) {
      case 'Parkowanie':
        return '/Public/Parking.jpg';
      case 'Drogi':
        return '/Public/road.jpg';
      case 'Komunikacja':
        return '/Public/bus.jpg';
      case 'Śmieci':
        return '/Public/trash.jpg';
      case 'Zwierzęta':
        return '/Public/animal.jpg';
      case 'Porządek i bezpieczeństwo':
        return '/Public/shield.jpg';
      case 'Inne':
        return '/Public/inne.jpg';
      default:
        return '';
    }
  };

  const containerStyle = {
    width: '100%',
    height: '100vh'
  };

  const onLoad = useCallback((map) => {
    map.data.loadGeoJson('coordinates.json');
    map.data.setStyle({
      fillColor: "#FF0000",
      strokeColor: "#FF0000",
      strokeWeight: 2,
      fillOpacity: 0.15
    });
    
    map.data.addListener('click', (event) => {
      const latLng = event.latLng;
      setMarkerPosition({ lat: latLng.lat(), lng: latLng.lng() });
      setOpen(true);
      geocodeLatLng(latLng);
    });
  }, [geocodeLatLng]);

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={pszczynaPosition}
        zoom={13.5}
        onLoad={onLoad}
        mapTypeId="hybrid"
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            onClick={() => setOpen(true)}
            icon={{
              url: getIcon(),
              scaledSize: new window.google.maps.Size(30, 30)
            }}
          />
        )}
        {open && markerPosition && (
          <InfoWindow position={markerPosition} onCloseClick={() => setOpen(false)}>
            <p>Wybrany punkt: {address}</p>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default Maps;
