import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Register from "./pages/Register";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="scroll-container">
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <section id="register">
          <Register />
        </section>
      </div>
    </div>
  );
}

export default App;
