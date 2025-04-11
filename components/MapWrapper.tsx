import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { RestaurantData } from '../utils/fetchRestaurants';

interface MapWrapperProps {
  restaurants: RestaurantData[];
  center: [number, number];
  focusedRestaurant: RestaurantData | null;
}

const RecenterMap: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

// blue marker
const blueIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// red marker: focus
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapWrapper: React.FC<MapWrapperProps> = ({ restaurants, center, focusedRestaurant }) => {
  const defaultZoom = 15;

  return (
    <MapContainer
      center={center}
      zoom={defaultZoom}
      style={{ width: '100%', height: '400px' }}
      scrollWheelZoom={false}
    >
      <RecenterMap center={center} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {restaurants.map((r, i) => {
        const [lat, lng] = r.Coordinates.split(',').map(Number);
        const isFocused = focusedRestaurant && r.Restaurant === focusedRestaurant.Restaurant;
        return (
          <Marker key={i} position={[lat, lng]} icon={isFocused ? redIcon : blueIcon}>
            <Popup>
              <b>{r.Restaurant}</b>
              <br />
              {r.Location}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapWrapper;
