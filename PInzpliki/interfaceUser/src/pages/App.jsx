import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import ReportForm from './ReportForm';
import ReportList from './ReportList';
import MapView from './MapView';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dodaj-zgloszenie" element={<ReportForm />} />
          <Route path="/wyswietl-zgloszenia" element={<ReportList />} />
          <Route path="/mapaZgloszen" element={<MapView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
