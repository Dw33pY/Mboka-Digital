document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const themeIcon = document.getElementById('theme-icon');
  const themeIconMobile = document.getElementById('theme-icon-mobile');

  function setTheme(theme) {
    document.body.classList.toggle('light-theme', theme === 'light');
    const icons = [themeIcon, themeIconMobile];
    icons.forEach(icon => {
      if (icon) {
        icon.classList.toggle('fa-sun', theme === 'light');
        icon.classList.toggle('fa-moon', theme !== 'light');
      }
    });
    localStorage.setItem('theme', theme);
  }

  // Check for saved theme preference
  const currentTheme = localStorage.getItem('theme') || 'dark';
  setTheme(currentTheme);

  // Theme toggle event listeners
  [themeToggle, themeToggleMobile].forEach(toggle => {
    if (toggle) {
      toggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        setTheme(isLight ? 'dark' : 'light');
      });
    }
  });

  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });
  
  // Close mobile menu when clicking a link
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
    });
  });
  
  // Smooth scrolling for navigation links (updated to exclude pricing card buttons)
  const navLinks = document.querySelectorAll('nav a[href^="#"], .mobile-menu a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default for these specific navigation links
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          window.location.hash = targetId;
        }
      }
    });
  });
  
  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
      backToTopButton.classList.remove('invisible');
      backToTopButton.classList.remove('opacity-0');
    } else {
      backToTopButton.classList.remove('visible');
      backToTopButton.classList.add('invisible');
      backToTopButton.classList.add('opacity-0');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.service-card, .pricing-card, .feature-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.service-card, .pricing-card, .feature-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // Enhanced 3D tilt effect for pricing cards (desktop only)
  if (window.innerWidth > 768) {
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const xAxis = (cardRect.width / 2 - (e.clientX - cardRect.left)) / 15;
        const yAxis = (cardRect.height / 2 - (e.clientY - cardRect.top)) / 15;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        card.style.boxShadow = `${-xAxis * 2}px ${yAxis * 2}px 30px rgba(0, 0, 0, 0.3)`;
      });
      
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.1s ease';
        card.style.zIndex = '10';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        card.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.3)';
        card.style.zIndex = '1';
      });
    });
  }

  // Form submission with fetch API
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitButton = this.querySelector('button[type="submit"]');
      
      // Disable button during submission
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
      
      fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          alert('Thank you! Your message has been sent.');
          this.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        alert('There was a problem sending your message. Please try again later.');
        console.error('Error:', error);
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
      });
    });
  }

  // Disable motion effects on mobile
  if (window.innerWidth > 768) {
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
      });
    }
  } else {
    // Remove floating shapes on mobile
    const floatingShapes = document.querySelector('.floating-shapes');
    if (floatingShapes) {
      floatingShapes.style.display = 'none';
    }
  }
  
});