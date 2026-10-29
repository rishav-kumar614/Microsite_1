/* ═══════════════════════════════════════════════════════
   DR. KRISHAN SINGH — COACHING MICROSITE
   main.js | Vanilla JavaScript (ES6+)
══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──── 1. THEME TOGGLE (LIGHT / DARK) ──────────────── */
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? 'dark_mode' : 'light_mode';
    }
  }

  /* ──── 2. NAVBAR SCROLL EFFECT & ACTIVE LINKS ────────── */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  let isScrolling = false;

  function updateScrollState() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    const progressLine = document.getElementById('scrollProgressLine');
    if (progressLine) progressLine.style.width = `${scrolled}%`;

    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    const scrollPosition = window.scrollY + 120;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        updateScrollState();
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  /* ──── 3. MOBILE MENU TOGGLE ───────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  /* ──── 4. SCROLL REVEAL ANIMATIONS ─────────────────── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(element => revealObserver.observe(element));

  /* ──── 5. CONTACT FORM — ENQUIRY TYPE TOGGLE ────────── */
  /* ──── 6. CONTACT FORM ──────────────────────────────── */
  const KSContactForm =
      document.getElementById("advisory-form");

  const KSFormStatus =
      document.getElementById("form-status");


  KSContactForm?.addEventListener("submit", (e) => {

      e.preventDefault();

      /* Show submitting message */

      if (KSFormStatus) {

          KSFormStatus.textContent =
              "Submitting secure consultation request...";

          KSFormStatus.className =
              "form-status-message success";

          KSFormStatus.style.display = "block";
      }


      /* Disable submit button */

      const submitBtn =
          KSContactForm.querySelector(".form-submit-btn");

      if (submitBtn) {
          submitBtn.disabled = true;
      }


      /* Simulated submission */

      setTimeout(() => {

          if (KSFormStatus) {

              KSFormStatus.textContent =
                  "Thank you. Your consultation request has been submitted securely. We will be in touch shortly.";

              KSFormStatus.className =
                  "form-status-message success";
          }


          /* Reset form */

          KSContactForm.reset();


          /* Enable button */

          if (submitBtn) {
              submitBtn.disabled = false;
          }


          /* Hide status after 6 seconds */

          setTimeout(() => {

              if (KSFormStatus) {

                  KSFormStatus.style.opacity = "0";

                  KSFormStatus.style.transition =
                      "opacity 0.5s ease";


                  setTimeout(() => {

                      KSFormStatus.style.display = "none";

                      KSFormStatus.style.opacity = "1";

                  }, 500);
              }

          }, 6000);

      }, 1200);

  });

  /* ──── 7. AWARDS — VIEW MORE TOGGLE ────────────────── */
  const awardsToggleBtn  = document.getElementById('awardsToggleBtn');
  const awardsMore       = document.getElementById('awardsMore');
  const awardsToggleText = document.getElementById('awardsToggleText');
  const awardsToggleIcon = document.getElementById('awardsToggleIcon');

  if (awardsToggleBtn && awardsMore) {
    awardsToggleBtn.addEventListener('click', () => {
      const isOpen = awardsMore.style.display !== 'none';
      awardsMore.style.display      = isOpen ? 'none'               : 'block';
      awardsToggleText.textContent  = isOpen ? 'View More Recognition' : 'Show Less';
      awardsToggleIcon.textContent  = isOpen ? 'expand_more'           : 'expand_less';
    });
  }

  /* ──── 8. AWARDS GALLERY — VIEW ALL TOGGLE ──────────── */
  const galleryToggleBtn  = document.getElementById('galleryToggleBtn');
  const awardsGalleryMore = document.getElementById('awardsGalleryMore');
  const galleryToggleText = document.getElementById('galleryToggleText');
  const galleryToggleIcon = document.getElementById('galleryToggleIcon');

  if (galleryToggleBtn && awardsGalleryMore) {
    galleryToggleBtn.addEventListener('click', () => {
      const isOpen = awardsGalleryMore.style.display === 'grid';
      awardsGalleryMore.style.display = isOpen ? 'none'          : 'grid';
      galleryToggleText.textContent   = isOpen ? 'View All Awards' : 'Show Fewer';
      galleryToggleIcon.textContent   = isOpen ? 'expand_more'     : 'expand_less';
    });
  }

  /* ──── 9. SET CURRENT YEAR IN FOOTER ────────────────── */
  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();

});
