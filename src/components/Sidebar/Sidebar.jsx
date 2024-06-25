import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

// Componente funcional para la barra lateral de navegación
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Logo</div>
      <nav>
        <NavLink to="/" exact activeClassName="active">Home</NavLink>
        <NavLink to="/vista1" activeClassName="active">Vista 1</NavLink>
        <NavLink to="/vista2" activeClassName="active">Vista 2</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;