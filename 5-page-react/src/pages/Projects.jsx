import React from "react";

const Projects = () => {
  const projects = [
    { title: "Portfolio Website", tech: "React, CSS" },
    { title: "Library Management", tech: "Node, MongoDB" },
    { title: "Typing Test App", tech: "React, JS" },
  ];

  return (
    <div className="page">
      <h2>My Projects</h2>
      <div className="cards">
        {projects.map((p, i) => (
          <div key={i} className="card">
            <h3>{p.title}</h3>
            <p>{p.tech}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;