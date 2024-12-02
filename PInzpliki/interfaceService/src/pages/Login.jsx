import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function LoginUser({ setToken, setUsername, setRole }) {
  const [username, setUsernameLocal] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login", 
        { username, password }, 
       
      );
      const { token, username: receivedUsername, role, category} = response.data;
      setToken(token);
      setUsername(receivedUsername);
      setRole(role);
      localStorage.setItem("token", token);
      localStorage.setItem("username", receivedUsername);
      localStorage.setItem("role", role);
      localStorage.setItem("category", category);
      console.log(role, typeof token);

  navigate("/reportlist");
    } catch (error) {
      console.error("Invalid login credentials", error);
    }
  };

  return (
    <div className="page">
    
      <div className="formularz-logowania">
        <h1 className="logtyt">Logowanie</h1>
        <form onSubmit={handleSubmit}>
          <p>Nazwa użytkownika:</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsernameLocal(e.target.value)}
            placeholder="Username"
            required
          />
          <p>Hasło:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button className="zaloz">Zaloguj</button>
        
        </form>
      </div>
    </div>
  );
}

export default LoginUser;
