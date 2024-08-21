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

  // Blog cards floating animation and hover effect
  const blogGrid = document.querySelector(".blog-grid");
  const blogCards = document.querySelectorAll(".blog-card");

  if (blogGrid && blogCards.length > 0) {
    // Calculate the total width of all cards
    const totalWidth = Array.from(blogCards).reduce(
      (sum, card) => sum + card.offsetWidth + 20,
      0
    );

    // Clone cards to create a seamless loop
    blogCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add("clone"); // Add a class to distinguish clones
      blogGrid.appendChild(clone);
    });

    // Set up the animation
    let animationId;
    let position = 0;
    let isHovered = false;

    function animate() {
      if (!isHovered) {
        position -= 1; // Adjust this value to change the speed
        if (Math.abs(position) >= totalWidth) {
          position = 0;
        }
        blogGrid.style.transform = `translateX(${position}px)`;
        animationId = requestAnimationFrame(animate);
      }
    }

    animate();

    // Hover effect
    function handleHoverStart() {
      isHovered = true;
      cancelAnimationFrame(animationId); // Stop animation
      document
        .querySelectorAll(".blog-card, .blog-card.clone")
        .forEach((c) => (c.style.opacity = "0.5")); // Make all cards colorless
      this.style.opacity = "1"; // Make hovered card colorful
    }

    function handleHoverEnd() {
      isHovered = false;
      document
        .querySelectorAll(".blog-card, .blog-card.clone")
        .forEach((c) => (c.style.opacity = "0.5")); // Reset all cards to colorless
      animate(); // Restart animation
    }

    document
      .querySelectorAll(".blog-card, .blog-card.clone")
      .forEach((card) => {
        card.addEventListener("mouseenter", handleHoverStart);
        card.addEventListener("mouseleave", handleHoverEnd);
      });
  }

  // Skills floating animation
  const skillGrid = document.querySelector(".skill-grid");
  const skillCards = document.querySelectorAll(".skill-card");

  if (skillGrid && skillCards.length > 0) {
    // Calculate the total width of all cards including margins
    const totalWidth = Array.from(skillCards).reduce(
      (sum, card) =>
        sum + card.offsetWidth + parseFloat(getComputedStyle(card).marginRight),
      0
    );

    // Clone cards to create a seamless loop
    skillCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add("clone");
      skillGrid.appendChild(clone);
    });

    // Set up the animation
    let animationId;
    let position = 0;
    let isHovered = false;

    function animate() {
      if (!isHovered) {
        position -= 1; // Adjust speed if necessary
        if (Math.abs(position) >= totalWidth) {
          position = 0;
        }
        skillGrid.style.transform = `translateX(${position}px)`;
        animationId = requestAnimationFrame(animate);
      }
    }

    animate();

    // Hover effect
    function handleHoverStart() {
      isHovered = true;
      cancelAnimationFrame(animationId); // Stop animation
      document
        .querySelectorAll(".skill-card, .skill-card.clone")
        .forEach((c) => (c.style.opacity = "0.5")); // Make all icons colorless
      this.style.opacity = "1"; // Highlight hovered icon
    }

    function handleHoverEnd() {
      isHovered = false;
      document
        .querySelectorAll(".skill-card, .skill-card.clone")
        .forEach((c) => (c.style.opacity = "0.5")); // Reset all icons to colorless
      animate(); // Restart animation
    }

    document
      .querySelectorAll(".skill-card, .skill-card.clone")
      .forEach((card) => {
        card.addEventListener("mouseenter", handleHoverStart);
        card.addEventListener("mouseleave", handleHoverEnd);
      });
  }
});
