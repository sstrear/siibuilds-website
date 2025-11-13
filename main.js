/* ===================================
   SII BUILDS - MAIN JAVASCRIPT
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ===================================
  // MOBILE NAVIGATION TOGGLE
  // ===================================
  
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      
      // Update aria-expanded for accessibility
      const isOpen = navLinks.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('nav')) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // ===================================
  // ACCORDION FUNCTIONALITY
  // ===================================
  
  const accordions = document.querySelectorAll('.accordion');
  
  accordions.forEach(accordion => {
    const header = accordion.querySelector('.accordion-header');
    
    if (header) {
      header.addEventListener('click', function() {
        // Toggle current accordion
        accordion.classList.toggle('active');
        
        // Optional: Close other accordions (uncomment if desired)
        // accordions.forEach(otherAccordion => {
        //   if (otherAccordion !== accordion) {
        //     otherAccordion.classList.remove('active');
        //   }
        // });
      });
    }
  });
  
  // Check if there's a hash in the URL and open the corresponding accordion
  if (window.location.hash) {
    const hash = window.location.hash.substring(1); // Remove the # symbol
    const targetAccordion = document.getElementById(hash);
    
    if (targetAccordion && targetAccordion.classList.contains('accordion')) {
      // Open the accordion
      targetAccordion.classList.add('active');
      
      // Scroll to the accordion with offset for header
      setTimeout(() => {
        const headerOffset = 80;
        const elementPosition = targetAccordion.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
  
  // ===================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ===================================
  
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===================================
  // ACTIVE NAV LINK HIGHLIGHTING
  // ===================================
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksAll = document.querySelectorAll('.nav-links a');
  
  navLinksAll.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === '/' && linkPage === 'index.html')) {
      link.style.color = 'var(--yellow)';
    }
  });
  
  // ===================================
  // FORM VALIDATION (for contact page)
  // ===================================
  
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields (Name, Email, and Message).');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // If validation passes
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
      
      // In a real application, you would send the form data to a server here
      // Example:
      // fetch('/api/contact', {
      //   method: 'POST',
      //   body: JSON.stringify({ name, email, phone, message }),
      //   headers: { 'Content-Type': 'application/json' }
      // });
    });
  }
  
  // ===================================
  // FADE-IN ANIMATION ON SCROLL
  // ===================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Apply fade-in to cards
  const cards = document.querySelectorAll('.card, .team-member, .project-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
  
});

