function renderLayout(active=''){
  const header=document.querySelector('[data-site-header]');
  const footer=document.querySelector('[data-site-footer]');
  if(header) header.innerHTML=`<header class="site-header"><div class="container nav"><a class="brand" href="index.html"><img src="assets/logo.png" alt="Dag happy white dog logo"><span>Dag</span></a><button class="menu-toggle" aria-label="Open menu">☰</button><nav class="nav-links"><a class="${active==='home'?'active':''}" href="index.html">Home</a><a class="${active==='breeders'?'active':''}" href="breeders.html">Breeders</a><a class="${active==='how'?'active':''}" href="how-it-works.html">How It Works</a><a class="${active==='contact'?'active':''}" href="contact.html">Contact</a></nav></div></header>`;
  if(footer) footer.innerHTML=`<footer class="site-footer"><div class="container footer-inner"><strong>© ${new Date().getFullYear()} Dag. Loving homes for happy dogs.</strong><div class="footer-links"><a href="breeders.html">Breeders</a><a href="how-it-works.html">Safety</a><a href="contact.html">Contact</a></div></div></footer>`;
  document.querySelector('.menu-toggle')?.addEventListener('click',()=>document.querySelector('.nav-links')?.classList.toggle('open'));
}
