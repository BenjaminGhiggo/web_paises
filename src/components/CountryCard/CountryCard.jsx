import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import defaultImage from '../../assets/default-image.jpg';
import { getCountryImage } from '../../utils/unsplash';
import './CountryCard.scss';

const CountryCard = ({ country, onSelect }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [flagUrl, setFlagUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getCountryImage(country.name);
      setImageUrl(image || defaultImage);
    };

    // Usamos la API de Flagpedia para obtener la bandera
    const fetchFlag = () => {
      const flagUrl = `https://flagpedia.net/data/flags/h80/${country.code.toLowerCase()}.png`;
      setFlagUrl(flagUrl);
    };

    fetchImage();
    fetchFlag();
  }, [country.name, country.code]);

  return (
    <div className="country-card" onClick={() => onSelect(country)}>
      <img src={imageUrl} alt={`${country.name}`} />
      <div className="country-info">
        <img src={flagUrl} alt={`${country.name} flag`} className="flag" />
        <div>
          <h3>{country.name}</h3>
          <p>{country.continent.name}</p>
        </div>
      </div>
    </div>
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
  onSelect: PropTypes.func.isRequired,
};

export default CountryCard;
