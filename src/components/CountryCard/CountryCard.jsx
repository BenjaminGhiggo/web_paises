import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/default-image.jpg';
import { getCountryImage } from '../../utils/unsplash';
import './CountryCard.scss';

const CountryCard = ({ country }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [flagUrl, setFlagUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getCountryImage(country.name);
      setImageUrl(image || defaultImage);
    };

    const fetchFlag = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${country.code}`);
        const data = await response.json();
        setFlagUrl(data[0].flags.png);
      } catch (error) {
        console.error('Error fetching flag from Rest Countries:', error);
      }
    };

    fetchImage();
    fetchFlag();
  }, [country.name, country.code]);

  return (
    <Link to={`/country/${country.code}`} className="country-card">
      <img src={imageUrl} alt={`${country.name}`} />
      <div className="country-info">
        <img src={flagUrl} alt={`${country.name} flag`} className="flag" />
        <div>
          <h3>{country.name}</h3>
          <p>{country.continent.name}</p>
        </div>
      </div>
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
