import apiKey from '../apiKey.js';
import { captureFavorites } from '../actions/movieActions/movieActions';

export const fetchRecentMovies = async () => {
  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
    const response = await fetch(url);
    const recentMovies = await response.json();
    return recentMovies;
  } catch (error) {
    throw new Error('Failed to Fetch');
  }
};

export const addFavorite = async (movie, userId) => {
  try {
    const favoritesUrl = 'http://localhost:3000/api/users/favorites/new';
    const options = {
      method: 'POST',
      body: JSON.stringify(
        {
          movie_id: movie.id,
          user_id: userId,
          title: movie.title,
          poster_path: movie.poster,
          release_date: movie.releaseDate,
          vote_average: movie.vote,
          overview: movie.overview
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch(favoritesUrl, options);
    if (!response.ok) {
      throw Error(`${response.status}`);
    }

    return response.id;
  } catch (error) {
    throw new Error(`Failed to fetch. (error: ${error.message})`);
  }
};

export const fetchFavorites = async (userId) => {
  const favoritesUrl = `http://localhost:3000/api/users/${userId}/favorites`;
  const response = await fetch(favoritesUrl);
  const favoritesList = await response.json();
  return favoritesList.data;
};
