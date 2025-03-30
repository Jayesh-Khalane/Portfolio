// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && !e.target.closest('.nav-content')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Typewriter effect
const typewriterText = document.getElementById('typewriter-text');
if (typewriterText) {
    const phrases = [
        'Academic Researcher',
        'Trust me, I am an Engineer : )',
        'Technology Enthusiast',
        'Innovation Driven'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (!isDeleting && !isWaiting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex);
            charIndex++;
            
            if (charIndex > currentPhrase.length) {
                isWaiting = true;
                await sleep(2000);
                isWaiting = false;
                isDeleting = true;
            }
        } else if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                await sleep(500);
            }
        }
        
        const nextDelay = isDeleting ? 50 : isWaiting ? 2000 : 100;
        setTimeout(typeWriter, nextDelay);
    }

    // Start typewriter effect when the page is fully loaded
    window.onload = function() {
        typewriterText.textContent = '';
        typeWriter();
    };
}

// Navbar scroll behavior
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('scroll-down');
        navbar.classList.remove('scroll-up');
    } else {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Load certificates dynamically
const certGrid = document.querySelector('.cert-grid');
const certificatesPath = '../assets/certificate/';

// Function to load certificates
async function loadCertificates() {
    try {
        // This is a placeholder - you'll need to implement the actual loading of certificates
        const certificates = [
            { title: 'Certificate 1', image: 'cert1.jpg' },
            { title: 'Certificate 2', image: 'cert2.jpg' },
            // Add more certificates as needed
        ];

        certificates.forEach(cert => {
            const certCard = document.createElement('div');
            certCard.className = 'cert-card';
            certCard.innerHTML = `
                <img src="${certificatesPath}${cert.image}" alt="${cert.title}">
                <h3>${cert.title}</h3>
            `;
            certGrid.appendChild(certCard);
        });
    } catch (error) {
        console.error('Error loading certificates:', error);
    }
}

// Handle contact form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send this data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(10px)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateX(0)';
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCertificates();
});
