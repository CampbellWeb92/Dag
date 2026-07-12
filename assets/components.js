/**
 * Shared header and footer
 * ------------------------
 * Every HTML page contains an empty element with either:
 *   data-site-header
 *   data-site-footer
 *
 * This file fills those elements so the navigation only needs to be
 * edited in one place.
 */

function renderLayout(activePage = '') {
  const headerContainer = document.querySelector('[data-site-header]');
  const footerContainer = document.querySelector('[data-site-footer]');

  const navigationLinks = [
    { page: 'home', href: 'index.html', label: 'Home' },
    { page: 'breeders', href: 'breeders.html', label: 'Breeders' },
    { page: 'how', href: 'how-it-works.html', label: 'How It Works' },
    { page: 'contact', href: 'contact.html', label: 'Contact' }
  ];

  const createNavigationLink = ({ page, href, label }) => {
    const activeClass = activePage === page ? 'active' : '';
    const currentPage = activePage === page ? 'aria-current="page"' : '';

    return `<a class="${activeClass}" href="${href}" ${currentPage}>${label}</a>`;
  };

  if (headerContainer) {
    headerContainer.innerHTML = `
      <header class="site-header">
        <div class="container nav">
          <a class="brand" href="index.html" aria-label="Dag homepage">
            <img src="assets/logo.png" alt="Dag happy white dog logo">
            <span>Dag</span>
          </a>

          <button
            class="menu-toggle"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded="false"
          >
            ☰
          </button>

          <nav class="nav-links" aria-label="Main navigation">
            ${navigationLinks.map(createNavigationLink).join('')}
          </nav>
        </div>
      </header>
    `;
  }

  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-inner">
          <strong>
            © ${new Date().getFullYear()} Dag. Loving homes for happy dogs.
          </strong>

          <div class="footer-links">
            <a href="breeders.html">Breeders</a>
            <a href="how-it-works.html">Safety</a>
            <a href="contact.html">Contact</a>
          </div>
        </div>
      </footer>
    `;
  }

  setUpMobileMenu();
}

function setUpMobileMenu() {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.nav-links');

  if (!menuButton || !navigation) return;

  menuButton.addEventListener('click', () => {
    const menuIsOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(menuIsOpen));
  });
}
