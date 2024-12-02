import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/ReportList.css";

function ReportList() {
  const [reports, setReports] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredCategory, setFilteredCategory] = useState([]);
  
  
  const userRole = localStorage.getItem("category"); 
  

  const roleToCategoriesMap = {
    Transport: ['Drogi', 'Komunikacja', 'Parkowanie'],
    Inne: ['Inne'],
    Bezpieczenstwo: ['Porządek i bezpieczeństwo', 'Zwierzęta'],
    Odpady: ['Śmieci']
  };
  
 
  const allowedCategories = roleToCategoriesMap[userRole] || [];


  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/AllRaports');
        
   
        const categoryFilteredReports = response.data.filter(report => 
          allowedCategories.includes(report.category)
        );
        setReports(categoryFilteredReports);
        setFilteredCategory(categoryFilteredReports);
      } catch (error) {
        console.error('Błąd pobierania produktów:', error);
      }
    };

    fetchReports();
  }, [allowedCategories]);

  const CategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredCategory(reports);
    } else {
      const filtr = reports.filter(report => report.category === selectedCategory);
      setFilteredCategory(filtr);
    }
  }, [selectedCategory, reports]);
  const handleStatusChange = async (reportId, newStatus) => {
    try {
   
      const response = await axios.put(`http://localhost:5000/api/Raports/${reportId}`, { status: newStatus });

      const updatedReports = reports.map(report =>
        report._id === reportId ? { ...report, status: newStatus } : report
      );
      setReports(updatedReports);
      setFilteredCategory(updatedReports); 

      console.log('Status zmieniony pomyślnie:', response.data);
    } catch (error) {
      console.error('Błąd zmiany statusu:', error);
    }
  };

  const calculateDaysElapsed = (reportDate) => {
 
    const reportDateObj = new Date(reportDate);
   
    const currentDate = new Date();
  
    
    const timeDifference = currentDate - reportDateObj;
  
    
    const daysElapsed = Math.floor(timeDifference / (1000 * 3600 * 24));
  
    return daysElapsed;
  };


  return (
    <div>
      <h2>Lista zgłoszeń</h2>
      <select
          name="CategoryType"
          value={selectedCategory}
          onChange={CategoryChange}
        >
          <option value="">Wybierz kategorię do wyświetlenia</option>
          {allowedCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Kategoria</th>
            <th>Adres</th>
            <th>Opis</th>
            <th>Status</th>
            <th>Zmiana statusu</th>
            <th>Czas od przyjęcia zgłoszenia</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategory.map(report => (
            <tr key={report._id}>
              <td>{report.date.substring(0, 10)}</td>
              <td>{report.category}</td>
              <td>{report.address}</td>
              <td>{report.description}</td>
              <td>{report.status}</td>
              <td>
            
                <button
                  onClick={() => handleStatusChange(report._id, 'Aktywne')}
                  className="button active"
                >
                  Aktywne
                </button>
                <button
                  onClick={() => handleStatusChange(report._id, 'W trakcie sprawdzania')}
                  className="button in-progress"
                >
                  W trakcie sprawdzania
                </button>
                <button
                  onClick={() => handleStatusChange(report._id, 'Rozwiązany problem')}
                  className="button resolved"
                >
                  Rozwiązany problem
                </button>
              </td>
              <td>
                  {calculateDaysElapsed(report.date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportList;
