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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hero Stats Counter Animation
const heroStats = document.querySelectorAll('.hero-stats .stat h3');
let heroStatsAnimated = false;

function animateHeroCounters() {
    heroStats.forEach(stat => {
        const text = stat.textContent;
        const target = parseInt(text);
        const suffix = text.includes('+') ? '+' : '';
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

// Trigger counter animation when hero is visible
setTimeout(() => {
    if (!heroStatsAnimated) {
        animateHeroCounters();
        heroStatsAnimated = true;
    }
}, 500);

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');
const successModal = document.getElementById('successModal');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const trek = document.getElementById('trek').value;
    const date = document.getElementById('date').value;
    
    // Basic validation
    if (!name || !email || !trek || !date) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show success modal
    successModal.classList.add('active');
    bookingForm.reset();
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
document.querySelectorAll('.trek-card, .feature-card, .testimonial-card, .gallery-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Set minimum date for booking
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const minDate = new Date(today.setDate(today.getDate() + 7)); // Minimum 7 days from now
    dateInput.setAttribute('min', minDate.toISOString().split('T')[0]);
}

// Gallery lightbox (simple implementation)
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <img src="${img.src}" alt="${img.alt}">
            <span class="lightbox-close">&times;</span>
        `;
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
        `;
        lightbox.querySelector('img').style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        `;
        lightbox.querySelector('.lightbox-close').style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 3rem;
            color: white;
            cursor: pointer;
        `;
        
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', () => {
            lightbox.remove();
        });
    });
});

// Video poster fallback
const heroVideo = document.querySelector('.hero-video video');
if (heroVideo) {
    heroVideo.addEventListener('error', () => {
        heroVideo.style.display = 'none';
        const poster = document.createElement('img');
        poster.src = heroVideo.getAttribute('poster');
        poster.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
        heroVideo.parentNode.appendChild(poster);
    });
}
