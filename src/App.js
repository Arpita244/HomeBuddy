import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; 
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import RecipeGenerator from "./pages/RecipeGenerator";
import ProfessionalRegister from "./pages/ProfessionalRegister";
import Navbar from "./components/Navbar";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Background Image Applied via CSS for Better Optimization */}
        <div className="background-image"></div>
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/recipe" element={<RecipeGenerator />} />
          <Route path="/register-professional" element={<ProfessionalRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;