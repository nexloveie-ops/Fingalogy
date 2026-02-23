// Main JavaScript for Fingalogy Website

// Utility Functions
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Navigation Bar Controller
class NavigationBar {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    this.handleScroll();
    window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));
    
    this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
    
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        this.scrollToSection(targetId);
        if (window.innerWidth <= 767) {
          this.toggleMobileMenu();
        }
      });
    });
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle('active');
    this.navToggle.classList.toggle('active');
  }

  scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 60;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }
}

// Particle Background Controller
class ParticleBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', debounce(() => this.resize(), 250));
    this.createParticles(80);
    this.animate();
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  createParticles(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.speedX *= -1;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.speedY *= -1;
      }
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw particles
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
      this.ctx.fill();
    });

    // Draw connections
    this.particles.forEach((p1, i) => {
      this.particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      });
    });
  }

  animate() {
    this.updateParticles();
    this.render();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Scroll Animation Controller
class ScrollAnimationController {
  constructor() {
    this.elements = document.querySelectorAll('.animate-on-scroll');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, options);

      this.elements.forEach(element => {
        this.observer.observe(element);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      this.elements.forEach(element => {
        element.classList.add('visible');
      });
    }
  }
}

// Back to Top Button Controller
class BackToTopButton {
  constructor() {
    this.button = document.getElementById('back-to-top');
    this.init();
  }

  init() {
    window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  handleScroll() {
    if (window.scrollY > 300) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// Image Lazy Loader
class ImageLazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[loading="lazy"]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const options = {
        threshold: 0.01,
        rootMargin: '50px'
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            this.observer.unobserve(img);
          }
        });
      }, options);

      this.images.forEach(img => {
        this.observer.observe(img);
      });
    }
  }

  loadImage(img) {
    const src = img.getAttribute('src');
    if (src) {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
      img.addEventListener('error', () => {
        console.error(`Failed to load image: ${src}`);
        img.alt = 'Image failed to load';
      });
    }
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.lowPerformance = false;
    this.init();
  }

  init() {
    // Check if device prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.body.classList.add('reduced-animations');
    }

    // Monitor FPS
    this.monitor();
  }

  monitor() {
    this.frameCount++;
    const currentTime = performance.now();

    if (currentTime - this.lastTime >= 1000) {
      const fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = currentTime;

      if (fps < 30 && !this.lowPerformance) {
        this.lowPerformance = true;
        document.body.classList.add('reduced-animations');
        console.warn('Low performance detected, reducing animations');
      }
    }

    requestAnimationFrame(() => this.monitor());
  }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Navigation
  new NavigationBar();

  // Initialize Particle Background
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    new ParticleBackground(canvas);
  }

  // Initialize Scroll Animations
  new ScrollAnimationController();

  // Initialize Back to Top Button
  new BackToTopButton();

  // Initialize Image Lazy Loading
  new ImageLazyLoader();

  // Initialize Performance Monitor
  new PerformanceMonitor();

  console.log('Fingalogy website initialized successfully');
});

// Handle online/offline status
window.addEventListener('online', () => {
  console.log('Connection restored');
});

window.addEventListener('offline', () => {
  console.log('Connection lost');
});

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});
