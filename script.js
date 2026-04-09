document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════
     WAITLIST FORM + MODAL
  ══════════════════════════════════════════ */
  const forms = document.querySelectorAll('.waitlist-form');
  const modal = document.getElementById('waitlist-modal');
  const modalClose = document.getElementById('modal-close');
  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzOHx3tnmxrKcNx1Lhc0Ok9CrGztqwjOtegKO375HqQgzprlWF9icPi2sEDp4tBaEwqOQ/exec';

  const showModal = () => {
    if (modal) {
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('modal-overlay--active');
    }
  };

  const hideModal = () => {
    if (modal) {
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('modal-overlay--active');
    }
  };

  if (modalClose) modalClose.addEventListener('click', hideModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });

  forms.forEach(form => {
    const input = form.querySelector('.waitlist-input');
    const button = form.querySelector('.waitlist-btn');
    const buttonTextSpan = button.querySelector('span:not(.waitlist-btn__arrow)');
    const originalText = buttonTextSpan ? buttonTextSpan.innerText : 'Submit';

    let errorMsg = form.querySelector('.waitlist-error');
    if (!errorMsg) {
      errorMsg = document.createElement('div');
      errorMsg.className = 'waitlist-error';
      errorMsg.style.cssText = 'color:var(--color-accent);font-size:.875rem;display:none;position:absolute;top:100%;left:0;margin-top:.5rem;width:100%';
      form.style.position = 'relative';
      form.appendChild(errorMsg);
    }

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = input.value.trim();

      if (!email || !isValidEmail(email)) {
        errorMsg.textContent = 'Please enter a valid email address.';
        errorMsg.style.display = 'block';
        return;
      }

      errorMsg.style.display = 'none';
      button.disabled = true;
      button.style.opacity = '0.7';
      button.style.cursor = 'not-allowed';
      if (buttonTextSpan) buttonTextSpan.innerText = 'Submitting...';

      try {
        await fetch(WEB_APP_URL, {
          method: 'POST',
          body: new URLSearchParams({ email })
        });
        showModal();
        form.reset();
      } catch (err) {
        errorMsg.textContent = 'An error occurred. Please try again later.';
        errorMsg.style.display = 'block';
        console.error('Waitlist submission error:', err);
      } finally {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
        if (buttonTextSpan) buttonTextSpan.innerText = originalText;
      }
    });
  });

  /* ══════════════════════════════════════════
     SCROLL REVEAL (Intersection Observer)
  ══════════════════════════════════════════ */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ══════════════════════════════════════════
     ANIMATED COUNTERS
  ══════════════════════════════════════════ */
  const statNums = document.querySelectorAll('.stat-num[data-target]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => counterObserver.observe(el));
  }

  /* ══════════════════════════════════════════
     FAQ ACCORDION
  ══════════════════════════════════════════ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-item__q');
    const answer = item.querySelector('.faq-item__a');

    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      faqItems.forEach(other => {
        const otherBtn = other.querySelector('.faq-item__q');
        const otherAns = other.querySelector('.faq-item__a');
        if (otherBtn && otherAns && otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAns.style.maxHeight = '0';
        }
      });

      // Toggle current
      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ══════════════════════════════════════════
     HERO KEYWORD TYPEWRITER
  ══════════════════════════════════════════ */
  const keywordEl = document.getElementById('hero-keyword');
  if (keywordEl) {
    const keywords = [
      'losing weight',
      'building strength',
      'eating healthier',
      'staying fit',
      'feeling great',
    ];
    let currentIndex = 0;
    let isDeleting = false;
    let charIndex = keywords[0].length; // Start fully written
    let typingTimeout;

    const TYPE_SPEED   = 70;
    const DELETE_SPEED = 40;
    const PAUSE_AFTER  = 2200;
    const PAUSE_BEFORE = 350;

    const type = () => {
      const current = keywords[currentIndex];

      if (!isDeleting) {
        keywordEl.textContent = current.slice(0, charIndex);
        if (charIndex < current.length) {
          charIndex++;
          typingTimeout = setTimeout(type, TYPE_SPEED);
        } else {
          typingTimeout = setTimeout(() => {
            isDeleting = true;
            type();
          }, PAUSE_AFTER);
        }
      } else {
        keywordEl.textContent = current.slice(0, charIndex);
        if (charIndex > 0) {
          charIndex--;
          typingTimeout = setTimeout(type, DELETE_SPEED);
        } else {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % keywords.length;
          charIndex = 0;
          typingTimeout = setTimeout(type, PAUSE_BEFORE);
        }
      }
    };

    // Start cycle after initial pause
    typingTimeout = setTimeout(() => {
      isDeleting = true;
      type();
    }, PAUSE_AFTER);
  }

});
