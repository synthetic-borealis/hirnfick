import React from 'react';
import Dropdown from '../components/Dropdown';
import OutputLanguage from '../enums/output-language';
import './Play.scss';

function Play() {
  return (
    <div className="Play">
      <div className="Play__container">
        <div className="Play__controls" />
        <div className="Play__controls">
          <Dropdown options={Object.values(OutputLanguage)} className="Play__language-dropdown" />
        </div>
        <div className="Play__controls" />
        <div className="Play__controls" />
      </div>
    </div>
  );
}

export default Play;
