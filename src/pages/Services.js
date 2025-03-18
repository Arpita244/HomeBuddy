import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

const servicesData = [
  { id: 1, name: "Plumbing", description: "Fix leaks and install pipes", price: "₹500/hr" },
  { id: 2, name: "Electrician", description: "Electrical repairs & installation", price: "₹600/hr" },
  { id: 3, name: "Cooking", description: "Hire a professional chef", price: "₹700/hr" },
  { id: 4, name: "Cleaning", description: "House cleaning services", price: "₹400/hr" },
  { id: 5, name: "Babysitting", description: "Certified babysitters for kids", price: "₹800/hr" },
];

const API_BASE_URL =  "http://localhost:5000";

function Services() {
  const [services, setServices] = useState([]); // Initially empty
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/services`);
        if (response.data.length > 0) {
          setServices(response.data);
        } else {
          setServices(servicesData); // Fallback to local data
        }
      } catch (err) {
        setError("⚠️ Failed to load services. Showing default services.");
        setServices(servicesData); // Show default services if API fails
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleBooking = async (serviceId) => {
    const userId = localStorage.getItem("userId"); // Get userId from localStorage
  
    if (!userId) {
      alert("❌ Please log in first to book a service.");
      return;
    }
  
    if (!serviceId) {
      alert("❌ Service ID is required.");
      return;
    }
  
    console.log("Booking request data:", { userId, serviceId }); // Log data being sent
    
    try {
      const response = await fetch(`${API_BASE_URL}/book-service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, serviceId }), // Send the correct serviceId
      });
  
      const data = await response.json();
      console.log("Booking response:", data); // Log the response from the server
  
      if (data.success) {
        alert("✅ Service booked successfully!");
      } else {
        alert("❌ Booking failed: " + data.message);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("❌ Booking failed. Please try again.");
    }
  };
  

  if (loading) return <p className="loading">⏳ Loading services...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="services-container">
      <h2>🛠️ Our Services</h2>
      <div className="table-container">
        <table className="services-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((service, index) => (
                <tr key={service.id || service._id}>
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>{service.price}</td>
                  <td>
                    <button className="book-btn" onClick={() => handleBooking(service._id || service.id)}>
                      Book Now
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-services">🚫 No services available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Services;
