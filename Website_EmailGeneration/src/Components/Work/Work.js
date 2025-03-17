import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Work.css';

const Counter = ({ start, end, duration, suffix = '' }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let current = start;
    const increment = (end - start) / (duration * 100); // Calculate increment based on duration
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      setCount(Math.floor(current));
    }, 10); // Update every 10ms for smooth animation

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [start, end, duration]);

  return (
    <p className="count-number">
      {count}
      {suffix}
    </p>
  );
};

const Work = () => {
  const counters = useMemo(() => [
    { label: 'Projects', target: 1200, duration: 2.5 },
    { label: 'Clients', target: 150, duration: 2.5, suffix: '+' },
    { label: 'Awards', target: 15, duration: 2.5 },
  ], []);

  return (
    <div className="work-page">
      {/* Header Section */}
      <header className="work-header">
        <h1>Our Work</h1>
        <p>Showcasing our successful projects, clients, and awards.</p>
      </header>

      {/* Counters Section */}
      <div className="counter-container">
        {counters.map((counter, index) => (
          <div className="counter-item" key={index}>
            <h3>{counter.label}</h3>
            <Counter start={0} end={counter.target} duration={counter.duration} suffix={counter.suffix} />
          </div>
        ))}
      </div>

      {/* Featured Projects Section */}
      <div className="work-projects">
        <h2>Featured Projects</h2>
        <div className="projects-list">
          <div className="project">
            <img src="https://2416899.fs1.hubspotusercontent-na1.net/hub/2416899/hubfs/Accion%20HubSpot%202023/Website_Banners/E-zest/Case%20studies/Increasing-E-commerce-Sales-with-Gen-AI-Product-Recommendations.webp?width=575&name=Increasing-E-commerce-Sales-with-Gen-AI-Product-Recommendations.webp" alt="Project 1" />
            <h3>Project Name 1</h3>
            <p>Increasing-e-commerce-sales-with-gen-ai-product-recommendations</p>
            <Link to="/work/project1" className="view-more-btn">View More</Link> {/* Link to detailed project page */}
          </div>
          <div className="project">
            <img src="https://blog.credgenics.com/wp-content/uploads/2022/06/How-to-improve-debt-collection-through-automation.png" alt="Project 2" />
            <h3>Project Name 2</h3>
            <p>Enhancing-debt-collection-with-cognitive-process-automation</p>
            <Link to="/work/project2" className="view-more-btn">View More</Link>
          </div>
          <div className="project">
            <img src="https://thumbs.dreamstime.com/z/our-cutting-edge-healthcare-facility-leading-charge-revolutionizing-way-medical-care-delivered-our-state-270650748.jpg" alt="Project 3" />
            <h3>Project Name 3</h3>
            <p>Revolutionizing-healthcare-data-analysis-with-a-knowledge-assistant-tool-for-a-leading-healthcare-insurance-provider</p>
            <Link to="/work/project3" className="view-more-btn">View More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
