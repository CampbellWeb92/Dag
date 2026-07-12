'use strict';

function renderLayout(activePage = '') {
  const headerTarget = document.querySelector('[data-site-header]');
  const footerTarget = document.querySelector('[data-site-footer]');

  const dogLogo = `
    <svg class="brand-logo" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M17 24c-7-7-9-15-5-18 5-3 13 4 17 10 2-1 5-2 8-2s6 1 8 2c4-6 12-13 17-10 4 3 2 11-5 18 1 3 2 6 2 10 0 14-12 24-27 24S5 48 5 34c0-4 1-7 2-10h10Z" fill="currentColor"/>
      <circle cx="24" cy="34" r="3" fill="#fff"/><circle cx="40" cy="34" r="3" fill="#fff"/>
      <path d="M27 43c2 3 8 3 10 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
    </svg>`;

  const links = [
    ['home', 'index.html', 'Home'],
    ['breeders', 'breeders.html', 'Breeders'],
    ['how', 'how-it-works.html', 'How It Works'],
    ['contact', 'contact.html', 'Contact']
  ];

  const navLinks = links.map(([page, href, label]) =>
    `<a href="${href}"${activePage === page ? ' class="active" aria-current="page"' : ''}>${label}</a>`
  ).join('');

  if (headerTarget) {
    headerTarget.innerHTML = `
      <header class="site-header">
        <div class="container nav-wrap">
          <a href="index.html" class="brand" aria-label="Dag home">
            ${dogLogo}
            <span class="brand-name">Dag</span>
          </a>
          <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="main-navigation">
            <span></span><span></span><span></span>
          </button>
          <nav class="site-nav" id="main-navigation" aria-label="Main navigation">${navLinks}</nav>
        </div>
      </header>`;

    const toggle = headerTarget.querySelector('.menu-toggle');
    const nav = headerTarget.querySelector('.site-nav');
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    document.addEventListener('click', event => {
      if (!headerTarget.contains(event.target)) closeMenu();
    });
  }

  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <a href="index.html" class="brand footer-brand">${dogLogo}<span class="brand-name">Dag</span></a>
            <p>Helping responsible breeders connect with caring dog lovers.</p>
          </div>
          <div><h3>Explore</h3><a href="breeders.html">Breeders</a><a href="how-it-works.html">How It Works</a><a href="contact.html">Contact</a></div>
          <div><h3>Contact</h3><p>Johannesburg, South Africa</p><p>support@dag.example</p></div>
        </div>
        <div class="container footer-bottom">© ${new Date().getFullYear()} Dag. All rights reserved.</div>
      </footer>`;
  }
}
