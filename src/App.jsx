import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; 
import SeriePage from './pages/SeriePage';
import CategoryPage from './pages/CategoryPages';
import SerieFormPage from './pages/SerieFormPage';
import CategoriaFormPage from './pages/CategoriaFormPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/series" element={<SeriePage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/series/edit/:idserie" element={<SerieFormPage />} />
        <Route path="/categories/edit/:idcategoria" element={<CategoriaFormPage />} /> {/* Cambiado a idcategoria */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;