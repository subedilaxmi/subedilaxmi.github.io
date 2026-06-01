(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var slug = params.get('id');
  var articles = (window.siteContent && window.siteContent.articles) || [];
  var article = articles.filter(function (a) { return a.slug === slug; })[0];

  var missingEl = document.getElementById('articleMissing');
  var contentEl = document.getElementById('articleContent');

  if (!article) {
    if (missingEl) missingEl.classList.remove('d-none');
    return;
  }

  document.title = article.title + ' - Laxmi Subedi';
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && article.excerpt) metaDesc.setAttribute('content', article.excerpt);

  document.getElementById('articleTag').textContent = article.tag || 'Article';
  document.getElementById('articleTitle').textContent = article.title;
  document.getElementById('articleMeta').textContent =
    (article.readMins ? article.readMins + ' min read' : '') +
    (article.tag ? '  ·  ' + article.tag : '');

  var bodyEl = document.getElementById('articleBody');
  bodyEl.innerHTML = '';
  (article.body || []).forEach(function (paragraph) {
    var p = document.createElement('p');
    p.textContent = paragraph;
    bodyEl.appendChild(p);
  });

  var emailBtn = document.getElementById('articleEmail');
  if (emailBtn && window.siteContact) {
    emailBtn.href = window.siteContact.mailto(
      'About your article: ' + article.title,
      'Hi Laxmi,\n\nI just read "' + article.title + '" and wanted to ask…\n'
    );
  }

  if (contentEl) contentEl.classList.remove('d-none');
})();
