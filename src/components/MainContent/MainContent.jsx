import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CountryCard from '../../components/CountryCard/CountryCard';
import './MainContent.scss';

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      continent {
        name
      }
    }
  }
`;

const MainContent = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando:', searchQuery);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="main-content">
      <div className="search-bar">
        <input
          type="text"
          placeholder="País"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div className="countries-grid">
        {data.countries
          .filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(country => (
            <CountryCard key={country.code} country={country} />
          ))}
      </div>
    </div>
  );
};

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContent;
