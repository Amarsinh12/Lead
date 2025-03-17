import React from "react";
import "./Service.css";

function App() {
  const services = [
    {
      title: "Enterprise Data Services",
      details: [
        "Enterprise Data Landscape Maturity Assessment",
        "Data Landscape Modernization",
        "Enterprise Data Migration",
        "Analytics: BI, Reporting & Dashboards, AI & ML",
      ],
    },
    {
      title: "Product Engineering",
      details: [
        "Digital Product Engineering",
        "Digital Applications",
        "Emerging Tech",
      ],
    },
    {
      title: "Automation",
      details: [
        "Managed Cloud and DevOps",
        "Technology Operations",
        "Digital Business Operations",
        "Managed Services",
      ],
    },
    {
      title: "Consulting Services",
      details: [
        "Transformative Consulting",
        "Restorative Consulting",
        "Curative Consulting",
      ],
    },
    {
      title: "Digital Commerce",
      details: [
        "Digital Content Management",
        "Managed Commerce Services",
        "Digital Commerce Development",
        "Digital Commerce Consulting",
      ],
    },
    {
      title: "Experience Design",
      details: [
        "User Understanding & Heuristic Evaluation",
        "Info Architecture & Journey Mapping",
        "Wireframes & Visual Design",
        "Prototyping & User Testing",
      ],
    },
  ];

  return (
    <div className="App">
      <header className="header">
        <h1>Service Offerings</h1>
        <p>
          We are an Agile Digital Technology Innovation partner for Enterprises
          and ISVs. At e-Zest, we believe that Success and Innovation happen,
          with a persistent focus on Learning, Partnership, and
          Result-Orientation.
        </p>
      </header>
      <main className="main-content">
        {services.map((service, index) => (
          <section className="service-section" key={index}>
            <h2>{service.title}</h2>
            <ul>
              {service.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <footer className="footer">
        <p>© 2024 e-Zest Solutions</p>
      </footer>
    </div>
  );
}

export default App;