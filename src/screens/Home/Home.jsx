import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

// Componente funcional para la pantalla de inicio
const Home = () => {
  return (
    <div className="home">
      <Link to="/" className="back-button">Regresar al menú principal</Link>
    </div>
  );
};

export default Home;
