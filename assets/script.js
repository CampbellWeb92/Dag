const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));
}

document.querySelectorAll('.bid-button').forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector('#bidModal');
    if (!modal) return;
    document.querySelector('#bidDog').value = button.dataset.dog || '';
    document.querySelector('#bidBreeder').value = button.dataset.breeder || '';
    document.querySelector('#bidAmount').min = button.dataset.price || '0';
    modal.classList.add('open');
  });
});

document.querySelectorAll('[data-close-modal]').forEach(button => {
  button.addEventListener('click', () => button.closest('.modal').classList.remove('open'));
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', event => {
    if (event.target === modal) modal.classList.remove('open');
  });
});

const bidForm = document.querySelector('#bidForm');
if (bidForm) {
  bidForm.addEventListener('submit', event => {
    event.preventDefault();
    alert('Your bid has been recorded for this demo. Connect this form to your email service or database before publishing.');
    bidForm.reset();
    document.querySelector('#bidModal')?.classList.remove('open');
  });
}

document.querySelectorAll('.paypal-button').forEach(button => {
  button.addEventListener('click', event => {
    const link = button.dataset.paypalLink;
    if (!link || link.includes('REPLACE')) {
      event.preventDefault();
      alert('Add this breeder’s PayPal.Me or PayPal checkout link in the HTML before publishing.');
    }
  });
});
