// SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// REVEAL ON SCROLL
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// HERO TYPING EFFECT
document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.querySelector(".typing");
  const nameText = "Annrose Akande";
  let index = 0;
  let isDeleting = false;
  let speed = 150;

  function type() {
    if (!isDeleting) {
      typingElement.textContent = nameText.substring(0, index + 1);
      index++;
      if (index === nameText.length) {
        isDeleting = true;
        speed = 1000;
      } else {
        speed = 150;
      }
    } else {
      typingElement.textContent = nameText.substring(0, index - 1);
      index--;
      if (index === 0) {
        isDeleting = false;
        speed = 600;
      } else {
        speed = 100;
      }
    }
    setTimeout(type, speed);
  }

  type();
});

// SKILLS PROGRESS BAR ANIMATION
const skillsSection = document.querySelector(".skills");
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;

  const sectionTop = skillsSection.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionTop < screenHeight - 100) {
    const skillSpans = document.querySelectorAll(".progress-bar span");
    skillSpans.forEach((span) => {
      const width = span.style.width;
      span.style.width = "0";
      setTimeout(() => {
        span.style.width = width;
      }, 300);
    });
    skillsAnimated = true;
  }
}

window.addEventListener("scroll", animateSkills);

// PROJECTS CAROUSEL
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".slide");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const dotsContainer = document.querySelector(".carousel-dots");
  let currentSlide = 0;
  let slideInterval;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".carousel-dot");

  function updateSlide() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });
    
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlide();
    resetInterval();
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Event listeners
  leftArrow.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  rightArrow.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  // Auto slide
  slideInterval = setInterval(nextSlide, 5000);

  // Pause on hover
  carousel.addEventListener("mouseenter", () => clearInterval(slideInterval));
  carousel.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 5000);
  });

  // Initialize
  updateSlide();
});

// HAMBURGER MENU TOGGLE
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
});

// Close menu when clicking on links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// UPDATE COPYRIGHT YEAR
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Add skill percentage display
document.querySelectorAll(".progress-bar span").forEach(span => {
  const width = span.style.width;
  span.setAttribute("data-width", width);
});