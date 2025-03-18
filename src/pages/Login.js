import React from "react";
import { Link } from "react-router-dom";
import "../styles.css"; // Correct relative path

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
};

export default Login;