import PropTypes from 'prop-types';
import React from 'react';
import AfricaImage from '../../assets/images/Africa.jpg';
import AmericaImage from '../../assets/images/America.jpg';
import AsiaImage from '../../assets/images/Asia.jpg';
import EuropaImage from '../../assets/images/Europa.jpg';
import OceaniaImage from '../../assets/images/Oceania.jpg';
import './ContinentFilterPanel.scss';

const ContinentFilterPanel = ({ onSelectContinent, onClear }) => {
  return (
    <div className="continent-filter-panel">
      <div className="header">
        <h2>Filtrar por continentes</h2>
        <button onClick={onClear}>Limpiar</button>
      </div>
      <div className="continents">
        <div className="continent" onClick={() => onSelectContinent('Europe')}>
          <img src={EuropaImage} alt="Europa" />
          <p>Europa</p>
        </div>
        <div className="continent" onClick={() => onSelectContinent('America')}>
          <img src={AmericaImage} alt="América" />
          <p>América</p>
        </div>
        <div className="continent" onClick={() => onSelectContinent('Asia')}>
          <img src={AsiaImage} alt="Asia" />
          <p>Asia</p>
        </div>
        <div className="continent" onClick={() => onSelectContinent('Oceania')}>
          <img src={OceaniaImage} alt="Oceanía" />
          <p>Oceanía</p>
        </div>
        <div className="continent" onClick={() => onSelectContinent('Africa')}>
          <img src={AfricaImage} alt="África" />
          <p>África</p>
        </div>
      </div>
    </div>
  );
};

ContinentFilterPanel.propTypes = {
  onSelectContinent: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default ContinentFilterPanel;
