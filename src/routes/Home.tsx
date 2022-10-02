import React from 'react';
import './Home.scss';
import hirnfickLogo from '../images/Hirnfick-logo.webp';

function Home() {
  return (
    <section className="Home">
      <img className="Home__logo" src={hirnfickLogo} width="300" height="300" alt="Hirnfick logo" />
      <h1 className="Home__title">HIRNFICK</h1>
      <p className="Home__subtitle">
        A modern source-to-source Brainfuck compiler.
      </p>
    </section>
  );
}

export default Home;
