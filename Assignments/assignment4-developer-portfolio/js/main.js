document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initScrollspy();
  initThemeToggle();
  initPortfolioFilter();
  initTestimonialsCarousel();
  initScrollToTop();
  initCustomSelects();
  initContactForm();
  initSettingsSidebar();
  loadSavedSettings();
  console.log('Portfolio initialized successfully with all features!');
});


function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const isActive = navLinks.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (isActive) {
      icon.className = 'fa-solid fa-xmark';
      menuBtn.setAttribute('aria-label', 'إغلاق القائمة');
    } else {
      icon.className = 'fa-solid fa-bars';
      menuBtn.setAttribute('aria-label', 'فتح القائمة');
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
      menuBtn.setAttribute('aria-label', 'فتح القائمة');
    });
  });

  document.addEventListener('click', function (e) {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
      menuBtn.setAttribute('aria-label', 'فتح القائمة');
    }
  });
}

function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveLink() {
    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', debounce(updateActiveLink, 50));
  updateActiveLink();
}


function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-button');
  const root = document.documentElement;
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  if (savedTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  toggleBtn.addEventListener('click', function () {
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('portfolio_theme', isDark ? 'dark' : 'light');
  });
}


function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.portfolio-filter');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  if (!filterButtons.length || !portfolioItems.length) return;

  portfolioItems.forEach(item => {
    item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filterValue = this.getAttribute('data-filter');

      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.85)';
      });

      setTimeout(() => {
        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });

        setTimeout(() => {
          portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }
          });
        }, 50);
      }, 300);
    });
  });
}

function initTestimonialsCarousel() {
  const carousel = document.getElementById('testimonials-carousel');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const cards = document.querySelectorAll('.testimonial-card-item');

  if (!carousel || !cards.length) return;

  let currentIndex = 0;
  const totalCards = cards.length;

  function getVisibleCardsCount() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  }

  function updateCarousel() {
    const visibleCount = getVisibleCardsCount();
    const maxIndex = totalCards - visibleCount;

    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const cardWidthPercentage = 100 / visibleCount;
    cards.forEach(card => {
      card.style.width = `${cardWidthPercentage}%`;
    });

    const offsetPercentage = currentIndex * cardWidthPercentage;
    carousel.style.transform = `translateX(-${offsetPercentage}%)`;

    indicators.forEach((indicator, idx) => {
      if (idx === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  function slideNext() {
    const visibleCount = getVisibleCardsCount();
    const maxIndex = totalCards - visibleCount;
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function slidePrev() {
    const visibleCount = getVisibleCardsCount();
    const maxIndex = totalCards - visibleCount;
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex;
    }
    updateCarousel();
  }

  if (nextBtn) nextBtn.addEventListener('click', slideNext);
  if (prevBtn) prevBtn.addEventListener('click', slidePrev);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  window.addEventListener('resize', debounce(updateCarousel, 150));
  updateCarousel();
}


function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-to-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 350) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }, 80));

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initCustomSelects() {
  const customSelects = document.querySelectorAll('.custom-select');

  customSelects.forEach(select => {
    const selectedText = select.querySelector('.selected-text');
    const chevronIcon = select.querySelector('.fa-chevron-down');
    const optionsContainer = select.nextElementSibling;
    const options = optionsContainer.querySelectorAll('.custom-option');

    select.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = optionsContainer.classList.contains('open');

      document.querySelectorAll('.custom-options').forEach(opt => {
        opt.classList.remove('open');
        const prevSelect = opt.previousElementSibling;
        if (prevSelect) {
          const icon = prevSelect.querySelector('.fa-chevron-down');
          if (icon) icon.style.transform = 'rotate(0deg)';
        }
      });

      if (!isOpen) {
        optionsContainer.classList.add('open');
        if (chevronIcon) chevronIcon.style.transform = 'rotate(180deg)';
      }
    });

    options.forEach(option => {
      option.addEventListener('click', function (e) {
        e.stopPropagation();
        const value = this.getAttribute('data-value');
        selectedText.textContent = value;
        selectedText.classList.remove('text-slate-400', 'text-slate-500', 'text-muted');
        selectedText.style.color = 'var(--text-main)';

        select.classList.remove('border-red-500');
        const err = select.closest('.custom-select-wrapper').querySelector('.error-message');
        if (err) err.remove();

        optionsContainer.classList.remove('open');
        if (chevronIcon) chevronIcon.style.transform = 'rotate(0deg)';
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-options').forEach(options => {
      options.classList.remove('open');
      const prevSelect = options.previousElementSibling;
      if (prevSelect) {
        const icon = prevSelect.querySelector('.fa-chevron-down');
        if (icon) icon.style.transform = 'rotate(0deg)';
      }
    });
  });
}

function initContactForm() {
  const form = document.querySelector('#contact form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500'));

    const nameInput = form.querySelector('input[name="fullname"]');
    const emailInput = form.querySelector('input[name="email"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const projectTypeSelect = form.querySelector('.custom-select[data-name="project-type"]');
    const projectTypeText = projectTypeSelect ? projectTypeSelect.querySelector('.selected-text').textContent.trim() : '';

    if (!nameInput.value.trim()) {
      showError(nameInput, 'يرجى إدخال الاسم الكامل');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, 'يرجى إدخال البريد الإلكتروني');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح');
      isValid = false;
    }

    if (phoneInput.value.trim()) {
      const phoneClean = phoneInput.value.replace(/\s+/g, '');
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(phoneClean)) {
        showError(phoneInput, 'يرجى إدخال رقم هاتف صحيح');
        isValid = false;
      }
    }

    if (projectTypeText === 'اختر نوع المشروع' || !projectTypeText) {
      const wrapper = projectTypeSelect.closest('.custom-select-wrapper');
      projectTypeSelect.classList.add('border-red-500');
      showError(wrapper, 'يرجى اختيار نوع المشروع');
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, 'يرجى إدخال تفاصيل المشروع');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'يرجى إدخال المزيد من التفاصيل (10 أحرف على الأقل)');
      isValid = false;
    }

    if (isValid) {
      showSuccessPopup();
      form.reset();

      const selectLabels = form.querySelectorAll('.selected-text');
      if (selectLabels[0]) selectLabels[0].textContent = 'اختر نوع المشروع';
      if (selectLabels[1]) selectLabels[1].textContent = 'اختر الميزانية';
      selectLabels.forEach(label => label.style.color = '');
    }
  });

  function showError(element, message) {
    const errorEl = document.createElement('p');
    errorEl.className = 'error-message text-danger small mt-1';
    errorEl.textContent = message;

    if (element.classList.contains('custom-select-wrapper')) {
      element.appendChild(errorEl);
    } else {
      element.classList.add('border-red-500');
      element.parentElement.appendChild(errorEl);
    }
  }

  function showSuccessPopup() {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'success-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="success-modal-box">
        <div class="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
             style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981, #059669);">
          <i class="fa-solid fa-check fs-1 text-white"></i>
        </div>
        <h3 class="fw-bold mb-3">تم إرسال رسالتك بنجاح!</h3>
        <p class="text-secondary mb-4 fs-5">شكراً لتواصلك يا فنان. سأقوم بالرد عليك في أقرب وقت ممكن.</p>
        <button type="button" class="btn-cta-primary w-100 justify-content-center success-modal-close-btn">
          حسناً
        </button>
      </div>
    `;

    document.body.appendChild(modalOverlay);

    const closeBtn = modalOverlay.querySelector('.success-modal-close-btn');
    closeBtn.addEventListener('click', () => modalOverlay.remove());

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.remove();
    });

    setTimeout(() => {
      if (modalOverlay.parentNode) modalOverlay.remove();
    }, 5000);
  }

  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', function () {
      this.classList.remove('border-red-500');
      const err = this.parentElement.querySelector('.error-message');
      if (err) err.remove();
    });
  });
}

function initSettingsSidebar() {
  const sidebar = document.getElementById('settings-sidebar');
  const toggleBtn = document.getElementById('settings-toggle');
  const closeBtn = document.getElementById('close-settings');
  const resetBtn = document.getElementById('reset-settings');
  const fontOptions = document.querySelectorAll('.font-option');
  const colorsGrid = document.getElementById('theme-colors-grid');

  if (!sidebar || !toggleBtn) return;

  const colorPalettes = [
    { name: "Purple Blue", primary: "#6366f1", secondary: "#8b5cf6", accent: "#ec4899" },
    { name: "Pink Orange", primary: "#ec4899", secondary: "#f97316", accent: "#fb923c" },
    { name: "Green Emerald", primary: "#10b981", secondary: "#059669", accent: "#34d399" },
    { name: "Blue Cyan", primary: "#3b82f6", secondary: "#06b6d4", accent: "#22d3ee" },
    { name: "Red Rose", primary: "#ef4444", secondary: "#f43f5e", accent: "#fb7185" },
    { name: "Amber Orange", primary: "#f59e0b", secondary: "#ea580c", accent: "#fbbf24" }
  ];

  function openSidebar() {
    sidebar.classList.add('show');
    toggleBtn.style.right = '320px';
  }

  function closeSidebar() {
    sidebar.classList.remove('show');
    toggleBtn.style.right = '0';
  }

  toggleBtn.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);

  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains('show')) {
      closeSidebar();
    }
  });

  fontOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      const font = btn.getAttribute('data-font');
      applyFont(font);
    });
  });

  if (colorsGrid) {
    colorsGrid.innerHTML = '';
    colorPalettes.forEach(palette => {
      const btn = document.createElement('button');
      btn.className = 'theme-color-circle';
      btn.style.background = `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`;
      btn.setAttribute('title', palette.name);
      btn.setAttribute('data-primary', palette.primary);
      btn.setAttribute('data-secondary', palette.secondary);
      btn.setAttribute('data-accent', palette.accent);

      btn.addEventListener('click', () => {
        applyTheme(palette.primary, palette.secondary, palette.accent);
        colorsGrid.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        localStorage.setItem('portfolio_palette', JSON.stringify(palette));
      });

      colorsGrid.appendChild(btn);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('portfolio_font');
      localStorage.removeItem('portfolio_palette');
      applyFont('tajawal');
      const defaultPalette = colorPalettes[0];
      applyTheme(defaultPalette.primary, defaultPalette.secondary, defaultPalette.accent);

      if (colorsGrid) {
        const firstBtn = colorsGrid.querySelector('button');
        if (firstBtn) {
          colorsGrid.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          firstBtn.classList.add('active');
        }
      }
      closeSidebar();
    });
  }
}

function applyFont(fontName) {
  document.body.classList.remove('font-alexandria', 'font-tajawal', 'font-cairo');
  document.body.classList.add(`font-${fontName}`);

  document.querySelectorAll('.font-option').forEach(btn => {
    if (btn.getAttribute('data-font') === fontName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  localStorage.setItem('portfolio_font', fontName);
}

function applyTheme(primary, secondary, accent) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', primary);
  root.style.setProperty('--color-secondary', secondary);
  root.style.setProperty('--color-accent', accent);

  const rgbPrimary = hexToRgb(primary);
  const rgbSecondary = hexToRgb(secondary);
  const rgbAccent = hexToRgb(accent);

  if (rgbPrimary) root.style.setProperty('--color-primary-rgb', `${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}`);
  if (rgbSecondary) root.style.setProperty('--color-secondary-rgb', `${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}`);
  if (rgbAccent) root.style.setProperty('--color-accent-rgb', `${rgbAccent.r}, ${rgbAccent.g}, ${rgbAccent.b}`);
}

function loadSavedSettings() {
  const savedFont = localStorage.getItem('portfolio_font') || 'tajawal';
  applyFont(savedFont);

  const savedPaletteJson = localStorage.getItem('portfolio_palette');
  if (savedPaletteJson) {
    try {
      const palette = JSON.parse(savedPaletteJson);
      applyTheme(palette.primary, palette.secondary, palette.accent);
      setTimeout(() => {
        const buttons = document.querySelectorAll('#theme-colors-grid button');
        buttons.forEach(btn => {
          if (btn.getAttribute('data-primary') === palette.primary) {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
          }
        });
      }, 100);
    } catch (e) {
      console.error('Error loading saved palette:', e);
    }
  } else {
    setTimeout(() => {
      const firstBtn = document.querySelector('#theme-colors-grid button');
      if (firstBtn) firstBtn.classList.add('active');
    }, 100);
  }
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  } else if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}