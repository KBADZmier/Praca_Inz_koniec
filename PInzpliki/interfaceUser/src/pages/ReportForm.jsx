import React, { useState } from 'react';
import Maps from './Map.jsx';
import '../styles/ReportForm.css';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
const categories = [
  { value: 'Drogi', label: 'Drogi' },
  { value: 'Parkowanie', label: 'Parkowanie' },
  { value: 'Komunikacja', label: 'Komunikacja' },
  { value: 'Śmieci', label: 'Śmieci' },
  { value: 'Zwierzęta', label: 'Zwierzęta' },
  { value: 'Porządek i bezpieczeństwo', label: 'Porządek i bezpieczeństwo' },
  { value: 'Inne', label: 'Inne' }
];



const ReportForm = () => {
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus]= useState('Aktywne');
  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reportData = {
      category,
      date,
      address,
      description,
      status
      
    };

    try {
      const response = await axios.post("http://localhost:5000/api/Raports", reportData);
      alert('Zgłoszenie zostało dodane!');
      setCategory('');
      setDate(new Date().toISOString().substring(0, 10));
      setAddress('');
      setDescription('');
    } catch (error) {
      console.error(error);
      alert('Wystąpił błąd. Spróbuj ponownie.');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="category-container">
          {categories.map(cat => (
            <button 
              key={cat.value} 
              type="button" 
              className={`category-button ${category === cat.value ? 'selected' : ''}`}
              onClick={() => setCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="field">
          <label>Data:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label>Adres:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <Maps onAddressSelect={handleAddressSelect} category={category} />
        <div className="field">
          <label>Opis:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Dodaj zgłoszenie</button>
      </form>
    </div>
    </>
  );
};

export default ReportForm;
