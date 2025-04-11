import csv from 'csv-parser';
import { Readable } from 'stream';

export type RestaurantData = {
  Restaurant: string;
  Location: string;
  Genre: string;
  Price: number;
  GoogleMapsUrl: string;
  Coordinates: string;
};

export async function fetchRestaurants(): Promise<RestaurantData[]> {
  const CSV_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQDJPJrCZO92Uj6Mo3PqyQAOVt5BzIgAtR9C6yRna3jzlxBrYYHwjAJQrLra13A7tChulUo1utEgO6r/pub?output=csv';

  const res = await fetch(CSV_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch CSV data: ${res.statusText}`);
  }
  const csvText = await res.text();

  return new Promise((resolve, reject) => {
    const results: RestaurantData[] = [];
    const stream = Readable.from([csvText]);
    stream
      .pipe(csv())
      .on('data', (data) => {
        const requiredFields = ['Restaurant', 'Location', 'Genre', 'Price', 'Google Maps URL', 'Coordinates'];
        const isEmpty = requiredFields.every(
          (field) => !data[field] || data[field].toString().trim() === ''
        );
        if (isEmpty) return;

        results.push({
          Restaurant: data['Restaurant'],
          Location: data['Location'],
          Genre: data['Genre'],
          Price: Number(data['Price']),
          GoogleMapsUrl: data['Google Maps URL'],
          Coordinates: data['Coordinates'],
        });
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}
