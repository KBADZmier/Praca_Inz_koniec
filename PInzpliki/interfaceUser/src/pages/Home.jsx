import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh'}}> 
      <div className="row text-center">
        <div className="col-md-4 mb-4"> 
          <Link to="/dodaj-zgloszenie" className="text-decoration-none">
            <div className="card card-tile">
              <div className="card-body">
                <h5 className="card-title">Dodaj zgłoszenie</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-4">
          <Link to="/wyswietl-zgloszenia" className="text-decoration-none">
            <div className="card card-tile">
              <div className="card-body">
                <h5 className="card-title">Wyświetl zgłoszenia</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-4">
          <Link to="/mapaZgloszen" className="text-decoration-none">
            <div className="card card-tile">
              <div className="card-body">
                <h5 className="card-title">Mapa zgłoszeń</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
