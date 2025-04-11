import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Filter from '../components/Filter';
import MapView from '../components/MapView';
import RestaurantCard from '../components/RestaurantCard';
import { fetchRestaurants, RestaurantData } from '../utils/fetchRestaurants';
import styles from '../styles/Home.module.css';

export type FilterCriteria = {
  genre: string;
  location: string;
  minPrice: number;
  maxPrice: number;
};

const parseCoordinates = (coordStr: string): [number, number] => {
  const parts = coordStr.split(',').map(s => parseFloat(s.trim()));
  return [parts[0], parts[1]];
};

interface HomeProps {
  restaurants: RestaurantData[];
}

const Home: React.FC<HomeProps> = ({ restaurants }) => {
  const [displayRestaurants, setDisplayRestaurants] = useState<RestaurantData[]>(restaurants);
  const [mapCenter, setMapCenter] = useState<[number, number]>([22.999117933453782, 120.21709245159849]);
  const [focusedRestaurant, setFocusedRestaurant] = useState<RestaurantData | null>(null);

  const handleSearch = (criteria: FilterCriteria) => {
    const filtered = restaurants.filter((r) => {
      const genreMatch = criteria.genre ? r.Genre === criteria.genre : true;
      const locationMatch = criteria.location ? r.Location === criteria.location : true;
      const priceMatch = r.Price >= criteria.minPrice && r.Price <= criteria.maxPrice;
      return genreMatch && locationMatch && priceMatch;
    });
    // Fisher–Yates 
    const randomized = filtered.slice();
    for (let i = randomized.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomized[i], randomized[j]] = [randomized[j], randomized[i]];
    }
    setDisplayRestaurants(randomized);
    setFocusedRestaurant(null);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>成大隨機點餐系統</h1>

        <Filter restaurants={restaurants} onSearch={handleSearch} />

        {displayRestaurants.length === 0 && (
          <p className={styles.noResult}>找不到符合條件的餐廳，請嘗試其他選項。</p>
        )}

        {/* send mapCenter and focusedRestaurant to MapView */}
        {displayRestaurants.length > 0 && (
          <MapView
            restaurants={displayRestaurants}
            center={mapCenter}
            focusedRestaurant={focusedRestaurant}
          />
        )}

        <div className={styles.listContainer}>
          {displayRestaurants.map((restaurant, index) => (
            <RestaurantCard
              key={index}
              restaurant={restaurant}
              isFocused={focusedRestaurant ? (restaurant.Restaurant === focusedRestaurant.Restaurant) : false}
              onFocus={(res) => {
                setMapCenter(parseCoordinates(res.Coordinates));
                setFocusedRestaurant(res);
              }}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const restaurants = await fetchRestaurants();
  return {
    props: {
      restaurants,
    },
  };
};

export default Home;
