import React from "react";
import "./Insights.css";

const insightsData = [
  {
    title: "Elevating Product Engineering with AI and ML",
    author: "By Devendra Deshmukh",
    description:
      "As technology evolves and customer choices broaden, there is an increasing expectation for companies to not only deliver quality products but also provide a ...",
    image: "https://thrivethinking.com/wp-content/uploads/2016/03/WhatIsInsight_2-copy.jpg", // Replace with the actual image URL
  },
  {
    title: "How RAG-powered LLMs are Redefining Business Operations",
    author: "",
    description:
      "Discover how Retrieval-Augmented Generation (RAG) models are reshaping the efficiency and innovation in business operations, creating a ...",
    image: "https://dstillery.com/wp-content/uploads/2022/01/data-insights-1024x576.jpg", // Replace with the actual image URL
  },
];

const Insights = () => {
  return (
    <div className="insights-container">
      <h2 className="insights-title">Blog</h2>
      <div className="insights-grid">
        {insightsData.map((insight, index) => (
          <div className="insight-card" key={index}>
            <img
              src={insight.image}
              alt={insight.title}
              className="insight-image"
            />
            <h3 className="insight-heading">{insight.title}</h3>
            <p className="insight-description">{insight.description}</p>
            <p className="insight-author">{insight.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
