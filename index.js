/* ============================================
   PORTFOLIO JS — Sargurunathan
   Python Full Stack Developer
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Cursor Glow ─────────────────────────────
  // const cursorGlow = document.getElementById('cursorGlow');
  // let mouseX = 0, mouseY = 0;
  // let glowX = 0, glowY = 0;

  // document.addEventListener('mousemove', (e) => {
  //   mouseX = e.clientX;
  //   mouseY = e.clientY;
  //   cursorGlow.style.opacity = '1';
  // });

  // document.addEventListener('mouseleave', () => {
  //   cursorGlow.style.opacity = '0';
  // });

 
  // ─── Particle Background ─────────────────────
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(14, 58, 237, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles
  const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.update();
      p.draw();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ─── Navbar Scroll Effect ────────────────────
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background
    navbar.classList.toggle('scrolled', scrollY > 50);

    // Active section highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link =>  {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

//   // ─── Mobile Navigation ───────────────────────
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

//   // ─── Typing Animation ────────────────────────
  const typedElement = document.getElementById('typedText');
  const titles = [
    'Python Full Stack Developer',
    'Frontend Developer',
    'Django Expert',
    'Freelancer',
    'Problem Solver'];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeWriter() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typedElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 90;
    } else {
      typedElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500; // Pause before typing
    }

    setTimeout(typeWriter, typeSpeed);
  }
  typeWriter();

  // ─── Counter Animation ───────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;

    statNumbers.forEach(num => {
      const target = parseInt(num.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          num.textContent = target;
          clearInterval(counter);
        } else {
          num.textContent = Math.floor(current);
        }
      }, 16);
    });

    countersStarted = true;
  }

//   // ─── Skills Tabs ─────────────────────────────
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.skills-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === 'panel-' + tab) {
          panel.classList.add('active');
          // Animate skill bars
          setTimeout(() => {
            panel.querySelectorAll('.skill-fill').forEach(fill => {
              fill.style.width = fill.dataset.width + '%';
            });
          }, 100);
        }
      });
    });
  });

  // ─── Scroll Reveal & Skill Bars ──────────────
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate skill bars when skills section is visible
        if (entry.target.closest('#skills')) {
          const activeFills = entry.target.querySelectorAll('.skills-panel.active .skill-fill');
          activeFills.forEach(fill => {
            fill.style.width = fill.dataset.width + '%';
          });
        }

        // Start counter animation when hero stats are visible
        if (entry.target.closest('.hero') || entry.target.classList.contains('hero')) {
          animateCounters();
        }
      }
    });
  }, observerOptions);

  // Add reveal class to sections
  document.querySelectorAll('.about-grid, .skills-tabs, .skills-content, .services-grid, .projects-grid, .contact-grid, .service-card, .project-card, .skill-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Observe hero section for counters
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    observer.observe(heroSection);
  }

  // Initial skill bar animation for active tab
  setTimeout(() => {
    document.querySelectorAll('.skills-panel.active .skill-fill').forEach(fill => {
      fill.style.width = fill.dataset.width + '%';
    });
  }, 500);

   // ─── Contact Form ────────────────────────────
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
     
    const name = document.getElementById("formname") ;
    const btn = contactForm.querySelector('.btn');
    const originalContent = btn.innerHTML;

    // Success animation
    window.location.href= "https://api.whatsapp.com/send/?phone=8870948927&text&type=phone_number&app_absent=0"
    btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #286d56, #059669)';
    btn.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.35)';

    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.style.background = '';
      btn.style.boxShadow = '';
      contactForm.reset();
    }, 3000);

  });

  // ─── Smooth Scroll for All Links ─────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Stagger Animation for Cards ─────────────
  const staggerElements = document.querySelectorAll('.service-card, .project-card, .skill-card');
  staggerElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.08}s`;
  });

});
