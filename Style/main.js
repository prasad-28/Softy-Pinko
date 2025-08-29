/* ============================
   Main JavaScript for Softy Pinko
=============================== */

// ===== MOBILE MENU TOGGLE =====
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  
  if (navMenu && mobileToggle) {
    navMenu.classList.toggle('show');
    mobileToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('show')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  const navMenu = document.getElementById('navMenu');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  
  if (navMenu && mobileToggle && !navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
    navMenu.classList.remove('show');
    mobileToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav_items a, .dropdown_nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const navMenu = document.getElementById('navMenu');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      
      if (navMenu && mobileToggle) {
        navMenu.classList.remove('show');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
});

// Close menu on window resize
window.addEventListener('resize', function() {
  const navMenu = document.getElementById('navMenu');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  
  if (window.innerWidth > 768 && navMenu && mobileToggle) {
    navMenu.classList.remove('show');
    mobileToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + "+";
  }, 20);
}

// ===== INTERSECTION OBSERVER FOR COUNTERS =====
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.Nom_style');
      counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        animateCounter(counter, target);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe counter section
const counterSection = document.querySelector('.counter_section');
if (counterSection) {
  observer.observe(counterSection);
}

// ===== SCROLL TO TOP FUNCTIONALITY =====
window.addEventListener('scroll', function() {
  const scrollTop = document.querySelector('.scroll-top');
  if (window.pageYOffset > 300) {
    if (scrollTop) scrollTop.style.display = 'block';
  } else {
    if (scrollTop) scrollTop.style.display = 'none';
  }
});

// ===== FORM VALIDATION =====
const contactForm = document.querySelector('.login_details_inner');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = this.querySelector('input[type="text"]');
    const emailInput = this.querySelector('input[type="email"]');
    const messageInput = this.querySelector('textarea');
    
    let isValid = true;
    
    // Simple validation
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Name is required');
      isValid = false;
    }
    
    if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
      showError(emailInput, 'Valid email is required');
      isValid = false;
    }
    
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Message is required');
      isValid = false;
    }
    
    if (isValid) {
      // Here you would typically send the form data
      showSuccess('Message sent successfully!');
      this.reset();
    }
  });
}

// ===== HELPER FUNCTIONS =====
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(element, message) {
  // Remove existing error
  const existingError = element.parentNode.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  // Add new error
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.color = '#ff589e';
  errorDiv.style.fontSize = '12px';
  errorDiv.style.marginTop = '5px';
  errorDiv.textContent = message;
  
  element.parentNode.appendChild(errorDiv);
  element.style.borderColor = '#ff589e';
}

function showSuccess(message) {
  // Create success notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #8261ee;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// ===== ANIMATION ON SCROLL =====
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1
});

// Observe elements for animation
document.querySelectorAll('.feature_box, .Testimonial_box, .price_bx, .blog_box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  animateOnScroll.observe(el);
});

// ===== LAZY LOADING FOR IMAGES =====
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

// Observe lazy images
document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// ===== NAVIGATION ACTIVE STATE =====
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav_items a, .dropdown_nav a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('nav_active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('nav_active');
    }
  });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== MOBILE NAVIGATION ENHANCEMENTS =====
// Add touch support for mobile menu
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const navMenu = document.getElementById('navMenu');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  
  // Swipe up to close menu
  if (touchEndY < touchStartY - 50 && navMenu && navMenu.classList.contains('show')) {
    navMenu.classList.remove('show');
    if (mobileToggle) mobileToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('Softy Pinko website loaded successfully!');
  
  // Initialize any additional functionality here
  const currentYear = new Date().getFullYear();
  const yearElement = document.querySelector('.current-year');
  if (yearElement) {
    yearElement.textContent = currentYear;
  }
  
  // Ensure mobile menu toggle button exists and works
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMenu);
  }
  
  // Add mobile menu toggle button if it doesn't exist
  if (!mobileToggle) {
    const toggleButton = document.createElement('i');
    toggleButton.className = 'fa-solid fa-bars mobile-menu-toggle';
    toggleButton.addEventListener('click', toggleMenu);
    
    const nav = document.querySelector('.main_navigation_header');
    if (nav) {
      nav.appendChild(toggleButton);
    }
  }
});
