
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Strona Główna</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/dodaj-zgloszenie">Dodaj zgłoszenie</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wyswietl-zgloszenia">Wyświetl zgłoszenia</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mapaZgloszen">Mapa zgłoszeń</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
