import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import CountryCard from '../../components/CountryCard/CountryCard';
import CountryDetailPanel from '../../components/CountryDetailPanel/CountryDetailPanel';
import './MainContent.scss';

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      continent {
        name
      }
      capital
      languages {
        name
      }
      currency
      awsRegion
    }
  }
`;

const MainContent = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando:', searchQuery);
  };

  const handleCountrySelect = (country) => {
    console.log('País seleccionado:', country);
    setSelectedCountry(country);
  };

  const handleClosePanel = () => {
    setSelectedCountry(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="main-content">
      <div className="search-bar">
        <div className="search-input">
          <input
            type="text"
            placeholder="Escribe el país que deseas ver"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <label>País</label>
        </div>
        <button onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34C15.2 5.01 13.19 3 10.75 3S6.3 5.01 6.3 8.25 8.31 13.5 10.75 13.5c1.61 0 3.06-.67 4.05-1.75l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10.75 11.5c-1.79 0-3.25-1.46-3.25-3.25S8.96 5 10.75 5s3.25 1.46 3.25 3.25-1.46 3.25-3.25 3.25z"/>
          </svg>
          Buscar
        </button>
      </div>
      <div className="countries-grid">
        {data.countries
          .filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(country => (
            <CountryCard key={country.code} country={country} onSelect={handleCountrySelect} />
          ))}
      </div>
      {selectedCountry && (
        <CountryDetailPanel country={selectedCountry} onClose={handleClosePanel} />
      )}
    </div>
  );
};

export default MainContent;
