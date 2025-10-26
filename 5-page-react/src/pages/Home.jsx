import React from "react";
import CommentBox from "../components/CommentBox";

const Home = () => {
  const cards = [
    { title: "Web Design", text: "Beautiful and responsive layouts." },
    { title: "React Apps", text: "Dynamic and interactive applications." },
    { title: "UI/UX", text: "User-friendly and intuitive designs." },
  ];

  return (
    <div className="page">
      <h2>Welcome to Noor’s Web App</h2>
      <p>Explore my projects and learn more about me!</p>

      <div className="cards">
        {cards.map((c, i) => (
          <div key={i} className="card">
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </div>
        ))}
      </div>

      <CommentBox />
    </div>
  );
};

export default Home;
