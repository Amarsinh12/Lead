import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import "./Customer.css";
import Work from "../Work/Work";
import Service from "../Service/Service";
import Insights from "../Insights/Insights"; // Import Insights component
import logo from "../../Assests/logo.png";
import genai from "../../Assests/genai.jpg";

function Customer() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/Login"); // Navigate to Login page (assuming Login is at '/')
  };
  return (
    <div className="customer-container">
      {/* Header Section */}
      <header className="customer-header">
        <nav className="navbar">
          <img src={logo} alt="Logo" className="customer-logo" />
          <ul className="navbar-links">
            <li>
              <Link to="/work" className="navbar-link">
                Work
              </Link>
            </li>
            <li
              className="dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Link to="/service" className="dropdown-link">
                Services
              </Link>
              {showDropdown && (
                <ul className="dropdown-menu">
                  <li>
                    <a href="#product-engineering">Product Engineering</a>
                  </li>
                  <li>
                    <a href="#enterprise-data">Enterprise Data Services</a>
                  </li>
                  <li>
                    <a href="#digital-commerce">Digital Commerce</a>
                  </li>
                  <li>
                    <a href="#digital-operations">Digital Operations</a>
                  </li>
                  <li>
                    <a href="#digital-consulting">Digital Consulting</a>
                  </li>
                  <li>
                    <a href="#digital-experience">Digital Experience Design</a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/insights" className="navbar-link">
                Insights
              </Link>
            </li>
            
          </ul>
          <button className="login-btn" onClick={handleLoginClick}>
              Login
            </button>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="customer-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Empowering Digital Transformation</h1>
            <p>Your partner for innovation and technology solutions.</p>
            <button className="cta-btn">Get in Touch</button>
          </div>
        </section>

        {/* AI Banner Section */}
        <section className="ai-banner">
          <div className="ai-text">
            <h1>Generative AI</h1>
            <p>Building a Secure Future with LLMs and Generative AI</p>
            <button className="know-more-btn">Know More</button>
          </div>
          <div className="ai-image">
            <img src={genai} alt="Generative AI" />
          </div>
        </section>

        {/* Work Section */}
        <section>
          <Work />
        </section>

        {/* Service Section */}
        <section>
          <Service />
        </section>

        {/* Insights Section */}
        <section>
          <Insights />
        </section>
      </main>

      {/* Footer Section */}
      <footer className="customer-footer">
        <p>
          This website stores cookies on your computer to improve your browsing
          experience.
          <a href="#privacy-policy"> Privacy Policy</a>
        </p>
        <div className="footer-buttons">
          <button className="accept-btn">Accept</button>
          <button className="decline-btn">Decline</button>
        </div>
      </footer>
    </div>
  );
}

export default Customer;
