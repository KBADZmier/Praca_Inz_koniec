import { useState } from 'react';
import '../styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoginUser from './Login';
import ReportList from './ReportList';
import Registration from './Registrations';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  return (
    <Router>
      <div className="App">
        
        <Routes>
         
          <Route
            path="/"
            element={
              <LoginUser
                setToken={setToken}
                setUsername={setUsername}
                setRole={setRole}
              />
            }
          />
          <Route path="/reportlist" element={<ReportList />} />
          <Route
            path="/login"
            element={
              <LoginUser
                setToken={setToken}
                setUsername={setUsername}
                setRole={setRole}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
