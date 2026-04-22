/* ============================================================
   SMOOTH SCROLL — nav links
   ============================================================ */
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // Only intercept internal anchor links
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll, { passive: true });
// Run once immediately (covers elements already in viewport)
revealOnScroll();

/* ============================================================
   HERO TYPING EFFECT
   (Fixed: runs on DOMContentLoaded; cursor handled by CSS span)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const typingEl = document.querySelector(".typing");
  if (!typingEl) return;

  const nameText = "Annrose Akande";
  let index = 0;
  let isDeleting = false;
  let speed = 150;

  function type() {
    if (!isDeleting) {
      typingEl.textContent = nameText.substring(0, index + 1);
      index++;
      if (index === nameText.length) {
        isDeleting = true;
        speed = 2000; // pause before deleting
      } else {
        speed = 130;
      }
    } else {
      typingEl.textContent = nameText.substring(0, index - 1);
      index--;
      if (index === 0) {
        isDeleting = false;
        speed = 600;
      } else {
        speed = 80;
      }
    }
    setTimeout(type, speed);
  }

  type();
});

/* ============================================================
   SKILLS PROGRESS BAR ANIMATION
   (Fixed: guard against null skillsSection)
   ============================================================ */
const skillsSection = document.querySelector(".skills");
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated || !skillsSection) return;

  const sectionTop = skillsSection.getBoundingClientRect().top;
  if (sectionTop < window.innerHeight - 80) {
    const skillSpans = document.querySelectorAll(".progress-bar span");
    skillSpans.forEach((span) => {
      const targetWidth = span.style.width;
      span.style.width = "0";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          span.style.width = targetWidth;
        });
      });
    });
    skillsAnimated = true;
  }
}

window.addEventListener("scroll", animateSkills, { passive: true });

/* ============================================================
   PROJECTS CAROUSEL
   (Fixed: only runs after DOM is ready; correct slide toggle)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const slides       = document.querySelectorAll(".slide");
  const leftArrow    = document.querySelector(".left-arrow");
  const rightArrow   = document.querySelector(".right-arrow");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (!slides.length || !leftArrow || !rightArrow || !dotsContainer) return;

  let currentSlide = 0;
  let slideInterval;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".carousel-dot");

  function updateSlide() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
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
    slideInterval = setInterval(nextSlide, 5500);
  }

  leftArrow.addEventListener("click", () => { prevSlide(); resetInterval(); });
  rightArrow.addEventListener("click", () => { nextSlide(); resetInterval(); });

  // Pause on hover
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", () => clearInterval(slideInterval));
    carousel.addEventListener("mouseleave", resetInterval);
  }

  // Keyboard support for accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft")  { prevSlide(); resetInterval(); }
    if (e.key === "ArrowRight") { nextSlide(); resetInterval(); }
  });

  resetInterval();
  updateSlide();
});

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
const hamburger = document.querySelector(".hamburger");
const navLinks  = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    hamburger.classList.toggle("active", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close on link click
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });

  // Keyboard: close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

function closeMenu() {
  if (hamburger && navLinks) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/* ============================================================
   COPYRIGHT YEAR
   ============================================================ */
const yearEl = document.getElementById("currentYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   NAVBAR: add scroll shadow
   ============================================================ */
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.scrollY > 10) {
    header.style.boxShadow = "0 4px 30px rgba(0,0,0,0.4)";
  } else {
    header.style.boxShadow = "none";
  }
}, { passive: true });
