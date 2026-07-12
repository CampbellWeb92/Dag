const money = value => new Intl.NumberFormat('en-ZA', {
  style: 'currency', currency: 'ZAR', maximumFractionDigits: 0
}).format(value);

let selectedDog = null;

function soldDogs() {
  return JSON.parse(localStorage.getItem('dagSoldDogs') || '[]');
}

function saveSoldDog(id) {
  const sold = new Set(soldDogs());
  sold.add(id);
  localStorage.setItem('dagSoldDogs', JSON.stringify([...sold]));
}

function applySavedStatuses() {
  const sold = new Set(soldDogs());
  document.querySelectorAll('[data-dog-id]').forEach(card => {
    if (sold.has(card.dataset.dogId)) markCardSold(card);
  });
}

function markCardSold(card) {
  card.classList.add('sold');
  const badge = card.querySelector('.badge');
  if (badge) badge.textContent = 'Sold';
  card.querySelectorAll('button').forEach(button => {
    button.disabled = true;
    if (button.matches('[data-buy]')) button.textContent = 'Sold';
  });
}

function openModal(id) {
  document.getElementById(id)?.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeModals() {
  document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('open'));
  document.body.classList.remove('modal-open');
}

document.addEventListener('click', event => {
  if (event.target.matches('[data-close-modal]') || event.target.classList.contains('modal')) {
    closeModals();
  }

  const bidButton = event.target.closest('[data-bid]');
  if (bidButton) {
    selectedDog = {
      id: bidButton.dataset.bid,
      name: bidButton.dataset.name,
      price: Number(bidButton.dataset.price)
    };
    document.getElementById('bidDogId').value = selectedDog.id;
    document.getElementById('bidDog').value = selectedDog.name;
    document.getElementById('bidAmount').value = selectedDog.price;
    openModal('bidModal');
  }

  const buyButton = event.target.closest('[data-buy]');
  if (buyButton) {
    selectedDog = {
      id: buyButton.dataset.buy,
      name: buyButton.dataset.name,
      price: Number(buyButton.dataset.price)
    };
    setupPayment(selectedDog);
    openModal('paymentModal');
  }
});

document.getElementById('bidForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const bids = JSON.parse(localStorage.getItem('dagBids') || '[]');
  bids.push({
    dogId: form.bidDogId.value,
    dog: form.bidDog.value,
    name: form.bidName.value,
    email: form.bidEmail.value,
    amount: Number(form.bidAmount.value),
    message: form.bidMessage.value,
    submittedAt: new Date().toISOString()
  });
  localStorage.setItem('dagBids', JSON.stringify(bids));
  const message = document.getElementById('bidMessageBox');
  message.className = 'notice success';
  message.textContent = 'Your bid has been saved. The breeder can contact you using the details provided.';
  form.reset();
});

function setupPayment(dog) {
  const title = document.getElementById('paymentTitle');
  const message = document.getElementById('paymentMessage');
  const buttons = document.getElementById('paypalButtons');

  title.textContent = `Buy ${dog.name} — ${money(dog.price)}`;
  message.className = 'notice';
  message.textContent = 'Replace the PayPal.Me link below with the breeder’s real payment link before publishing.';

  buttons.innerHTML = `
    <a class="btn btn-paypal payment-link" href="https://paypal.me/REPLACE/${dog.price}" target="_blank" rel="noopener">Continue to PayPal</a>
    <button class="btn btn-green demo-payment" type="button">Demo: Confirm Successful Payment</button>
    <p class="payment-help">The green confirmation button demonstrates the Sold-status behaviour in this HTML/CSS/JavaScript version.</p>
  `;

  buttons.querySelector('.demo-payment').addEventListener('click', () => {
    saveSoldDog(dog.id);
    const card = document.querySelector(`[data-dog-id="${dog.id}"]`);
    if (card) markCardSold(card);
    message.className = 'notice success';
    message.textContent = 'Payment recorded. This dog is now marked as Sold on this browser.';
    buttons.querySelectorAll('a,button').forEach(control => control.disabled = true);
  });
}

applySavedStatuses();
