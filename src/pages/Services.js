import React from "react";
import "../styles.css"; // Import the CSS file

const servicesData = [
  { id: 1, name: "Plumbing", description: "Fix leaks and install pipes", price: "₹500/hr" },
  { id: 2, name: "Electrician", description: "Electrical repairs & installation", price: "₹600/hr" },
  { id: 3, name: "Cooking", description: "Hire a professional chef", price: "₹700/hr" },
  { id: 4, name: "Cleaning", description: "House cleaning services", price: "₹400/hr" },
  { id: 5, name: "Babysitting", description: "Certified babysitters for kids", price: "₹800/hr" },
];

function Services() {
  return (
    <div className="services-container">
      <h2>Our Services</h2>
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
            {servicesData.map((service, index) => (
              <tr key={service.id}>
                <td>{index + 1}</td>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.price}</td>
                <td>
                  <button className="book-btn">Book Now</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Services;