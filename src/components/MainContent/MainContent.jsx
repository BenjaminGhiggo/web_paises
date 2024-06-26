import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ContinentFilterPanel from '../../components/ContinentFilterPanel/ContinentFilterPanel';
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

const continentMapping = {
  "Europa": "Europe",
  "América": ["South America", "North America"],
  "Asia": "Asia",
  "Oceanía": "Oceania",
  "África": "Africa"
};

const MainContent = ({ sidebarOpen }) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showContinentFilter, setShowContinentFilter] = useState(false);
  const [selectedContinents, setSelectedContinents] = useState([]);
  const continentFilterRef = useRef(null);

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

  const handleFocus = () => {
    setShowContinentFilter(true);
  };

  const handleContinentSelect = (continent) => {
    setSelectedContinents((prev) => {
      if (prev.includes(continent)) {
        return prev.filter((c) => c !== continent);
      } else {
        return [...prev, continent];
      }
    });
  };

  const handleClearFilter = () => {
    setSelectedContinents([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (continentFilterRef.current && !continentFilterRef.current.contains(event.target)) {
        setShowContinentFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [continentFilterRef]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const filteredCountries = data.countries.filter(country => {
    if (selectedContinents.length === 0) {
      return country.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      const continentNames = selectedContinents.flatMap(continent => continentMapping[continent]);
      return continentNames.includes(country.continent.name) &&
        country.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  return (
    <div className={`main-content-container ${sidebarOpen ? 'shifted' : ''}`}>
      <div className="main-content">
        <div className="search-bar">
          <div className="search-input">
            <input
              type="text"
              placeholder="Escribe el país que deseas ver"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleFocus}
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
        {showContinentFilter && (
          <ContinentFilterPanel
            ref={continentFilterRef}
            selectedContinents={selectedContinents}
            onSelectContinent={handleContinentSelect}
            onClear={handleClearFilter}
          />
        )}
        <div className="countries-container">
          <div className={`countries-grid ${selectedCountry ? 'with-detail-panel' : ''}`}>
            {filteredCountries.map((country, index) => (
              <React.Fragment key={country.code}>
                {index === 2 && selectedCountry && (
                  <CountryDetailPanel 
                    key="detail-panel" 
                    country={selectedCountry} 
                    onClose={handleClosePanel} 
                  />
                )}
                <CountryCard 
                  key={country.code} 
                  country={country} 
                  onSelect={handleCountrySelect} 
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

MainContent.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
};

export default MainContent;
