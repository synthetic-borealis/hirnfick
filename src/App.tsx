import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './routes/Layout';
import Home from './routes/Home';
import Features from './routes/Features';
import Play from './routes/Play';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/play" element={<Play />} />
      </Route>
    </Routes>
  );
}

export default App;
