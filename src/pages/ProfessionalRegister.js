import React, { useState } from "react";
import "../styles.css";

const ProfessionalRegister = () => {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [contact, setContact] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const professionalData = { name, service, contact };
    localStorage.setItem(name, JSON.stringify(professionalData));
    alert("Professional Registered Successfully!");
  };

  return (
    <div className="register-container">
      <h2>Register as a Professional</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Service Offered"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default ProfessionalRegister;