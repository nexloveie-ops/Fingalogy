// Enhanced Fingalogy Website JavaScript

// Particle Background System
class ParticleBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 80;
    this.mouse = { x: null, y: null, radius: 150 };
    
    this.init();
    this.animate();
    this.setupEventListeners();
  }
  
  init() {
    this.resize();
    this.createParticles();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
      this.ctx.fill();
    });
  }
  
  connectParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 120)})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Mouse interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.2;
          particle.vy -= Math.sin(angle) * force * 0.2;
        }
      }
      
      // Boundary check
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      // Damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawParticles();
    this.connectParticles();
    this.updateParticles();
    requestAnimationFrame(() => this.animate());
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }
}

// Navigation Handler
class Navigation {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navToggle = document.getElementById('navToggle');
    this.navMenu = document.getElementById('navMenu');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }
  
  init() {
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupActiveLink();
  }
  
  setupScrollEffect() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }
  
  setupMobileMenu() {
    if (!this.navToggle || !this.navMenu) return;
    
    this.navToggle.addEventListener('click', () => {
      this.navMenu.classList.toggle('active');
      this.navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
      }
    });
  }
  
  setupSmoothScroll() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          
          if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
            
            // Close mobile menu
            this.navMenu.classList.remove('active');
            this.navToggle.classList.remove('active');
          }
        }
      });
    });
  }
  
  setupActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.about-card, .service-card, .stat-card, .partner-card, .feature-item');
    this.init();
  }
  
  init() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    this.elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease-out';
      observer.observe(el);
    });
  }
}

// Counter Animation
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('.stat-number[data-target]');
    this.animated = false;
    this.init();
  }
  
  init() {
    const observerOptions = {
      threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animated = true;
          this.animateCounters();
        }
      });
    }, observerOptions);
    
    if (this.counters.length > 0) {
      observer.observe(this.counters[0].closest('.stats-section'));
    }
  }
  
  animateCounters() {
    this.counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  }
}

// Back to Top Button
class BackToTop {
  constructor() {
    this.button = document.getElementById('backToTop');
    if (!this.button) return;
    
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    });
    
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Contact Form Handler with EmailJS
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    if (!this.form) return;
    
    // EmailJS Configuration
    this.config = {
      publicKey: 'qVn_IKILaZEZca2RQ',
      serviceId: 'service_d6it74r',
      templateId: 'template_vyilr5u'
    };
    
    this.submitBtn = document.getElementById('submitBtn');
    this.btnText = document.getElementById('btnText');
    this.btnLoader = document.getElementById('btnLoader');
    this.formMessage = document.getElementById('formMessage');
    
    this.init();
  }
  
  init() {
    // Initialize EmailJS with your public key
    if (typeof emailjs !== 'undefined') {
      emailjs.init(this.config.publicKey);
    }
    
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendEmail();
    });
  }
  
  async sendEmail() {
    // Disable submit button
    this.submitBtn.disabled = true;
    this.btnText.style.display = 'none';
    this.btnLoader.style.display = 'inline';
    this.formMessage.style.display = 'none';
    
    try {
      // Check if EmailJS is loaded
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS library not loaded');
      }
      
      // Send email using EmailJS
      const response = await emailjs.sendForm(
        this.config.serviceId,
        this.config.templateId,
        this.form
      );
      
      console.log('Email sent successfully:', response);
      
      // Show success message
      this.showMessage('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
      
      // Reset form
      this.form.reset();
      
    } catch (error) {
      console.error('Email send failed:', error);
      
      // Show error message
      this.showMessage('Sorry, there was an error sending your message. Please try again or contact us directly at info@fingalogy.com', 'error');
    } finally {
      // Re-enable submit button
      this.submitBtn.disabled = false;
      this.btnText.style.display = 'inline';
      this.btnLoader.style.display = 'none';
    }
  }
  
  showMessage(message, type) {
    this.formMessage.textContent = message;
    this.formMessage.style.display = 'block';
    this.formMessage.style.color = type === 'success' ? '#00ff88' : '#ff4444';
    this.formMessage.style.padding = '1rem';
    this.formMessage.style.borderRadius = '10px';
    this.formMessage.style.background = type === 'success' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 68, 68, 0.1)';
    
    // Hide message after 5 seconds
    setTimeout(() => {
      this.formMessage.style.display = 'none';
    }, 5000);
  }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize particle background
  new ParticleBackground('particle-canvas');
  
  // Initialize navigation
  new Navigation();
  
  // Initialize scroll animations
  new ScrollAnimations();
  
  // Initialize counter animations
  new CounterAnimation();
  
  // Initialize back to top button
  new BackToTop();
  
  // Initialize contact form
  new ContactForm();
  
  console.log('Fingalogy website initialized successfully!');
});
