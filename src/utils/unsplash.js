import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'l03Gxngtesi2zJm9c8VwQBJz0XfFpDBn85YwFHwOvMs'; // Clave de acceso de Unsplash

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

export const getCountryImage = async (countryName) => {
  try {
    const response = await unsplash.get('/search/photos', {
      params: { query: countryName, per_page: 1 },
    });
    return response.data.results.length > 0 ? response.data.results[0].urls.small : null;
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return null;
  }
};
