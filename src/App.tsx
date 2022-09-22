import React from 'react';
import Portal from 'portal-storm';
import hirnfickLogo from './images/Hirnfick-logo.webp';
import githubIcon from './images/icons/icon-github.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <p className="App__subtitle">UNDER CONSTRUCTION</p>
      <Portal container={document.head}>
        <link rel="preload" as="image" href={hirnfickLogo} type="image/webp" />
      </Portal>
      <img className="App__logo" src={hirnfickLogo} width="384" height="384" alt="Hirnfick logo" />
      <h1 className="App__title">HIRNFICK</h1>
      <a className="App__link" href="https://github.com/synthetic-borealis/hirnfick.js/" target="_blank" rel="noreferrer">
        <img className="App__link-icon" src={githubIcon} alt="GitHub icon" />
      </a>
    </div>
  );
}

export default App;
