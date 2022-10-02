import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './routes/Layout';
import Home from './routes/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
