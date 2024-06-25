import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCountryImage } from '../../utils/unsplash';
import './CountryCard.scss';

// Componente funcional que muestra una tarjeta de país con enlace a detalles
const CountryCard = ({ country }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getCountryImage(country.name);
      setImageUrl(image);
    };

    fetchImage();
  }, [country.name]);

  return (
    <Link to={`/country/${country.code}`} className="country-card">
      {imageUrl && <img src={imageUrl} alt={`${country.name}`} />}
      <h3>{country.name}</h3>
      <p>{country.continent.name}</p>
    </Link>
  );
};

// Definición de PropTypes para la validación de propiedades
CountryCard.propTypes = {
  country: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    continent: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CountryCard;
