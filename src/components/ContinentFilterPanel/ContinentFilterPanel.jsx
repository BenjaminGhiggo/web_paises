import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import africa from '../../assets/images/Africa.jpg';
import america from '../../assets/images/America.jpg';
import asia from '../../assets/images/Asia.jpg';
import europa from '../../assets/images/Europa.jpg';
import oceania from '../../assets/images/Oceania.jpg';
import './ContinentFilterPanel.scss';

const ContinentFilterPanel = forwardRef(({ selectedContinents, onSelectContinent, onClear }, ref) => {
  const continents = [
    { name: 'Europa', image: europa },
    { name: 'América', image: america },
    { name: 'Asia', image: asia },
    { name: 'Oceanía', image: oceania },
    { name: 'África', image: africa },
  ];

  return (
    <div ref={ref} className="continent-filter-panel">
      <div className="header">
        <h2>Filtrar por continentes</h2>
        <button onClick={onClear}>Limpiar</button>
      </div>
      <div className="continents">
        {continents.map((continent) => (
          <div
            key={continent.name}
            className={`continent ${selectedContinents.includes(continent.name) ? 'selected' : ''}`}
            onClick={() => onSelectContinent(continent.name)}
          >
            <img src={continent.image} alt={continent.name} />
            <p>{continent.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

ContinentFilterPanel.displayName = 'ContinentFilterPanel';

ContinentFilterPanel.propTypes = {
  selectedContinents: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectContinent: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default ContinentFilterPanel;
