import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import menuIcon from '../../assets/icon/menu.svg';
import logo from '../../assets/icon/tu-logo.svg'; // Asegúrate de reemplazar esto con la ruta correcta
import './Sidebar.scss';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <img src={menuIcon} alt="Menu Icon" className="menu-icon" onClick={toggleSidebar} />
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/vista1" className={({ isActive }) => (isActive ? 'active' : '')}>Vista 1</NavLink>
          <NavLink to="/vista2" className={({ isActive }) => (isActive ? 'active' : '')}>Vista 2</NavLink>
        </nav>
      </div>
      {!isOpen && (
        <img src={menuIcon} alt="Menu Icon" className="menu-icon-fixed" onClick={toggleSidebar} />
      )}
    </>
  );
};

export default Sidebar;
