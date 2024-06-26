import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import defaultImage from '../../assets/default-image.jpg';
import { getCountryImage } from '../../utils/unsplash';
import './CountryDetailPanel.scss';

const CountryDetailPanel = ({ country, onClose }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getCountryImage(country.name);
      setImageUrl(image || defaultImage);
    };

    fetchImage();
  }, [country.name]);

  return (
    <div className="country-detail-panel">
      <button className="close-button" onClick={onClose}>×</button>
      <div className="country-header">
        <img src={imageUrl} alt={`${country.name}`} className="country-image" />
      </div>
      <div className="country-content">
        <div className="country-flag-title">
          <img 
            src={`https://flagpedia.net/data/flags/h80/${country.code.toLowerCase()}.png`} 
            alt={`${country.name} flag`} 
            className="country-flag"
          />
          <div className="country-title">
            <h2>{country.name}</h2>
            <p>{country.continent.name}</p>
          </div>
        </div>
        <div className="country-info">
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Language:</strong> {country.languages.map(lang => lang.name).join(', ')}</p>
          <p><strong>Population:</strong> {country.population}</p>
          <p><strong>Currency:</strong> {country.currency}</p>
          <p><strong>Region:</strong> {country.awsRegion}</p>
        </div>
      </div>
    </div>
  );
};

CountryDetailPanel.propTypes = {
  country: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    capital: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
    population: PropTypes.string,
    currency: PropTypes.string,
    awsRegion: PropTypes.string,
    continent: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CountryDetailPanel;
