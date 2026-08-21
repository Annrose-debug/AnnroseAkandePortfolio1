/* ============================================================
   PROJECT MEDIA GALLERIES — multiple images + optional video
   Broken files (onerror) remove their own slide automatically.
   Give it a moment for those removals before wiring up controls.
============================================================ */
function initGalleries() {
  document.querySelectorAll('.project-media').forEach(media => {
    const track = media.querySelector('.media-track');
    const empty = media.querySelector('.media-empty');
    if (!track) return;
    const slides = Array.from(track.children);

    if (slides.length === 0) {
      track.style.display = 'none';
      if (empty) empty.style.display = 'flex';
      return;
    }

    let idx = 0;
    const prevBtn = media.querySelector('.media-prev');
    const nextBtn = media.querySelector('.media-next');
    const dotsWrap = media.querySelector('.media-dots');
    let timer = null;

    function update() {
      track.style.transform = `translateX(-${idx * 100}%)`;
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.media-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    }
    function goTo(i) {
      idx = (i + slides.length) % slides.length;
      update();
    }
    function startAutoplay() {
      if (slides.length > 1) timer = setInterval(() => goTo(idx + 1), 4500);
    }
    function stopAutoplay() {
      if (timer) clearInterval(timer);
    }

    if (slides.length > 1) {
      slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'media-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => { goTo(i); stopAutoplay(); startAutoplay(); });
        dotsWrap && dotsWrap.appendChild(dot);
      });
      if (prevBtn) prevBtn.style.display = 'flex';
      if (nextBtn) nextBtn.style.display = 'flex';
    } else {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(idx - 1); stopAutoplay(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(idx + 1); stopAutoplay(); startAutoplay(); });

    media.addEventListener('mouseenter', stopAutoplay);
    media.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  });
}
// give onerror-based slide removals a moment to fire first
setTimeout(initGalleries, 400);

/* ============================================================
   HERO TYPING EFFECT — rotates through a few roles
============================================================ */
const roles = ["Full-Stack Developer", "Problem Solver", "Coffee-Fueled Coder"];
const typeEl = document.getElementById('typeLine');

if (typeEl) {
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeRole() {
    const current = roles[roleIndex];
    let speed = 90;

    if (!isDeleting) {
      typeEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        speed = 1600;
      }
    } else {
      typeEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      speed = 45;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }
    }
    setTimeout(typeRole, speed);
  }

  typeRole();
}

/* ============================================================
   SCROLL REVEAL
============================================================ */
const revealEls = document.querySelectorAll('.reveal');
function onScroll() {
  const h = window.innerHeight;
  revealEls.forEach(el => {
    if (el.getBoundingClientRect().top < h - 100) el.classList.add('active');
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ============================================================
   PROJECT DOMAIN FILTER TABS
============================================================ */
const tabs = document.querySelectorAll('#domainTabs .tab-btn');
const cards = document.querySelectorAll('#projectGrid .project-card[data-domain]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.dataset.active = 'false');
    tab.dataset.active = 'true';
    const domain = tab.dataset.domain;
    cards.forEach(card => {
      const match = domain === 'all' || card.dataset.domain === domain;
      card.dataset.visible = match ? 'true' : 'false';
    });
  });
});

/* ============================================================
   SKILLS TOOLKIT — pill renderer
============================================================ */
const skillGroups = {
  skillsDev: ['JavaScript', 'React.js', 'Next.js', 'Node.js', 'Java', 'HTML', 'CSS', 'REST APIs', 'JWT Auth', 'Python', 'GitHub'],
  skillsSupport: ['System Troubleshooting', 'Remote Troubleshooting', 'Help Desk', 'Documentation', 'Customer Service', 'Jira', 'Zendesk'],
  skillsData: ['MySQL', 'SQL', 'Data Analysis', 'Microsoft Excel', 'Data Processing'],
  skillsPM: ['Agile', 'Project Tracking', 'Risk Management', 'Requirements Gathering', 'Project Scheduling', 'SDLC'],
  skillsSoft: ['Communication', 'Team Collaboration', 'Problem Solving', 'Analytical Thinking', 'Research Skills', 'Presentation'],
};

Object.entries(skillGroups).forEach(([containerId, skills]) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  skills.forEach(skill => {
    const pill = document.createElement('span');
    pill.className = 'tag-pill text-xs px-3 py-1.5 rounded-full';
    pill.textContent = skill;
    container.appendChild(pill);
  });
});

/* ============================================================
   MOBILE NAV
============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
}

/* ============================================================
   FOOTER YEAR
============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();