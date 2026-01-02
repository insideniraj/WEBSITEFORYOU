// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Admission Form Submission
const admissionForm = document.getElementById('admissionForm');
const successModal = document.getElementById('successModal');

admissionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const studentName = document.getElementById('studentName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const course = document.getElementById('course').value;
    
    // Basic validation
    if (!studentName || !phone || !course) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Phone validation
    const phoneRegex = /^(\+977)?[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/[-\s]/g, ''))) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Show success modal
    successModal.classList.add('active');
    admissionForm.reset();
});

// Close modal
function closeModal() {
    successModal.classList.remove('active');
}

successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Counter Animation for Hero Stats
const heroStats = document.querySelectorAll('.hero-stats .stat h4');
let heroAnimated = false;

function animateHeroCounters() {
    heroStats.forEach(stat => {
        const text = stat.textContent;
        const target = parseInt(text);
        const suffix = text.includes('+') ? '+' : (text.includes('%') ? '%' : '');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    });
}

// Trigger hero counter animation on page load
window.addEventListener('load', () => {
    if (!heroAnimated) {
        setTimeout(animateHeroCounters, 500);
        heroAnimated = true;
    }
});

// Counter Animation for Results Section
const resultStats = document.querySelectorAll('.result-stat .number');
let resultsAnimated = false;

function animateResultCounters() {
    resultStats.forEach(stat => {
        const text = stat.textContent;
        const target = parseInt(text);
        const suffix = text.includes('%') ? '%' : '';
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 40);
    });
}

// Trigger results counter animation when section is in view
const resultsSection = document.querySelector('.results');
const resultsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !resultsAnimated) {
            animateResultCounters();
            resultsAnimated = true;
        }
    });
}, { threshold: 0.5 });

resultsObserver.observe(resultsSection);

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
document.querySelectorAll('.feature-card, .course-card, .faculty-card, .testimonial-card, .result-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }
});
