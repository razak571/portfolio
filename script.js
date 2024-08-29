document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  // const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const copyEmailBtn = document.getElementById("copyEmailBtn");

  const copyEmailToClipboard = (event) => {
    event.preventDefault();
    const email = "razakattar0221@gmail.com";
    navigator.clipboard
      .writeText(email)
      .then(() => showNotification("Email Copied to Clipboard!"))
      .catch((err) => console.error("Failed to copy email: ", err));
  };

  function showNotification(message, isError = false) {
    const notification = document.getElementById("notification");
    const notificationMessage = document.getElementById("notification-message");

    notificationMessage.textContent = message;
    notification.style.backgroundColor = isError ? "#f44336" : "#fff";

    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", copyEmailToClipboard);
  }

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

  // themeToggle.addEventListener("click", () => {
  //   body.classList.toggle("dark-mode");
  // });

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
        position -= 1.1; // Adjust speed if necessary
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

  // Testimonials animation
  const testimonialsContainer = document.querySelector(
    ".testimonials-container"
  );
  const testimonialsWrapper = document.querySelector(".testimonials-wrapper");
  const testimonials = document.querySelectorAll(".testimonial");

  if (testimonialsWrapper && testimonials.length > 0) {
    const testimonialWidth =
      testimonials[0].offsetWidth +
      parseInt(getComputedStyle(testimonials[0]).marginRight);
    const totalWidth = testimonialWidth * testimonials.length;

    // Clone testimonials for seamless loop
    testimonials.forEach((testimonial) => {
      const clone = testimonial.cloneNode(true);
      clone.classList.add("clone");
      testimonialsWrapper.appendChild(clone);
    });

    // Set initial position to negative total width
    testimonialsWrapper.style.transform = `translateX(${-totalWidth}px)`;

    let position = -totalWidth;
    let isHovered = false;

    function animateTestimonials() {
      if (!isHovered) {
        position += 1; // Adjust this value to control speed
        if (position >= 0) {
          position = -totalWidth;
        }
        testimonialsWrapper.style.transform = `translateX(${position}px)`;
      }
      requestAnimationFrame(animateTestimonials);
    }

    animateTestimonials();

    testimonialsContainer.addEventListener("mouseenter", () => {
      isHovered = true;
    });

    testimonialsContainer.addEventListener("mouseleave", () => {
      isHovered = false;
    });
  }

  // dynamic work record
  document.querySelectorAll(".timeline-content").forEach((item) => {
    item.addEventListener("click", () => {
      item.querySelector(".timeline-details").style.maxHeight =
        item.querySelector(".timeline-details").style.maxHeight
          ? null
          : item.querySelector(".timeline-details").scrollHeight + "px";
    });
  });

  // hero section
  const canvas = document.getElementById("particleCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Unable to get canvas context");
      return;
    }

    const particleText = document.getElementById("particleText");
    if (!particleText) {
      console.error("Particle text element not found");
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let textParticles = [];
    const particleCount = 300;
    const textParticleCount = 700;
    let mouse = { x: null, y: null, radius: 100 };

    class Particle {
      constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.size -= 0.05;
        if (this.size < 0) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.weight = Math.random() * 2 - 0.5;
        }
        this.y += this.weight;
        this.weight += 0.0001;

        if (this.y > canvas.height) {
          this.weight *= -1;
        }

        if (mouse.x != null && mouse.y != null) {
          let dx = this.x - mouse.x;
          let dy = this.y - mouse.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            this.x += dx / 10;
            this.y += dy / 10;
          }
        }
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() * 3 + 1;
        let color = "rgba(255,255,255," + (Math.random() * 0.7 + 0.3) + ")";
        let weight = Math.random() * 2 - 0.5;
        particles.push(new Particle(x, y, size, color, weight));
      }

      const textMetrics = ctx.measureText(particleText.textContent);
      const textWidth = textMetrics.width;
      const textHeight = parseInt(getComputedStyle(particleText).fontSize, 10);

      textParticles = [];
      for (let i = 0; i < textParticleCount; i++) {
        let x = Math.random() * textWidth + (canvas.width - textWidth) / 2;
        let y = Math.random() * textHeight + canvas.height / 2 - textHeight / 2;
        let size = Math.random() * 2 + 1;
        let color = "rgba(52, 152, 219," + (Math.random() * 0.7 + 0.3) + ")";
        let weight = Math.random() * 2 - 0.5;
        textParticles.push(new Particle(x, y, size, color, weight));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }
      for (let i = 0; i < textParticles.length; i++) {
        textParticles[i].update();
        textParticles[i].draw(ctx);
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    canvas.addEventListener("mousemove", (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    canvas.addEventListener("mouseout", () => {
      mouse.x = null;
      mouse.y = null;
    });
  } else {
    console.error("Canvas element not found");
  }

  // updated project section
  const projects = document.querySelectorAll(".parallax-project");
  const lastProject = projects[projects.length - 1];

  // Image slideshow functionality
  projects.forEach((project, index) => {
    const images = project.querySelectorAll(".parallax-background img");
    let currentImageIndex = 0;

    const durations = [7000, 8000, 9000, 10000, 11000, 12000];
    const duration = durations[index % durations.length];

    const fadeImages = () => {
      images[currentImageIndex].style.opacity = "0";
      currentImageIndex = (currentImageIndex + 1) % images.length;
      setTimeout(() => {
        images[currentImageIndex].style.opacity = "1";
      }, 500);
    };

    setInterval(fadeImages, duration);
  });

  // Read More functionality
  const readMoreButtons = document.querySelectorAll(".read-more");
  readMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.closest(".parallax-content");
      const shortDesc = content.querySelector(".short-description");
      const fullDesc = content.querySelector(".full-description");

      if (shortDesc.style.display !== "none") {
        shortDesc.style.opacity = "0";
        setTimeout(() => {
          shortDesc.style.display = "none";
          fullDesc.style.display = "block";
          setTimeout(() => {
            fullDesc.style.opacity = "1";
          }, 50);
        }, 300);
        button.textContent = "Read Less";
      } else {
        fullDesc.style.opacity = "0";
        setTimeout(() => {
          fullDesc.style.display = "none";
          shortDesc.style.display = "block";
          setTimeout(() => {
            shortDesc.style.opacity = "1";
          }, 50);
        }, 300);
        button.textContent = "Read More";
      }
    });
  });

  // Parallax effect  extraa he added
  // window.addEventListener("scroll", () => {
  //   const scrollPosition = window.pageYOffset;

  //   projects.forEach((project, index) => {
  //     if (project !== lastProject) {
  //       const background = project.querySelector(".parallax-background");
  //       const speed = 0.5;
  //       background.style.transform = `translateZ(-1px) scale(2) translateY(${
  //         scrollPosition * speed
  //       }px)`;
  //     }
  //   });
  // });
  // window.addEventListener("scroll", () => {
  //   const scrollPosition = window.pageYOffset;

  //   projects.forEach((project) => {
  //     if (project !== lastProject) {
  //       const background = project.querySelector(".parallax-background");
  //       const content = project.querySelector(".parallax-content");
  //       const speed = 0.5;
  //       const yPos = -(scrollPosition - project.offsetTop) * speed;
  //       background.style.transform = `translateY(${yPos}px)`;
  //       content.style.transform = `translateY(${-yPos * 0.5}px)`;
  //     }
  //   });
  // });

  // Fade-in effect for project content
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observers = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  projects.forEach((project) => {
    const content = project.querySelector(".parallax-content");
    content.style.opacity = "0";
    content.style.transform = "translateY(50px)";
    content.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observers.observe(content);
  });

  // Special handling for the last project
  // const lastProjectObserver = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         const background = lastProject.querySelector(".parallax-background");
  //         background.style.position = "fixed";
  //         background.style.top = "0";
  //       } else {
  //         const background = lastProject.querySelector(".parallax-background");
  //         background.style.position = "absolute";
  //         background.style.top = "auto";
  //       }
  //     });
  //   },
  //   { threshold: 0.1 }
  // );

  // lastProjectObserver.observe(lastProject);

  // chat gpt paralex project section
  // const readMoreBtns = document.querySelectorAll(".read-more-btn");

  // readMoreBtns.forEach((btn) => {
  //   btn.addEventListener("click", (e) => {
  //     const projectContent = e.target.closest(".parallax-content");
  //     projectContent.classList.toggle("expanded");

  //     if (projectContent.classList.contains("expanded")) {
  //       btn.textContent = "Show Less";
  //     } else {
  //       btn.textContent = "Read More";
  //     }
  //   });
  // });

  // chat gpy 3rd idea for pro sec
  // Carousel Configuration
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const dots = document.querySelectorAll(".carousel-dots .dot");
  let currentIndex = 0;
  const totalItems = items.length;
  let autoSlideInterval;

  const carouselInterval = 7000; // Time in milliseconds for carousel change

  // Update dots based on current index
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }, carouselInterval);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    currentIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
    updateCarousel();
    startAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    currentIndex = currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
    updateCarousel();
    startAutoSlide();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      currentIndex = index;
      updateCarousel();
      startAutoSlide();
    });
  });

  // Project Image Carousel Configuration
  document.querySelectorAll(".project-image-carousel").forEach((carousel) => {
    const images = carousel.querySelectorAll("img");
    let imgIndex = 0;
    const totalImages = images.length;
    const imageCarouselInterval = 4000; // Time in milliseconds for image change

    // Start the image carousel
    setInterval(() => {
      images[imgIndex].classList.remove("active"); // Hide the current image
      imgIndex = (imgIndex + 1) % totalImages; // Move to the next image
      images[imgIndex].classList.add("active"); // Show the next image
    }, imageCarouselInterval);
  });

  // Stop carousel auto-slide on flip card hover and resume on mouse leave
  const flipCards = document.querySelectorAll(".flip-card");
  flipCards.forEach((card) => {
    card.addEventListener("mouseenter", stopAutoSlide);
    card.addEventListener("mouseleave", startAutoSlide);
  });

  // Initialize the carousel
  updateCarousel();
  startAutoSlide();

  // on click of read more btn card flips and when mouse leave that card flips back
  // document.querySelectorAll(".read-more-btn-").forEach((button) => {
  //   button.addEventListener("click", function () {
  //     const flipCardInner = this.closest(".flip-card-inner");
  //     flipCardInner.style.transform = "rotateY(180deg)";
  //     flipCards.forEach((card) => {
  //       card.addEventListener("mouseleave", () => {
  //         flipCardInner.style.transform = "rotateY(0deg)";
  //       });
  //     });
  //   });
  // });
});
