import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.addEventListener('DOMContentLoaded', function() {
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
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
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
  animateOnScroll(); // Run once on page load
  
  // Form submission
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For now, we'll just show an alert
      alert(`Thank you, ${name}! Your message has been received. We'll contact you at ${email} soon.`);
      
      // Reset the form
      contactForm.reset();
    });
  }
  
  // Add parallax effect to hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
  }
  
  // Add 3D tilt effect to cards
  const cards = document.querySelectorAll('.service-card, .pricing-card, .feature-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.1s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'all 0.5s ease';
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  });
});