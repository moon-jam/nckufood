import React, { useState } from 'react';
import styles from '../styles/Filter.module.css';
import { FilterCriteria } from '../pages/index';
import { RestaurantData } from '../utils/fetchRestaurants';

interface FilterProps {
  restaurants: RestaurantData[];
  onSearch: (criteria: FilterCriteria) => void;
}

const Filter: React.FC<FilterProps> = ({ restaurants, onSearch }) => {
  const [localGenre, setLocalGenre] = useState<string>('');
  const [localLocation, setLocalLocation] = useState<string>('');
  const [localMinPrice, setLocalMinPrice] = useState<number>(0);
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(9999);

  const allGenres = Array.from(new Set(restaurants.map((r) => r.Genre)));
  const allLocations = Array.from(new Set(restaurants.map((r) => r.Location)));

  const handleSearch = () => {
    onSearch({
      genre: localGenre,
      location: localLocation,
      minPrice: localMinPrice,
      maxPrice: localMaxPrice,
    });
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterItems}>
        <div className={styles.filterItem}>
          <label>類別</label>
          <select value={localGenre} onChange={(e) => setLocalGenre(e.target.value)}>
            <option value="">全部類別</option>
            {allGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label>地點</label>
          <select value={localLocation} onChange={(e) => setLocalLocation(e.target.value)}>
            <option value="">全部地點</option>
            {allLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label>價格下限</label>
          <input
            type="number"
            value={localMinPrice}
            onChange={(e) => setLocalMinPrice(Number(e.target.value))}
            placeholder="0"
          />
        </div>

        <div className={styles.filterItem}>
          <label>價格上限</label>
          <input
            type="number"
            value={localMaxPrice}
            onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
            placeholder="9999"
          />
        </div>
      </div>
      <button onClick={handleSearch} className={styles.searchButton}>
        搜尋
      </button>
    </div>
  );
};

export default Filter;
