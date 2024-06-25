import PropTypes from 'prop-types';
import React from 'react';
import './MainContent.scss';

// Componente funcional para el contenido principal de la página
const MainContent = ({ children }) => {
  return <div className="main-content">{children}</div>;
};

// Definición de PropTypes para la validación de propiedades
MainContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContent;
