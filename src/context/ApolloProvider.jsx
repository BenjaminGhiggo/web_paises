import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';

// Configuración del cliente Apollo para las solicitudes GraphQL
const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
});

// Proveedor de Apollo para envolver la aplicación
const ApolloProvider = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

ApolloProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApolloProvider;
