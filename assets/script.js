/**
 * Dag website interactions
 * ------------------------
 * This file controls:
 *  - Saved Sold labels
 *  - Bid form modal
 *  - PayPal demonstration modal
 *
 * IMPORTANT: localStorage is only a browser demonstration. A real payment
 * must be verified by a secure server before a dog is marked as sold.
 */

const STORAGE_KEYS = {
  soldDogs: 'dagSoldDogs',
  bids: 'dagBids'
};

const PAYPAL_USERNAME = 'REPLACE';

let selectedDog = null;

function formatMoney(value) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0
  }).format(value);
}

// ---------- Sold status ----------

function getSoldDogIds() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.soldDogs) || '[]');
}

function saveSoldDogId(dogId) {
  const soldDogIds = new Set(getSoldDogIds());
  soldDogIds.add(dogId);

  localStorage.setItem(
    STORAGE_KEYS.soldDogs,
    JSON.stringify([...soldDogIds])
  );
}

function markDogCardAsSold(card) {
  card.classList.add('sold');

  const availabilityBadge = card.querySelector('.badge');
  if (availabilityBadge) availabilityBadge.textContent = 'Sold';

  card.querySelectorAll('button').forEach((button) => {
    button.disabled = true;

    if (button.matches('[data-buy]')) {
      button.textContent = 'Sold';
    }
  });
}

function applySavedSoldStatuses() {
  const soldDogIds = new Set(getSoldDogIds());

  document.querySelectorAll('[data-dog-id]').forEach((card) => {
    if (soldDogIds.has(card.dataset.dogId)) {
      markDogCardAsSold(card);
    }
  });
}

// ---------- Modal controls ----------

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach((modal) => {
    modal.classList.remove('open');
  });

  document.body.classList.remove('modal-open');
}

// ---------- Bid form ----------

function prepareBidForm(button) {
  selectedDog = {
    id: button.dataset.bid,
    name: button.dataset.name,
    price: Number(button.dataset.price)
  };

  document.getElementById('bidDogId').value = selectedDog.id;
  document.getElementById('bidDog').value = selectedDog.name;
  document.getElementById('bidAmount').value = selectedDog.price;

  openModal('bidModal');
}

function saveBid(form) {
  const savedBids = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.bids) || '[]'
  );

  savedBids.push({
    dogId: form.bidDogId.value,
    dog: form.bidDog.value,
    name: form.bidName.value,
    email: form.bidEmail.value,
    amount: Number(form.bidAmount.value),
    message: form.bidMessage.value,
    submittedAt: new Date().toISOString()
  });

  localStorage.setItem(STORAGE_KEYS.bids, JSON.stringify(savedBids));
}

// ---------- Payment demonstration ----------

function preparePayment(button) {
  selectedDog = {
    id: button.dataset.buy,
    name: button.dataset.name,
    price: Number(button.dataset.price)
  };

  buildPaymentOptions(selectedDog);
  openModal('paymentModal');
}

function buildPaymentOptions(dog) {
  const paymentTitle = document.getElementById('paymentTitle');
  const paymentMessage = document.getElementById('paymentMessage');
  const paypalButtons = document.getElementById('paypalButtons');

  paymentTitle.textContent = `Buy ${dog.name} — ${formatMoney(dog.price)}`;
  paymentMessage.className = 'notice';
  paymentMessage.textContent =
    'Replace the PayPal username in script.js before publishing.';

  paypalButtons.innerHTML = `
    <a
      class="btn btn-paypal payment-link"
      href="https://paypal.me/${PAYPAL_USERNAME}/${dog.price}"
      target="_blank"
      rel="noopener"
    >
      Continue to PayPal
    </a>

    <button class="btn btn-green demo-payment" type="button">
      Demo: Confirm Successful Payment
    </button>

    <p class="payment-help">
      This green button demonstrates how the Sold status works in this
      HTML, CSS and JavaScript version.
    </p>
  `;

  const confirmationButton = paypalButtons.querySelector('.demo-payment');

  confirmationButton.addEventListener('click', () => {
    confirmDemonstrationPayment(dog, paymentMessage, paypalButtons);
  });
}

function confirmDemonstrationPayment(dog, messageBox, controlsContainer) {
  saveSoldDogId(dog.id);

  const dogCard = document.querySelector(`[data-dog-id="${dog.id}"]`);
  if (dogCard) markDogCardAsSold(dogCard);

  messageBox.className = 'notice success';
  messageBox.textContent =
    'Payment recorded. This dog is now marked as Sold on this browser.';

  controlsContainer.querySelectorAll('a, button').forEach((control) => {
    control.disabled = true;
  });
}

// ---------- Event listeners ----------

function handlePageClick(event) {
  const clickedModalBackground = event.target.classList.contains('modal');
  const clickedCloseButton = event.target.matches('[data-close-modal]');

  if (clickedModalBackground || clickedCloseButton) {
    closeAllModals();
    return;
  }

  const bidButton = event.target.closest('[data-bid]');
  if (bidButton) {
    prepareBidForm(bidButton);
    return;
  }

  const buyButton = event.target.closest('[data-buy]');
  if (buyButton) {
    preparePayment(buyButton);
  }
}

document.addEventListener('click', handlePageClick);

const bidForm = document.getElementById('bidForm');

if (bidForm) {
  bidForm.addEventListener('submit', (event) => {
    event.preventDefault();

    saveBid(event.currentTarget);

    const messageBox = document.getElementById('bidMessageBox');
    messageBox.className = 'notice success';
    messageBox.textContent =
      'Your bid has been saved. The breeder can contact you using the details provided.';

    event.currentTarget.reset();
  });
}

applySavedSoldStatuses();
