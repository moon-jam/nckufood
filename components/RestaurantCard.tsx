import React from 'react';
import styles from '../styles/RestaurantCard.module.css';

export type RestaurantData = {
  Restaurant: string;
  Location: string;
  Genre: string;
  Price: number;
  GoogleMapsUrl: string;
  Coordinates: string;
};

interface RestaurantCardProps {
  restaurant: RestaurantData;
  isFocused: boolean;
  onFocus: (restaurant: RestaurantData) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, isFocused, onFocus }) => {
  const handleCardClick = () => {
    if (!isFocused) {
      onFocus(restaurant);
    }
  };

  return (
    <div
      className={`${styles.card} ${isFocused ? styles.focused : ''}`}
      onClick={handleCardClick}
      tabIndex={0}
    >
      <h2 className={styles.cardTitle}>
        <a
          href={restaurant.GoogleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {restaurant.Restaurant}
        </a>
      </h2>
      <p>地點：{restaurant.Location}</p>
      <p>類別：{restaurant.Genre}</p>
      <p>價格：約 {restaurant.Price} 元</p>
    </div>
  );
};

export default RestaurantCard;
