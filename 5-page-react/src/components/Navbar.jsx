import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Noor</h1>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
        <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Me</a></li>
        <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a></li>
        <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
        <li><a href="#register" onClick={(e) => { e.preventDefault(); scrollToSection('register'); }}>Register</a></li>
      </ul>
      <div className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
