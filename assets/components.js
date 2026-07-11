function logoSvg() {
  return `<span class="logo-mark" aria-hidden="true"><svg viewBox="0 0 64 64" role="img"><path fill="#fff" d="M18 25c-5-8-2-16 5-16 5 0 8 5 9 9 1-4 4-9 9-9 7 0 10 8 5 16 5 4 8 10 8 16 0 10-9 17-22 17S10 51 10 41c0-6 3-12 8-16Z"/><circle cx="25" cy="34" r="3" fill="#101820"/><circle cx="39" cy="34" r="3" fill="#101820"/><path d="M25 43c4 5 10 5 14 0" fill="none" stroke="#101820" stroke-width="3" stroke-linecap="round"/><path d="M29 40h6" stroke="#101820" stroke-width="4" stroke-linecap="round"/></svg></span>`;
}
function renderLayout(active = '') {
  const header = document.querySelector('[data-site-header]');
  const footer = document.querySelector('[data-site-footer]');
  if (header) header.innerHTML = `<header class="site-header"><nav class="navbar"><a class="brand" href="index.html">${logoSvg()}<span>Dag</span></a><button class="nav-toggle" aria-label="Toggle navigation">☰</button><div class="nav-links"><a class="${active==='home'?'active':''}" href="index.html">Home</a><a class="${active==='breeders'?'active':''}" href="breeders.html">Breeders</a><a class="${active==='how'?'active':''}" href="how-it-works.html">How It Works</a><a class="${active==='contact'?'active':''}" href="contact.html">Contact</a></div></nav></header>`;
  if (footer) footer.innerHTML = `<footer class="site-footer"><div class="footer-inner"><p>© 2026 Dag Dog Marketplace</p><div class="footer-links"><a href="breeders.html">Find a Dog</a><a href="contact.html">Support</a></div></div></footer>`;
}
