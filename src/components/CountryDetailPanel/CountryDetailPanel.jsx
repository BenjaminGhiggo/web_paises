import PropTypes from 'prop-types';
import React from 'react';
import './CountryDetailPanel.scss';

const CountryDetailPanel = ({ country, onClose }) => {
  console.log('Datos del país para el panel de detalles:', country);

  return (
    <div className="country-detail-panel">
      <button className="close-button" onClick={onClose}>×</button>
      <div className="country-header">
        <img src={`https://flagpedia.net/data/flags/h80/${country.code.toLowerCase()}.png`} alt={`${country.name} flag`} />
        <div>
          <h2>{country.name}</h2>
          <p>{country.continent.name}</p>
        </div>
      </div>
      <div className="country-info">
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Language:</strong> {country.languages.map(lang => lang.name).join(', ')}</p>
        <p><strong>Currency:</strong> {country.currency}</p>
        <p><strong>Region:</strong> {country.awsRegion}</p>
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
    currency: PropTypes.string,
    awsRegion: PropTypes.string,
    continent: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CountryDetailPanel;
