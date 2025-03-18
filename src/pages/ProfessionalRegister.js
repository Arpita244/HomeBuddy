import React, { useState } from "react";
import "../styles.css";

const ProfessionalRegister = () => {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const professionalData = { name, service, contact };
  
    console.log("Sending Professional Data:", professionalData); // Debugging
  
    try {
      const response = await fetch("http://localhost:5000/register-professional", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(professionalData),
      });
  
      const data = await response.json();
      console.log("Response from Server:", data); // Debugging
  
      if (response.ok) {
        setMessage("✅ Professional Registered Successfully!");
        setName("");
        setService("");
        setContact("");
      } else {
        setMessage(data.error || "❌ Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ An error occurred. Please try again later.");
    }
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfessionalRegister;
