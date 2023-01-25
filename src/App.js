import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CityDetails from './pages/CityDetails/CityDetails';
import CityList from './pages/CityList/CityList';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CityList />} />
        <Route path="city/:cityName" element={<CityDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
