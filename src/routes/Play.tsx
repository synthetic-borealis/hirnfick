import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import OutputLanguage from '../enums/output-language';
import './Play.scss';

function Play() {
  const [
    selectedOutput,
    setSelectedOutput,
  ] = useState<OutputLanguage>(OutputLanguage.JavaScriptNode);
  const handleLanguageChange = (index: number) => {
    setSelectedOutput(Object.values(OutputLanguage)[index]);
  };
  return (
    <div className="Play">
      <div className="Play__container">
        <div className="Play__controls" />
        <div className="Play__controls">
          <Dropdown
            options={Object.values(OutputLanguage)}
            onSelectOption={handleLanguageChange}
            className="Play__language-dropdown"
          />
          <button type="button" className="Play__compile-button">
            <span className="Play__compile-button-caption">
              Compile
            </span>
          </button>
        </div>
        <div className="Play__controls" />
        <div className="Play__controls" />
      </div>
    </div>
  );
}

export default Play;
