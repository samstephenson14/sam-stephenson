(function () {
  'use strict';

  var CSS = [
    '#site-nav{position:fixed;top:0;left:0;right:0;background:rgba(17,24,39,0.95);',
    'backdrop-filter:blur(10px);border-bottom:1px solid rgba(157,123,216,0.3);',
    'padding:15px 0;z-index:1000;box-shadow:0 4px 20px rgba(0,0,0,0.3);}',
    '.nav-container{max-width:1200px;margin:0 auto;padding:0 20px;',
    'display:flex;justify-content:space-between;align-items:center;}',
    '.nav-logo{font-size:1.5em;font-weight:700;color:#9d7bd8;text-decoration:none;',
    'transition:transform 0.3s;display:flex;align-items:center;}',
    '.nav-logo:hover{transform:scale(1.1);}',
    '.nav-links{display:flex;gap:20px;list-style:none;align-items:center;}',
    '.nav-links a{color:#d1d5db;text-decoration:none;font-weight:500;font-size:0.95em;',
    'padding:8px 14px;border-radius:8px;transition:all 0.3s;position:relative;}',
    '.nav-links a:hover{color:#9d7bd8;background:rgba(157,123,216,0.1);}',
    '.nav-links a.active{color:#20b2aa;background:rgba(32,178,170,0.15);}',
    '.nav-links a.active::after{content:"";position:absolute;bottom:0;left:14px;right:14px;',
    'height:2px;background:linear-gradient(90deg,#9d7bd8,#20b2aa);border-radius:2px;}',
    '.nav-cta{background:linear-gradient(135deg,#9d7bd8,#20b2aa)!important;',
    'color:white!important;padding:10px 20px!important;border-radius:50px!important;',
    'box-shadow:0 4px 15px rgba(157,123,216,0.4);}',
    '.nav-cta:hover{transform:translateY(-2px);',
    'box-shadow:0 6px 20px rgba(157,123,216,0.6)!important;}',
    '.nav-cta.active::after{display:none;}',
    '.mobile-menu-toggle{display:none;background:none;border:none;',
    'color:#d1d5db;font-size:1.5em;cursor:pointer;padding:5px;}',
    'body{padding-top:70px;}',
    '@media(max-width:1024px){',
    '.mobile-menu-toggle{display:block;}',
    '.nav-links{position:fixed;top:60px;left:0;right:0;',
    'background:rgba(17,24,39,0.98);backdrop-filter:blur(10px);',
    'flex-direction:column;gap:0;padding:20px 0;',
    'border-bottom:1px solid rgba(157,123,216,0.3);',
    'transform:translateY(-100%);opacity:0;transition:all 0.3s;',
    'pointer-events:none;z-index:999;}',
    '.nav-links{visibility:hidden;}',
    '.nav-links.active{visibility:visible;transform:translateY(0);opacity:1;pointer-events:all;}',
    '.nav-links a{width:100%;padding:15px 30px;border-radius:0;}',
    '.nav-cta{margin:10px 20px;border-radius:8px!important;}}'
  ].join('');

  var NAV_HTML = '<nav id="site-nav">' +
    '<div class="nav-container">' +
      '<a href="index.html" class="nav-logo" aria-label="Home">&#127968;</a>' +
      '<button class="mobile-menu-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links">&#9776;</button>' +
      '<ul class="nav-links" id="nav-links">' +
        '<li><a href="cv.html" data-page="cv">Resume</a></li>' +
        '<li><a href="about.html" data-page="about">About</a></li>' +
        '<li><a href="projects.html" data-page="projects">Projects</a></li>' +
        '<li><a href="resources.html" data-page="resources">Resources</a></li>' +
        '<li><a href="testimonials.html" data-page="testimonials">Testimonials</a></li>' +
        '<li><a href="work-with-me.html" data-page="work-with-me">Work With Me</a></li>' +
        '<li><a href="contact.html" data-page="contact" class="nav-cta">Contact</a></li>' +
      '</ul>' +
    '</div>' +
  '</nav>';

  // Inject styles into <head>
  var styleEl = document.createElement('style');
  styleEl.id = 'site-nav-styles';
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  // Replace placeholder with nav HTML
  var placeholder = document.getElementById('nav-placeholder');
  if (placeholder) {
    placeholder.outerHTML = NAV_HTML;
  }

  function init() {
    // Mobile menu toggle
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('active');
        toggle.setAttribute('aria-expanded', open);
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Active page highlight
    var raw = window.location.pathname.split('/').pop() || 'index.html';
    var page = raw.replace('.html', '');
    var activeLink = document.querySelector('#nav-links [data-page="' + page + '"]');
    if (activeLink) activeLink.classList.add('active');

    // Dynamic copyright year — updates any element with class "footer-year"
    document.querySelectorAll('.footer-year').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
