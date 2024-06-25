import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'l03Gxngtesi2zJm9c8VwQBJz0XfFpDBn85YwFHwOvMs'; // Clave de acceso de Unsplash

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
});

const imageCache = {};
let lastRequestTime = 0;
const REQUEST_DELAY = 1000; // 1 segundo de retraso entre solicitudes

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handleRateLimit = async (retryAfter) => {
  console.warn(`Rate limit exceeded. Retrying after ${retryAfter} seconds.`);
  await delay(retryAfter * 1000); // Convertir a milisegundos
};

export const getCountryImage = async (countryName) => {
  if (imageCache[countryName]) {
    return imageCache[countryName];
  }

  const now = Date.now();
  if (now - lastRequestTime < REQUEST_DELAY) {
    await delay(REQUEST_DELAY - (now - lastRequestTime));
  }

  lastRequestTime = Date.now();

  try {
    const response = await unsplash.get('/search/photos', {
      params: { query: countryName, per_page: 1 },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    const imageUrl = response.data.results.length > 0 ? response.data.results[0].urls.small : null;
    imageCache[countryName] = imageUrl;
    return imageUrl;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403 && error.response.data === 'Rate Limit Exceeded') {
        const retryAfter = parseInt(error.response.headers['x-ratelimit-reset'], 10) - Math.floor(Date.now() / 1000);
        if (!isNaN(retryAfter) && retryAfter > 0) {
          await handleRateLimit(retryAfter);
          return getCountryImage(countryName); // Reintentar después de manejar el límite de tasa
        }
      } else if (error.response.status === 403) {
        console.error('Error 403: Forbidden. Please check your Unsplash Access Key.');
      }
      console.error(`Error ${error.response.status}: ${error.response.data}`);
    } else {
      console.error('Error fetching image from Unsplash:', error.message);
    }
    return null;
  }
};
