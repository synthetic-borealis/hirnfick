import React, { ChangeEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Dropdown from '../components/Dropdown';
import CustomTextArea from '../components/CustomTextArea';
import OutputLanguage from '../enums/output-language';
import './Play.scss';

import helloBrainfuck from '../assets/placeholders/hello-world.bf?raw';

const Play = observer(() => {
  const [
    selectedOutput,
    setSelectedOutput,
  ] = useState<OutputLanguage>(OutputLanguage.JavaScriptNode);
  const [inputAreaValue, setInputAreaValue] = useState<string>(helloBrainfuck);
  const handleLanguageChange = (index: number) => {
    setSelectedOutput(Object.values(OutputLanguage)[index]);
  };
  const handleInputChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setInputAreaValue(evt.target.value);
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
        <CustomTextArea
          className="Play__scroll-container"
          value={inputAreaValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
});

export default Play;
