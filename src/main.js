/* ═══════════════════════════════════════════════════════════════
   RHEA SINGH NAGPAL — PORTFOLIO
   Main JavaScript
   Handles: scroll reveals, navigation, project toggles, 
   active section tracking
   ═══════════════════════════════════════════════════════════════ */

import './style.css';

// ── INTERSECTION OBSERVER: REVEAL ON SCROLL ─────────────────
function initRevealObserver() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

// ── NAVIGATION: SCROLL STATE ────────────────────────────────
function initNavScroll() {
  const nav = document.getElementById('nav');
  let ticking = false;

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });
}

// ── NAVIGATION: ACTIVE SECTION TRACKING ─────────────────────
function initActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[data-section]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            if (link.dataset.section === id) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '-80px 0px -50% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// ── MOBILE MENU ─────────────────────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  const links = menu.querySelectorAll('.mobile-menu__link');

  function openMenu() {
    toggle.classList.add('is-active');
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('is-active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
}

// ── PROJECT TOGGLES ─────────────────────────────────────────
function initProjectToggles() {
  const triggers = document.querySelectorAll('.project__trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const controlId = trigger.getAttribute('aria-controls');
      const detail = document.getElementById(controlId);
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        detail.setAttribute('aria-hidden', 'true');
      } else {
        // Close other open projects
        triggers.forEach((otherTrigger) => {
          if (otherTrigger !== trigger) {
            const otherId = otherTrigger.getAttribute('aria-controls');
            const otherDetail = document.getElementById(otherId);
            otherTrigger.setAttribute('aria-expanded', 'false');
            otherDetail.setAttribute('aria-hidden', 'true');
          }
        });

        trigger.setAttribute('aria-expanded', 'true');
        detail.setAttribute('aria-hidden', 'false');

        // Smooth scroll to project after a short delay
        setTimeout(() => {
          const project = trigger.closest('.project');
          if (project) {
            const offset = project.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
          }
        }, 100);
      }
    });

    // Keyboard support
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });
}

// ── SMOOTH ANCHOR SCROLLING ─────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        const offset = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });
}

// ── INITIALISE ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initRevealObserver();
  initNavScroll();
  initActiveSection();
  initMobileMenu();
  initProjectToggles();
  initSmoothScroll();
});
