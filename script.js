document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  const toggleNav = () => {
    nav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
  };

  burger.addEventListener("click", toggleNav);

  navLinks.forEach((link, index) => {
    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.querySelector("a").getAttribute("href");
      const targetSection = document.querySelector(targetId);

      toggleNav(); // Close the menu

      // Wait for the menu to close before scrolling
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }, 300);
    });
  });

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
  });

  // Smooth scrolling for navigation links
  const scrollLinks = document.querySelectorAll("nav a");
  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("href");
      const section = document.querySelector(sectionId);
      section.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Animation for section entries
  const sections = document.querySelectorAll("section");
  const options = {
    root: null,
    threshold: 0.1,
    rootMargin: "-80px",
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
});
