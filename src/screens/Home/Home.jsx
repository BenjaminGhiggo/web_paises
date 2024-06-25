import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import CountryCard from '../../components/CountryCard/CountryCard';
import './Home.scss';

// Consulta GraphQL para obtener la lista de países
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

// Componente funcional para la pantalla de inicio
const Home = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [search, setSearch] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="home">
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="country-list">
        {data.countries
          .filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
          .map(country => (
            <CountryCard key={country.code} country={country} />
          ))}
      </div>
    </div>
  );
};

export default Home;
