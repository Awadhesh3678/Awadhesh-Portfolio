// ================================================================
// AWADHESH PORTFOLIO — Enhanced JavaScript
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Toggle ---
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      mobileMenuButton.setAttribute('aria-expanded', !isOpen);
      // Toggle icon between menu and close
      const icon = mobileMenuButton.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'ri-menu-line ri-lg' : 'ri-close-line ri-lg';
      }
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuButton.querySelector('i');
        if (icon) icon.className = 'ri-menu-line ri-lg';
      });
    });
  }

  // --- Typing Effect ---
  const typingTextElement = document.getElementById('typing-text');
  if (typingTextElement) {
    const texts = ['Data Analyst', 'PowerBI Developer', 'Problem Solver', 'Data Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentText = texts[textIndex];

      if (isDeleting) {
        typingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => { isDeleting = true; }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }

      const typingSpeed = isDeleting ? 40 : 120;
      setTimeout(type, typingSpeed);
    }
    // Small delay before starting so the page renders first
    setTimeout(type, 600);
  }

  // --- Project Filtering ---
  const filterButtons = document.querySelectorAll('.project-filter');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button styles
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('text-dark-400', 'bg-dark-800', 'border', 'border-dark-700');
      });
      button.classList.add('bg-primary', 'text-white');
      button.classList.remove('text-dark-400', 'bg-dark-800', 'border', 'border-dark-700');

      const filter = button.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          // Re-trigger reveal animation
          setTimeout(() => card.classList.add('revealed'), 50);
        } else {
          card.classList.add('hidden');
          card.classList.remove('revealed');
        }
      });
    });
  });

  // --- Header Background on Scroll ---
  const header = document.getElementById('main-header');

  // --- Back to Top Button & Scroll Progress ---
  const backToTopButton = document.querySelector('.back-to-top');
  const scrollProgressBar = document.querySelector('.scroll-progress');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header solid background after 50px
    if (header) {
      if (scrollY > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopButton) {
      if (scrollY > 400) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    }

    // Scroll progress bar
    if (scrollProgressBar) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        const scrolled = (scrollTop / scrollHeight) * 100;
        scrollProgressBar.style.width = scrolled + '%';
      }
    }

    // Active nav link highlighting
    updateActiveNavLink();
  });

  // --- Active Nav Link Highlighting ---
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active', 'text-dark-50');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active', 'text-dark-50');
      }
    });
  }

  // --- Scroll Reveal (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Don't unobserve so re-filtering can re-trigger, but prevent re-animation
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: reveal everything immediately
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // --- Animated Skill Bars (Intersection Observer) ---
  const skillBars = document.querySelectorAll('.skill-progress');

  if ('IntersectionObserver' in window && skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width');
          if (targetWidth) {
            bar.style.width = targetWidth + '%';
          }
          skillObserver.unobserve(bar);
        }
      });
    }, {
      threshold: 0.3
    });

    skillBars.forEach(bar => skillObserver.observe(bar));
  } else {
    // Fallback
    skillBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      if (targetWidth) bar.style.width = targetWidth + '%';
    });
  }

  // --- Contact Form Submission with Formspree ---
  const contactForm = document.getElementById('contact-form');
  const statusMsg = document.getElementById('status-msg');

  if (contactForm && statusMsg) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      statusMsg.textContent = '⏳ Sending message...';
      statusMsg.style.color = '#818cf8';
      statusMsg.classList.remove('hidden');

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(response => {
          if (response.ok) {
            statusMsg.textContent = '✅ Message sent successfully!';
            statusMsg.style.color = '#34d399';
            contactForm.reset();
          } else {
            statusMsg.textContent = '❌ Failed to send message. Please try again.';
            statusMsg.style.color = '#f87171';
          }
          hideStatusAfterDelay();
        })
        .catch(() => {
          statusMsg.textContent = '❌ Network error. Please check your internet connection.';
          statusMsg.style.color = '#f87171';
          hideStatusAfterDelay();
        });
    });

    function hideStatusAfterDelay() {
      setTimeout(() => {
        statusMsg.textContent = '';
        statusMsg.classList.add('hidden');
      }, 5000);
    }
  }

  // --- Dynamic Copyright Year ---
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
