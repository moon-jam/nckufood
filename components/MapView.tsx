import React from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/MapView.module.css';
import { RestaurantData } from '../utils/fetchRestaurants';

interface MapViewProps {
  restaurants: RestaurantData[];
  center: [number, number];
  focusedRestaurant: RestaurantData | null;
}

const Map = dynamic(() => import('./MapWrapper'), {
  ssr: false,
});

const MapView: React.FC<MapViewProps> = ({ restaurants, center, focusedRestaurant }) => {
  return (
    <div className={styles.mapContainer}>
      <Map restaurants={restaurants} center={center} focusedRestaurant={focusedRestaurant} />
    </div>
  );
};

export default MapView;
