// main.js

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect
  const header = document.getElementById('site-header');
  const checkScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  // Check scroll position on page load and on scroll
  checkScroll();
  window.addEventListener('scroll', checkScroll);

  // 2. Mobile Navigation Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle aria-expanded
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle nav open class
      if (isExpanded) {
        mobileNav.classList.remove('open');
      } else {
        mobileNav.classList.add('open');
      }
    });

    // Close mobile nav when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
      });
    });
  }

  // 3. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Delay trigger based on inline delay style (if any)
          const delayAttr = entry.target.style.animationDelay;
          const delayMs = delayAttr ? parseInt(delayAttr) : 0;
          
          setTimeout(() => {
            entry.target.classList.add('reveal-active');
          }, delayMs);
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('reveal-active'));
  }
});
