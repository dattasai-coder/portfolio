document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Theme Toggle (Dark / Light)
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-theme')) {
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  });

  // 2. Mobile Navbar Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // 3. Typing Animation
  const typingElement = document.getElementById('typing-text');
  const phrases = ['ServiceNow ITSM & CSM', 'REST & Graph APIs', 'PowerShell Orchestration', 'UI Builder & Workspaces'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingElement.textContent = currentPhrase.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }
  typeEffect();

  // 4. Particle Canvas Background
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    draw() {
      ctx.fillStyle = 'rgba(41, 182, 246, 0.5)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  initParticles();
  animateParticles();

  // 5. Scroll Animations & Elements Triggering
  const reveals = document.querySelectorAll('.reveal');
  const progressBars = document.querySelectorAll('.progress');
  const counters = document.querySelectorAll('.counter');
  let animatedCounters = false;

  function handleScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    // Scroll reveal items
    reveals.forEach(reveal => {
      const top = reveal.getBoundingClientRect().top;
      if (top < triggerBottom) {
        reveal.classList.add('active');
      }
    });

    // Skill Bars Trigger
    progressBars.forEach(bar => {
      const top = bar.getBoundingClientRect().top;
      if (top < triggerBottom) {
        bar.style.width = bar.getAttribute('data-width');
      }
    });

    // Counter Animation Trigger
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      const top = statsSection.getBoundingClientRect().top;
      if (top < triggerBottom && !animatedCounters) {
        animatedCounters = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const speed = target / 50;
          const updateCount = () => {
            count += speed;
            if (count < target) {
              counter.innerText = Math.ceil(count);
              setTimeout(updateCount, 30);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
      }
    }

    // Back to top button toggle
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // Back to Top Click
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 6. Architecture Gallery Lightbox Modal
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightbox = document.querySelector('.close-lightbox');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      lightboxImg.src = src;
      lightboxModal.style.display = 'flex';
    });
  });

  closeLightbox.addEventListener('click', () => {
    lightboxModal.style.display = 'none';
  });

  lightboxModal.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightboxModal.style.display = 'none';
    }
  });
});
