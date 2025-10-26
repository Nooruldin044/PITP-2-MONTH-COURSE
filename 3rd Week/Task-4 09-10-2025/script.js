// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Form Validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // Validate Name
  const name = document.getElementById("name");
  const nameError = document.getElementById("nameError");
  if (name.value.trim() === "") {
    nameError.style.display = "block";
    name.style.borderColor = "#e74c3c";
    isValid = false;
  } else {
    nameError.style.display = "none";
    name.style.borderColor = "#2ecc71";
  }

  // Validate Email
  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    emailError.style.display = "block";
    email.style.borderColor = "#e74c3c";
    isValid = false;
  } else {
    emailError.style.display = "none";
    email.style.borderColor = "#2ecc71";
  }

  // Validate Phone
  const phone = document.getElementById("phone");
  const phoneError = document.getElementById("phoneError");
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone.value.trim().replace(/[-\s\(\)]/g, ""))) {
    phoneError.style.display = "block";
    phone.style.borderColor = "#e74c3c";
    isValid = false;
  } else {
    phoneError.style.display = "none";
    phone.style.borderColor = "#2ecc71";
  }

  // Validate Subject
  const subject = document.getElementById("subject");
  const subjectError = document.getElementById("subjectError");
  if (subject.value === "") {
    subjectError.style.display = "block";
    subject.style.borderColor = "#e74c3c";
    isValid = false;
  } else {
    subjectError.style.display = "none";
    subject.style.borderColor = "#2ecc71";
  }

  // Validate Message
  const message = document.getElementById("message");
  const messageError = document.getElementById("messageError");
  if (message.value.trim().length < 10) {
    messageError.style.display = "block";
    message.style.borderColor = "#e74c3c";
    isValid = false;
  } else {
    messageError.style.display = "none";
    message.style.borderColor = "#2ecc71";
  }

  // If form is valid, show success message
  if (isValid) {
    document.getElementById("successMessage").style.display = "block";
    this.reset();

    // Reset border colors
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.style.borderColor = "#e1e5ee";
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      document.getElementById("successMessage").style.display = "none";
    }, 5000);
  }
});

// Image Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const slider = document.getElementById("slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sliderDots = document.getElementById("sliderDots");

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  sliderDots.appendChild(dot);
});

// Update slider position
function updateSlider() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update active dot
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

// Go to specific slide
function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateSlider();
}

// Next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}

// Previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider();
}

// Event listeners for buttons
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Toggle Content
const toggleHeaders = document.querySelectorAll(".toggle-header");

toggleHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const contentId = header.id.replace("toggle", "content");
    const content = document.getElementById(contentId);
    const isActive = content.classList.contains("active");

    // Close all content sections
    document.querySelectorAll(".toggle-content").forEach((item) => {
      item.classList.remove("active");
    });

    // Reset all toggle indicators
    document
      .querySelectorAll(".toggle-header span:last-child")
      .forEach((indicator) => {
        indicator.textContent = "+";
      });

    // If the clicked section wasn't active, open it
    if (!isActive) {
      content.classList.add("active");
      header.querySelector("span:last-child").textContent = "-";
    }
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Update active link
    document.querySelectorAll(".nav-links a").forEach((a) => {
      a.classList.remove("active");
    });
    this.classList.add("active");

    // Close mobile menu if open
    navLinks.classList.remove("active");

    // Scroll to target section
    const targetId = this.getAttribute("href");
    if (targetId !== "#") {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  });
});
