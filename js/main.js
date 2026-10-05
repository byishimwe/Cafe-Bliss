'use strict';

// One source for the featured selection and the complete menu. Prices are USD.
const photo = (id, alt) => ({ src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=720&q=80`, alt });
const MENU = [
  { id: 'espresso', category: 'coffee', name: 'Espresso', price: 3.5, description: 'A small cup with a big character. Rich, rounded, freshly pulled.', featured: true, image: { src: 'images/espresso.webp', alt: 'Fresh espresso in a white cup with coffee beans nearby' } },
  { id: 'cappuccino', category: 'coffee', name: 'Cappuccino', price: 4.5, description: 'Our house espresso, steamed milk, and a soft cap of foam.', featured: true, image: { src: 'images/Cappuccino.webp', alt: 'Foamy cappuccino dusted with cocoa beside biscuits' } },
  { id: 'flat-white', category: 'coffee', name: 'Flat white', price: 4.5, description: 'A double espresso under a thin layer of silky steamed milk.' },
  { id: 'filter', category: 'coffee', name: 'Slow filter', price: 4, description: 'A carefully brewed cup with a clean, unhurried finish.' },
  { id: 'iced-latte', category: 'coffee', name: 'Iced latte', price: 5, description: 'Espresso and cold milk, poured over plenty of ice.' },
  { id: 'chamomile', category: 'tea', name: 'Chamomile tea', price: 3, description: 'Delicate flowers, a gentle brew. A quiet moment in a cup.', featured: true, image: photo('photo-1558160074-4d7d8bdf4256', 'A glass cup of tea beside a clay teapot') },
  { id: 'earl-grey', category: 'tea', name: 'Earl Grey', price: 3.5, description: 'Fragrant black tea with the bright lift of bergamot.' },
  { id: 'mint', category: 'tea', name: 'Fresh mint', price: 3.5, description: 'Fresh mint leaves steeped simply, served piping hot.' },
  { id: 'chai', category: 'tea', name: 'Spiced chai', price: 4.5, description: 'Black tea, warming spices, and steamed milk.' },
  { id: 'avocado-toast', category: 'breakfast', name: 'Avocado toast', price: 8.5, description: 'Sourdough, smashed avocado, and a sunny-side-up egg.', featured: true, image: photo('photo-1525351484163-7529414344d8', 'Avocado toast topped with a sunny-side-up egg') },
  { id: 'eggs', category: 'breakfast', name: 'Soft eggs on toast', price: 8, description: 'Slowly scrambled eggs, buttered sourdough, and fresh chives.' },
  { id: 'granola', category: 'breakfast', name: 'House granola', price: 6.5, description: 'Toasted oats, thick yogurt, fruit, and a little honey.' },
  { id: 'breakfast-bun', category: 'breakfast', name: 'The breakfast bun', price: 9, description: 'A soft bun filled with egg, cheddar, and tomato relish.' },
  { id: 'tiramisu', category: 'dessert', name: 'Tiramisu', price: 6.5, description: 'Coffee-soaked layers, mascarpone cream, and a dusting of cocoa.', featured: true, image: photo('photo-1571877227200-a0d98ea607e9', 'A serving of tiramisu dusted with cocoa') },
  { id: 'chocolate-cake', category: 'dessert', name: 'Chocolate cake', price: 5.5, description: 'A generous slice of rich chocolate cake. Forks at the ready.', featured: true, image: photo('photo-1578985545062-69928b1d9587', 'Chocolate cake with chocolate frosting') },
  { id: 'croissant', category: 'dessert', name: 'Butter croissant', price: 3.5, description: 'Golden, flaky, and best enjoyed with your morning coffee.' },
  { id: 'banana-bread', category: 'dessert', name: 'Toasted banana bread', price: 4.5, description: 'A thick slice, gently toasted and served with butter.' },
  { id: 'berry-cake', category: 'dessert', name: 'Berry cream cake', price: 6.5, description: 'Soft sponge, whipped cream, and a bright handful of berries.' }
];
const CATEGORIES = { coffee: 'Coffee', tea: 'Tea', breakfast: 'Breakfast', dessert: 'Bakery & desserts' };
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const $ = (selector, root = document) => root.querySelector(selector);

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function initNavigation() {
  const header = $('.site-header');
  const toggle = $('.menu-toggle');
  const nav = $('#primary-nav');
  const smallScreen = matchMedia('(max-width: 767px)');
  const setMenu = (open, returnFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    if (returnFocus) toggle.focus();
  };
  document.body.classList.add('nav-enhanced');
  toggle.hidden = false;
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) setMenu(false);
  });
  nav.addEventListener('focusout', event => {
    if (smallScreen.matches && event.relatedTarget && !header.contains(event.relatedTarget)) setMenu(false);
  });
  nav.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    setMenu(false);
    if (smallScreen.matches) {
      // Focus the destination rather than leaving focus in the collapsed menu.
      const target = $(link.getAttribute('href'));
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
  smallScreen.addEventListener('change', () => setMenu(false));
  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  let ticking = false;
  function update() {
    const offset = header.offsetHeight + 90;
    let active = 'home';
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
    if (atBottom) {
      active = 'contact';
    } else {
      for (const section of sections) if (section.getBoundingClientRect().top <= offset) active = section.id;
    }
    header.classList.toggle('is-scrolled', window.scrollY > 12);
    for (const link of links) {
      if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
}

function initMenu() {
  const grid = $('#menu-items');
  for (const item of MENU.filter(item => item.featured)) {
    const card = element('article', 'menu-card');
    card.dataset.category = item.category;
    const imageWrap = element('div', 'menu-image');
    const image = element('img');
    Object.assign(image, { src: item.image.src, alt: item.image.alt, width: 720, height: 496, loading: 'lazy', decoding: 'async' });
    imageWrap.append(image);
    const heading = element('div', 'menu-item-heading');
    heading.append(element('h3', '', item.name), element('span', 'menu-price', currency.format(item.price)));
    card.append(imageWrap, heading, element('p', '', item.description));
    grid.append(card);
  }
  const filters = $('.menu-filters');
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-category]');
    if (!button) return;
    for (const control of filters.querySelectorAll('button')) control.setAttribute('aria-pressed', String(control === button));
    let count = 0;
    for (const card of grid.children) {
      card.hidden = button.dataset.category !== 'all' && card.dataset.category !== button.dataset.category;
      if (!card.hidden) count++;
    }
    $('#menu-status').textContent = `${count} featured ${count === 1 ? 'item' : 'items'} shown for ${button.textContent.toLowerCase()}.`;
  });
  const fullMenu = $('#full-menu-content');
  for (const [category, title] of Object.entries(CATEGORIES)) {
    const section = element('section', 'full-menu-category');
    const heading = element('h3', '');
    heading.id = `full-menu-${category}`;
    if (title.includes('&')) {
      heading.innerHTML = title.replace('&', '<span class="amp" aria-hidden="true">&amp;</span><span class="sr-only">and</span>');
    } else {
      heading.textContent = title;
    }
    section.setAttribute('aria-labelledby', heading.id);
    section.append(heading);
    for (const item of MENU.filter(item => item.category === category)) {
      const row = element('div', 'full-menu-row');
      const titleRow = element('div');
      titleRow.append(element('span', '', item.name), element('span', 'menu-price', currency.format(item.price)));
      row.append(titleRow, element('p', '', item.description));
      section.append(row);
    }
    fullMenu.append(section);
  }
  initDialog();
}

function initDialog() {
  const dialog = $('#full-menu-dialog');
  const opener = $('#full-menu-button');
  let previousFocus;
  opener.hidden = false;
  opener.addEventListener('click', () => {
    previousFocus = document.activeElement;
    dialog.showModal();
    const body = dialog.querySelector('.dialog-body');
    if (body) body.scrollTop = 0;
    dialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
  });
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      dialog.close();
    }
  });
  dialog.addEventListener('cancel', () => {
    document.body.classList.remove('dialog-open');
  });
  let startedOutside = false;
  const outside = event => {
    const box = dialog.getBoundingClientRect();
    return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  };
  dialog.addEventListener('pointerdown', event => { startedOutside = outside(event); });
  dialog.addEventListener('click', event => {
    if (event.target === dialog && startedOutside && outside(event)) dialog.close();
    startedOutside = false;
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  });
}

// Local calendar components avoid UTC conversion shifting the minimum date.
function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function availableTimes(value, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < localDate(now)) return [];
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime()) || localDate(date) !== value) return [];
  const weekend = [0, 6].includes(date.getDay());
  const times = [];
  for (let hour = weekend ? 8 : 7; hour <= (weekend ? 17 : 18); hour++) {
    const time = `${String(hour).padStart(2, '0')}:00`;
    if (new Date(`${value}T${time}`) > now) times.push(time);
  }
  return times;
}

function initReservationTimes() {
  const date = $('#date');
  const time = $('#time');
  function refresh() {
    date.min = localDate();
    const selection = time.value;
    const times = availableTimes(date.value);
    const prompt = !date.value ? 'Choose a date first' : times.length ? 'Choose a time' : 'No times — choose another date';
    time.replaceChildren(new Option(prompt, ''));
    for (const value of times) {
      const label = new Date(`2000-01-01T${value}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      time.add(new Option(label, value));
    }
    if (times.includes(selection)) time.value = selection;
  }
  date.addEventListener('change', refresh);
  date.addEventListener('focus', () => { date.min = localDate(); });
  time.addEventListener('focus', refresh);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  refresh();
  return refresh;
}

function validationMessage(field) {
  field.setCustomValidity('');
  if (field.required && !field.value.trim()) field.setCustomValidity('Please complete this field.');
  if (field.id === 'date') {
    field.min = localDate();
    if (field.value && field.value < field.min) field.setCustomValidity('Choose today or a future date.');
    else if (field.value && !availableTimes(field.value).length) field.setCustomValidity('No seating times remain on this date. Please choose another day.');
  }
  if (field.id === 'time' && field.value && !availableTimes($('#date').value).includes(field.value)) field.setCustomValidity('That seating time is no longer available. Please choose another time.');
  if (field.validity.typeMismatch) return 'Enter a valid email address, such as alex@example.com.';
  if (field.validity.badInput) return 'Please enter a complete, valid date.';
  return field.validationMessage;
}

function initForms(refreshTimes) {
  for (const form of [$('#reservation-form'), $('#contact-form'), $('#newsletter-form')]) {
    const fields = [...form.querySelectorAll('input, select, textarea')];
    const result = $('.form-result', form);
    const showError = field => {
      const message = validationMessage(field);
      field.setAttribute('aria-invalid', String(Boolean(message)));
      $(`#${field.id}-error`).textContent = message;
      return !message;
    };
    form.addEventListener('submit', event => {
      event.preventDefault();
      result.hidden = true;
      let firstInvalid;
      for (const field of fields) if (!showError(field) && !firstInvalid) firstInvalid = field;
      if (firstInvalid) { firstInvalid.focus(); return; }
      if (form.id === 'reservation-form') {
        const name = $('#name').value.trim();
        const guests = $('#guests').value;
        const date = new Date(`${$('#date').value}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        const time = $('#time').selectedOptions[0].textContent;
        result.textContent = `Thanks, ${name}. Your demo request for ${guests} ${guests === '1' ? 'guest' : 'guests'} on ${date} at ${time} has been captured for this page session. No table has been booked and no email has been sent.`;
      } else if (form.id === 'contact-form') {
        result.textContent = `Thanks, ${$('#contact-name').value.trim()} — your message has been captured in this demo. It has not been delivered or saved.`;
      } else {
        result.textContent = 'Thanks for stopping by! Your demo signup is complete. You have not been added to a mailing list, and your email has not been saved.';
      }
      form.reset();
      if (form.id === 'reservation-form') refreshTimes();
      for (const field of fields) { field.setCustomValidity(''); field.removeAttribute('aria-invalid'); $(`#${field.id}-error`).textContent = ''; }
      result.hidden = false;
      result.focus({ preventScroll: true });
    });
    for (const field of fields) {
      field.addEventListener('input', () => {
        field.setCustomValidity('');
        if (field.hasAttribute('aria-invalid')) showError(field);
      });
      field.addEventListener('change', () => {
        if (field.hasAttribute('aria-invalid')) showError(field);
      });
    }
    // Enable only after the handler exists. With no JS, forms stay inert.
    form.noValidate = true;
    $('fieldset', form).disabled = false;
  }
}

function initMotion() {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); }
    }
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(node => observer.observe(node));
}

initNavigation();
initMenu();
const refreshTimes = initReservationTimes();
initForms(refreshTimes);
initMotion();
$('#currentYear').textContent = new Date().getFullYear();
