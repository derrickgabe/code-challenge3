import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import About from './components/About';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <Router basename="/code-challenge3">
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  </Router>
);
  <React.StrictMode>
    <App />
  </React.StrictMode>
