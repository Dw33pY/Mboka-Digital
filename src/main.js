document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });
  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });

  // Smooth scrolling for nav links (only internal)
  document.querySelectorAll('nav a[href^="#"], .mobile-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        history.pushState(null, null, targetId);
      }
    });
  });

  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
      backToTop.classList.remove('invisible', 'opacity-0');
    } else {
      backToTop.classList.remove('visible');
      backToTop.classList.add('invisible', 'opacity-0');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Intersection Observer for scroll reveals
  const revealElements = document.querySelectorAll('.service-card, .pricing-card, .feature-card, .extra-item, .contact-info, .contact-form');
  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));

  // Active nav link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Enhanced 3D tilt for pricing cards (desktop only)
  if (window.innerWidth > 768) {
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (rect.width / 2 - (e.clientX - rect.left)) / 15;
        const y = (rect.height / 2 - (e.clientY - rect.top)) / 15;
        card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        card.style.boxShadow = `${-x * 2}px ${y * 2}px 30px rgba(0, 0, 0, 0.4)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        card.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.3)';
      });
    });
  }

  // Form submission with fetch
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';

      fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
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
        alert('There was a problem. Please try again later.');
        console.error(error);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
      });
    });
  }

  // Parallax effect for hero (desktop)
  if (window.innerWidth > 768) {
    const hero = document.querySelector('.hero-section');
    window.addEventListener('scroll', () => {
      hero.style.backgroundPositionY = window.pageYOffset * 0.3 + 'px';
    });
  } else {
    // disable floating shapes on mobile
    document.querySelector('.floating-shapes')?.style.setProperty('display', 'none');
  }
});