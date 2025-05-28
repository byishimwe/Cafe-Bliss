// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        document.getElementById('mobile-menu').classList.add('hidden');
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-nav');
        }
    });
});

// Menu Filtering
function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    const tabs = document.querySelectorAll('.menu-tab');
    
    // Update active tab
    tabs.forEach(tab => {
        tab.classList.remove('active', 'bg-amber-500', 'text-white');
        tab.classList.add('text-amber-600', 'hover:bg-amber-50');
    });
    
    const activeTab = document.querySelector(`.menu-tab[onclick="filterMenu('${category}')"]`);
    activeTab.classList.add('active', 'bg-amber-500', 'text-white');
    activeTab.classList.remove('text-amber-600', 'hover:bg-amber-50');
    
    // Filter items
    menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Modal Functions
function openModal(name, desc, price, image) {
    document.getElementById('modal-item-name').textContent = name;
    document.getElementById('modal-item-desc').textContent = desc;
    document.getElementById('modal-item-price').textContent = price;
    document.getElementById('modal-item-image').src = image;
    document.getElementById('modal-item-image').alt = name;
    document.getElementById('menu-modal').classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Form Validation and Submission
document.getElementById('reservation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple validation
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    const guests = document.getElementById('guests');
    
    // Reset errors
    document.querySelectorAll('[id$="-error"]').forEach(el => {
        el.classList.add('hidden');
    });
    
    if (!name.value.trim()) {
        document.getElementById('name-error').classList.remove('hidden');
        isValid = false;
    }
    
    if (!email.value.trim() || !email.value.includes('@')) {
        document.getElementById('email-error').classList.remove('hidden');
        isValid = false;
    }
    
    if (!date.value) {
        document.getElementById('date-error').classList.remove('hidden');
        isValid = false;
    }
    
    if (!time.value) {
        document.getElementById('time-error').classList.remove('hidden');
        isValid = false;
    }
    
    if (!guests.value) {
        document.getElementById('guests-error').classList.remove('hidden');
        isValid = false;
    }
    
    if (isValid) {
        // In a real app, you would send this data to a server
        const reservationDetails = `
            <strong>${name.value}</strong>, your table for <strong>${guests.value}</strong> 
            on <strong>${date.value}</strong> at <strong>${time.value}</strong> has been reserved. 
            We've sent confirmation to <strong>${email.value}</strong>.
        `;
        
        document.getElementById('reservation-details').innerHTML = reservationDetails;
        document.getElementById('reservation-modal').classList.remove('hidden');
        
        // Save to localStorage
        const reservation = {
            name: name.value,
            email: email.value,
            date: date.value,
            time: time.value,
            guests: guests.value,
            phone: document.getElementById('phone').value,
            requests: document.getElementById('special-requests').value
        };
        
        localStorage.setItem('cafeBlissReservation', JSON.stringify(reservation));
        
        // Reset form
        this.reset();
    }
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple validation
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');
    
    if (name.value.trim() && email.value.trim() && message.value.trim()) {
        // In a real app, you would send this data to a server
        document.getElementById('contact-modal').classList.remove('hidden');
        this.reset();
    }
});

// Highlight today's hours
function updateHours() {
    const today = new Date().getDay();
    const hoursElement = document.getElementById('today-hours');
    
    // 0 is Sunday, 1 is Monday, etc.
    if (today === 0 || today === 6) {
        hoursElement.textContent = 'Weekend Hours:';
    } else {
        hoursElement.textContent = 'Weekday Hours:';
    }
}

// Check for previous reservation
function checkPreviousReservation() {
    const savedReservation = localStorage.getItem('cafeBlissReservation');
    if (savedReservation) {
        const reservation = JSON.parse(savedReservation);
        document.getElementById('name').value = reservation.name;
        document.getElementById('email').value = reservation.email;
        document.getElementById('date').value = reservation.date;
        document.getElementById('time').value = reservation.time;
        document.getElementById('guests').value = reservation.guests;
        document.getElementById('phone').value = reservation.phone;
        document.getElementById('special-requests').value = reservation.requests;
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', function() {
    updateHours();
    checkPreviousReservation();
});

//footer date
document.getElementById('currentYear').textContent = new Date().getFullYear();