import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const API_URL = "http://localhost:5000"; // Base URL for API

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    console.log("Credentials:", credentials); // Debugging line

    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      setMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId); // Store user ID
      navigate("/services");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
