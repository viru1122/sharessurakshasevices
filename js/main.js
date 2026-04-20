// Google Sheets Web App URL - REPLACE WITH YOUR URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwkWgxWibHRL6tC-iIApGPNJiKOWyBynoCogMLpSV6Wq0_ChylfOhYcb4S_oGX03YnZfg/exec';

// Your WhatsApp Number (Updated)
const WHATSAPP_NUMBER = '917466992443';

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Setup FAQ accordion
    setupFAQ();

    // Setup exit popup with 10-second timer
    setupExitPopup();

    // Smooth scrolling
    setupSmoothScrolling();
});

// Setup FAQ accordion
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });
}

// Exit Intent Popup Logic - Shows in 10 seconds
function setupExitPopup() {
    const popup = document.getElementById('exitPopup');
    if (!popup) return;

    let popupShown = false;

    // Show after 10 seconds
    setTimeout(function() {
        if (!popupShown) {
            popup.style.display = 'flex';
            popupShown = true;
        }
    }, 10000);

    // Show on exit intent
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !popupShown) {
            popup.style.display = 'flex';
            popupShown = true;
        }
    });

    // Show after scrolling 50%
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 50 && !popupShown) {
            popup.style.display = 'flex';
            popupShown = true;
        }
    });

    // Close popup when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
}

// Close popup function
function closePopup() {
    const popup = document.getElementById('exitPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Handle popup form submission
async function submitPopupForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    const formData = {
        name: form.querySelector('input[type="text"]').value.trim(),
        phone: form.querySelector('input[type="tel"]').value.trim(),
        email: form.querySelector('input[type="email"]').value.trim() || 'Not provided',
        queryType: form.querySelector('select').value || 'Not specified',
        message: form.querySelector('textarea').value.trim() || 'No message',
        source: 'Exit Popup',
        timestamp: new Date().toISOString()
    };

    if (!formData.name || !formData.phone) {
        alert('Please fill in your name and phone number');
        return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        alert('Thank you! We will contact you within 24 hours.');
        closePopup();
        form.reset();
        
    } catch (error) {
        alert('Thank you! We received your request.');
        closePopup();
        form.reset();
        
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

// Handle main lead form submission
async function submitLeadForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    const formData = {
        name: form.querySelector('input[type="text"]').value.trim(),
        phone: form.querySelector('input[type="tel"]').value.trim(),
        email: form.querySelector('input[type="email"]').value.trim() || 'Not provided',
        queryType: form.querySelector('select').value || 'Not specified',
        message: form.querySelector('textarea').value.trim() || 'No message',
        source: 'Contact Form',
        timestamp: new Date().toISOString()
    };

    if (!formData.name || !formData.phone) {
        alert('Please fill in your name and phone number');
        return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        alert('Thank you! We will contact you within 24 hours.');
        form.reset();
        
    } catch (error) {
        alert('Thank you! We received your request.');
        form.reset();
        
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

// Smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Handle newsletter form submission
async function submitNewsletter(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    const messageEl = document.getElementById('newsletterMessage');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Prepare data for Google Sheets
    const formData = {
        name: 'Newsletter Subscriber',
        phone: 'Not provided',
        email: email,
        queryType: 'Newsletter',
        message: 'Newsletter subscription',
        source: 'Newsletter',
        timestamp: new Date().toISOString()
    };

    submitButton.disabled = true;
    submitButton.textContent = 'Subscribing...';

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        messageEl.textContent = 'Thank you for subscribing! You will receive updates in your inbox.';
        messageEl.style.color = 'green';
        messageEl.style.display = 'block';
        emailInput.value = '';
        
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        messageEl.textContent = 'Thank you for subscribing!';
        messageEl.style.color = 'green';
        messageEl.style.display = 'block';
        emailInput.value = '';
        
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
        
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

// Make functions global
window.closePopup = closePopup;
window.submitPopupForm = submitPopupForm;
window.submitLeadForm = submitLeadForm;
window.submitNewsletter = submitNewsletter;