(function () {
  'use strict';

  var content = window.siteContent || { profile: {}, testimonials: [], articles: [] };

  // Theme toggle (light/dark). Persisted, falls back to system preference.
  var root = document.documentElement;
  var themeToggles = document.querySelectorAll('.js-theme-toggle, #themeToggle');
  var STORAGE_KEY = 'laxmi-theme';

  function preferredTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-bs-theme', theme);
    themeToggles.forEach(function (btn) { btn.setAttribute('aria-pressed', String(theme === 'dark')); });
  }

  applyTheme(preferredTheme());
  themeToggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  });

  // Navbar shadow + back-to-top visibility on scroll
  var navbar = document.getElementById('mainNav');
  var navMenu = document.getElementById('navMenu');
  var backToTop = document.getElementById('backToTop');

  function onScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 12);
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile slide-in menu (custom drawer)
  var navToggler = document.getElementById('navToggler');
  var navClose = document.getElementById('navClose');
  var navBackdrop = document.getElementById('navBackdrop');

  function openNav() {
    if (!navMenu) return;
    navMenu.classList.add('open');
    if (navBackdrop) navBackdrop.classList.add('show');
    document.body.classList.add('nav-open');
    if (navToggler) navToggler.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    if (!navMenu) return;
    navMenu.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('show');
    document.body.classList.remove('nav-open');
    if (navToggler) navToggler.setAttribute('aria-expanded', 'false');
  }

  if (navToggler) navToggler.addEventListener('click', openNav);
  if (navClose) navClose.addEventListener('click', closeNav);
  if (navBackdrop) navBackdrop.addEventListener('click', closeNav);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
  if (navMenu) {
    navMenu.querySelectorAll('.nav-link, .btn-brand').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  // Reveal-on-scroll. Re-run after injecting cards so they animate too.
  var revealObserver = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    : null;

  function registerReveals() {
    document.querySelectorAll('.fade-up:not(.in-view)').forEach(function (item) {
      if (revealObserver) revealObserver.observe(item);
      else item.classList.add('in-view');
    });
  }
  registerReveals();

  var yearSpan = document.getElementById('footerYear');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Build the email from its parts at runtime so it isn't sitting in the
  // markup as plain text. Fills any element marked with data-email.
  var profile = content.profile || {};
  var EMAIL = (profile.emailUser || 'hello') + '@' + (profile.emailDomain || 'example.com');

  function buildMailto(subject, body) {
    var query = [];
    if (subject) query.push('subject=' + encodeURIComponent(subject));
    if (body) query.push('body=' + encodeURIComponent(body));
    return 'mailto:' + EMAIL + (query.length ? '?' + query.join('&') : '');
  }
  window.siteContact = { email: EMAIL, mailto: buildMailto };

  document.querySelectorAll('[data-email]').forEach(function (el) {
    if (el.tagName === 'A') el.setAttribute('href', buildMailto());
    var current = (el.textContent || '').trim();
    if (current === '' || current === 'loading…') el.textContent = EMAIL;
  });

  // Testimonials - only rendered (and the section only shown) when present
  var testimonialGrid = document.getElementById('testimonialGrid');
  var testimonialsSection = document.getElementById('testimonialsSection');
  if (testimonialGrid && content.testimonials && content.testimonials.length) {
    if (testimonialsSection) testimonialsSection.classList.remove('d-none');
    content.testimonials.forEach(function (item) {
      var col = document.createElement('div');
      col.className = 'col-md-4 fade-up';
      var figure = document.createElement('figure');
      figure.className = 'testimonial-card h-100';

      var mark = document.createElement('i');
      mark.className = 'bi bi-quote quote-mark';
      var quote = document.createElement('blockquote');
      quote.className = 'mb-3';
      quote.textContent = item.quote;
      var caption = document.createElement('figcaption');
      var name = document.createElement('strong');
      name.textContent = item.name;
      var role = document.createElement('span');
      role.className = 'd-block small text-muted-soft';
      role.textContent = item.role;
      caption.appendChild(name); caption.appendChild(role);

      figure.appendChild(mark); figure.appendChild(quote); figure.appendChild(caption);
      col.appendChild(figure);
      testimonialGrid.appendChild(col);
    });
  }

  // Insights list with pagination
  var ARTICLES_PER_PAGE = 6;
  var insightsGrid = document.getElementById('insightsGrid');
  var insightsPager = document.getElementById('insightsPager');
  var articles = content.articles || [];

  function buildArticleCard(article) {
    var col = document.createElement('div');
    col.className = 'col-md-4 fade-up';

    var card = document.createElement('article');
    card.className = 'post-card h-100';

    var cover = document.createElement('div');
    cover.className = 'post-cover cover-' + (article.cover || 'teal');
    var icon = document.createElement('i');
    icon.className = 'bi ' + (article.icon || 'bi-journal-text');
    cover.appendChild(icon);

    var body = document.createElement('div');
    body.className = 'post-body';

    var tag = document.createElement('span');
    tag.className = 'post-tag';
    tag.textContent = article.tag;

    var title = document.createElement('h3');
    title.className = 'h5';
    title.textContent = article.title;

    var excerpt = document.createElement('p');
    excerpt.className = 'small text-muted-soft';
    excerpt.textContent = article.excerpt;

    var link = document.createElement('a');
    link.className = 'post-link';
    link.href = 'article.html?id=' + encodeURIComponent(article.slug);
    link.innerHTML = 'Read more <i class="bi bi-arrow-right"></i>';

    body.appendChild(tag); body.appendChild(title); body.appendChild(excerpt); body.appendChild(link);
    card.appendChild(cover); card.appendChild(body);
    col.appendChild(card);
    return col;
  }

  function makePageButton(label, page, opts) {
    opts = opts || {};
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.innerHTML = label;
    if (opts.current) btn.setAttribute('aria-current', 'true');
    if (opts.disabled) btn.disabled = true;
    if (!opts.disabled && !opts.current) {
      btn.addEventListener('click', function () { showPage(page, true); });
    }
    return btn;
  }

  function renderPager(currentPage, totalPages) {
    if (!insightsPager) return;
    insightsPager.innerHTML = '';
    if (totalPages <= 1) return;
    insightsPager.appendChild(
      makePageButton('<i class="bi bi-chevron-left"></i>', currentPage - 1, { disabled: currentPage === 1 })
    );
    for (var p = 1; p <= totalPages; p++) {
      insightsPager.appendChild(makePageButton(String(p), p, { current: p === currentPage }));
    }
    insightsPager.appendChild(
      makePageButton('<i class="bi bi-chevron-right"></i>', currentPage + 1, { disabled: currentPage === totalPages })
    );
  }

  function showPage(page, fromClick) {
    if (!insightsGrid) return;
    var totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE) || 1;
    page = Math.min(Math.max(1, page), totalPages);

    insightsGrid.innerHTML = '';
    var start = (page - 1) * ARTICLES_PER_PAGE;
    articles.slice(start, start + ARTICLES_PER_PAGE).forEach(function (article) {
      insightsGrid.appendChild(buildArticleCard(article));
    });

    registerReveals();
    renderPager(page, totalPages);

    if (fromClick) {
      var section = document.getElementById('insights');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (insightsGrid) showPage(1, false);

  // Contact form: validate inline, then open the visitor's mail app
  var form = document.getElementById('contactForm');
  var feedback = document.getElementById('formFeedback');

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setFeedback(message, type) {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = 'form-feedback mt-2 ' + (type ? 'is-' + type : '');
  }

  if (form) {
    var nameField = form.elements['name'];
    var emailField = form.elements['email'];
    var topicField = form.elements['topic'];
    var messageField = form.elements['message'];
    var requiredFields = [nameField, emailField, messageField];

    function validateField(field) {
      var value = field.value.trim();
      var ok = true;
      if (field.hasAttribute('required') && !value) ok = false;
      if (ok && field.type === 'email' && !isValidEmail(value)) ok = false;
      field.classList.toggle('is-invalid', !ok);
      return ok;
    }

    requiredFields.forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.classList.contains('is-invalid')) validateField(field);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var allValid = true;
      var firstInvalid = null;
      requiredFields.forEach(function (field) {
        if (!validateField(field)) {
          allValid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (!allValid) {
        setFeedback('Please complete the highlighted fields below.', 'error');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var name = nameField.value.trim();
      var topic = topicField ? topicField.value : 'General enquiry';
      var subject = 'Website enquiry (' + topic + ') - ' + name;
      var body =
        'Name: ' + name + '\n' +
        'Email: ' + emailField.value.trim() + '\n' +
        'Topic: ' + topic + '\n\n' +
        'Message:\n' + messageField.value.trim() + '\n';

      window.location.href = buildMailto(subject, body);
      setFeedback('Thanks, ' + name.split(' ')[0] + '. Your email app is opening - just press send.', 'success');
    });
  }
})();
