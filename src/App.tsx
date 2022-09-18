import React from 'react';
import githubIcon from './images/icons/icon-github.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <p className="App__subtitle">UNDER CONSTRUCTION</p>
      <h1 className="App__title">HIRNFICK</h1>
      <a className="App__link" href="https://github.com/synthetic-borealis/hirnfick.js/" target="_blank" rel="noreferrer">
        <img className="App__link-icon" src={githubIcon} alt="GitHub icon" />
      </a>
    </div>
  );
}

export default App;
