import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/ReportList.css"
import Navbar from "../components/Navbar.jsx"
function ReportList() {
  const [reports, setReports] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
const[filteredCategory, setFilteredCategory]= useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/AllRaports');
        setReports(response.data);
       
      } catch (error) {
        console.error('Error fetch report:', error);
      }
    };

    fetchProducts();
  }, []);

  const CategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
  
  if(selectedCategory==='')
{
  setFilteredCategory(reports)
}else 
{const filtr = reports.filter(report => report.category === selectedCategory)
setFilteredCategory(filtr)
}
  },[selectedCategory, reports]);


  return (
    <>
    <Navbar/>
    <div>
     
      <h2>Lista zgłoszeń</h2>
      <select
          name="CategoryType"
          value={reports.category}
          onChange={CategoryChange}
        >
          <option value="">Wybierz kategorię do wyświetlenia</option>
          <option value="Drogi">Drogi</option>
          <option value="Śmieci">Śmieci</option>
          <option value="Parkowanie">Parkowanie</option>
          <option value="Komunikacja">Komunikacja</option>
          <option value="Porządek i bezpieczeństwo">Porządek i bezpieczeństwo</option>
          <option value="Zwierzęta">Zwierzęta</option>
          <option value="Inne">Inne</option>
        </select>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Kategoria</th>
            <th>Adres</th>
            <th>Opis</th>
            <th>Status</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </>
  );
}

export default ReportList;
