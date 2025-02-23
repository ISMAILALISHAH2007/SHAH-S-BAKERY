// Loading Spinner
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth Scrolling (for index.html)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Newsletter Form Submission (for index.html)
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    alert(`Thank you for subscribing, ${email}!`);
    newsletterForm.reset();
  });
}

// Order System (for order.html)
let orderItems = [];
let totalCost = 0;

// Add items to the order
const addToOrderButtons = document.querySelectorAll('.add-to-order');
addToOrderButtons.forEach(button => {
  button.addEventListener('click', () => {
    const item = button.getAttribute('data-item');
    const price = parseFloat(button.getAttribute('data-price'));

    // Add item to the order
    orderItems.push({ item, price });
    totalCost += price;

    // Update order summary
    updateOrderSummary();
  });
});

// Update order summary
function updateOrderSummary() {
  const orderSummary = document.getElementById('order-summary');
  const totalInput = document.getElementById('total');

  if (orderItems.length === 0) {
    orderSummary.innerHTML = '<p>No items selected.</p>';
    totalInput.value = '$0';
  } else {
    let summaryHTML = '';
    orderItems.forEach((order, index) => {
      summaryHTML += `<p>${order.item} - $${order.price.toFixed(2)}</p>`;
    });
    orderSummary.innerHTML = summaryHTML;
    totalInput.value = `$${totalCost.toFixed(2)}`;
  }
}

// Handle form submission
const orderForm = document.getElementById('order-form');
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (orderItems.length === 0) {
      alert('Please select at least one item to place an order.');
      return;
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    // Redirect to confirmation page with order details
    const itemsQuery = encodeURIComponent(JSON.stringify(orderItems));
    window.location.href = `confirmation.html?name=${encodeURIComponent(name)}&total=${totalCost.toFixed(2)}&items=${itemsQuery}`;
  });
}