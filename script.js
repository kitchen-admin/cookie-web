document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.waitlist-form');
  const modal = document.getElementById('waitlist-modal');
  const modalClose = document.getElementById('modal-close');
  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzUSn-mA-klV2fVbkM6c_mtGBGVYw4akafiSDZAH6mtvTkaJ9iSuZ66rRUvz3674clE/exec';

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

  if (modalClose) {
    modalClose.addEventListener('click', hideModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideModal();
      }
    });
  }

  forms.forEach(form => {
    const input = form.querySelector('.waitlist-input');
    const button = form.querySelector('.waitlist-btn');
    const buttonTextSpan = button.querySelector('span:not(.waitlist-btn__arrow)');
    const originalText = buttonTextSpan ? buttonTextSpan.innerText : 'Submit';
    
    let errorMsg = form.querySelector('.waitlist-error');
    if (!errorMsg) {
      errorMsg = document.createElement('div');
      errorMsg.className = 'waitlist-error';
      errorMsg.style.color = 'var(--color-accent)';
      errorMsg.style.fontSize = '0.875rem';
      errorMsg.style.display = 'none';
      errorMsg.style.position = 'absolute';
      errorMsg.style.top = '100%';
      errorMsg.style.left = '0';
      errorMsg.style.marginTop = '0.5rem';
      errorMsg.style.width = '100%';
      form.style.position = 'relative';
      form.appendChild(errorMsg);
    }
    
    // Validate email format function
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

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
        const response = await fetch(WEB_APP_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email })
        });
        
        // Google Apps script with JSON response might still resolve successfully
        if (!response.ok && response.type !== 'opaque') {
          throw new Error('Network response was not ok');
        }
        
        showModal();
        form.reset();
        
      } catch (err) {
        // Fallback generic error
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
});
