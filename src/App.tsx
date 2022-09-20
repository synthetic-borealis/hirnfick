import React, { useEffect } from 'react';
import hirnfickLogo from './images/Hirnfick-logo.webp';
import githubIcon from './images/icons/icon-github.svg';
import './App.scss';

function App() {
  useEffect(() => {
    // There's probably a better way to add a link to the document's head
    const logoLink = document.createElement('link');
    logoLink.rel = 'preload';
    logoLink.as = 'image';
    logoLink.href = hirnfickLogo;
    logoLink.type = 'image/webp';
    document.head.append(logoLink);
  }, []);
  return (
    <div className="App">
      <p className="App__subtitle">UNDER CONSTRUCTION</p>
      <img className="App__logo" src={hirnfickLogo} width="384" height="384" alt="Hirnfick logo" />
      <h1 className="App__title">HIRNFICK</h1>
      <a className="App__link" href="https://github.com/synthetic-borealis/hirnfick.js/" target="_blank" rel="noreferrer">
        <img className="App__link-icon" src={githubIcon} alt="GitHub icon" />
      </a>
    </div>
  );
}

export default App;
