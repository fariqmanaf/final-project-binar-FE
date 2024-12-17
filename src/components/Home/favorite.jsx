import React, { useEffect, useState } from 'react';
import CardFav from './CardFav';
import { getFavoriteDestination } from '@/Services/home/favoriteDestination';

const Favorite = ({ continent }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const data = await getFavoriteDestination(continent, nextCursor);
        setFavorites((prevFavorites) => [...prevFavorites, ...data]);
        setNextCursor(data.nextCursor);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [continent, nextCursor]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <h1>Destinasi Favorite</h1>
        <div></div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {favorites.map((fav, index) => (
          <CardFav key={index} fav={fav} labelImage={fav.labelImage} />
        ))}
      </div>
    </>
  );
};

export default Favorite;
