import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/default-image.jpg';
import { getCountryImage } from '../../utils/unsplash';
import './CountryCard.scss';

const CountryCard = ({ country }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getCountryImage(country.name);
      setImageUrl(image || defaultImage);
    };

    fetchImage();
  }, [country.name]);

  return (
    <Link to={`/country/${country.code}`} className="country-card">
      <img src={imageUrl} alt={`${country.name}`} />
      <h3>{country.name}</h3>
      <p>{country.continent.name}</p>
    </Link>
  );
};

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
