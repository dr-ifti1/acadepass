// main.js - Main JavaScript for Acadepass Website

// ===== DOM Elements =====
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const modal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close-modal');
const courseCards = document.querySelectorAll('.course-card');
const socialIcons = document.querySelectorAll('.social-icon');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check if we're on a course page
    if (document.body.classList.contains('course-page')) {
        initCoursePage();
    }
    
    // Setup payment page if needed
    if (document.getElementById('paymentForm')) {
        setupPaymentPage();
    }
    
    // Check for special offers
    checkForOffers();
});

// ===== Core Functions =====
function setupEventListeners() {
    // Modal functionality
    if (loginBtn) {
        loginBtn.addEventListener('click', () => showModal('login'));
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', () => window.location.href = 'signup.html');
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', () => modal.style.display = 'none');
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Course card interactions
    courseCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn')) return;
            const courseName = this.querySelector('h3').textContent;
            redirectToCourse(courseName);
        });
    });
    
    // Social media links
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const platform = this.querySelector('i').className.split('-')[1];
            trackSocialClick(platform);
        });
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
        window.addEventListener('scroll', toggleBackToTopButton);
    }
}

function showModal(type) {
    if (type === 'login') {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function redirectToCourse(courseName) {
    // Check if user is logged in and has subscription
    const user = JSON.parse(localStorage.getItem('acadepassCurrentUser'));
    
    if (!user) {
        showModal('login');
        return;
    }
    
    if (user.subscription === 'free') {
        alert('You need a premium subscription to access this course');
        window.location.href = 'subscription.html';
        return;
    }
    
    // Redirect to appropriate course page
    switch(courseName) {
        case 'NLE PASS Program':
            window.location.href = 'nle-pass.html';
            break;
        case 'HSK PASS Program':
            window.location.href = 'hsk-pass.html';
            break;
        case 'English PASS Program':
            window.location.href = 'english-pass.html';
            break;
        default:
            alert('Course page coming soon!');
    }
}

// ===== Animation Functions =====
function initAnimations() {
    // Animate on scroll initialization
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Background animation
    document.body.style.animation = 'gradientBG 15s ease infinite';
}

// ===== Course Page Functions =====
function initCoursePage() {
    // Initialize course player
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const mediaType = this.dataset.type;
            const mediaId = this.dataset.id;
            playMedia(mediaType, mediaId);
        });
    });
    
    // Initialize accordions
    const accordions = document.querySelectorAll('.accordion-title');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
// In main.js
import { hasPremiumAccess } from './auth.js';

// Example usage for content protection
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('nle-pass') && !hasPremiumAccess()) {
        document.querySelector('.premium-content').style.display = 'none';
        document.getElementById('upgradePrompt').style.display = 'block';
    }
});    
    // Initialize download buttons
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const resourceId = this.dataset.resource;
            downloadResource(resourceId);
        });
    });
}

function playMedia(type, id) {
    console.log(`Playing ${type} with ID: ${id}`);
    // In a real implementation, this would load the media player
    const player = document.getElementById('mediaPlayer');
    const playerContainer = document.getElementById('playerContainer');
    
    playerContainer.style.display = 'block';
    
    if (type === 'video') {
        player.innerHTML = `
            <video controls autoplay style="width:100%;">
                <source src="assets/video/${id}.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    } else if (type === 'audio') {
        player.innerHTML = `
            <audio controls autoplay style="width:100%;">
                <source src="assets/audio/${id}.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
    }
}

function downloadResource(resourceId) {
    console.log(`Downloading resource: ${resourceId}`);
    // In a real implementation, this would initiate a file download
    alert(`Downloading resource: ${resourceId}.mp4`);
}

// ===== Payment Functions =====
function setupPaymentPage() {
    const paymentForm = document.getElementById('paymentForm');
    const paymentMethod = document.getElementById('paymentMethod');
    const cardDetails = document.getElementById('cardDetails');
    const mobileWalletDetails = document.getElementById('mobileWalletDetails');
    
    // Show/hide payment method details
    paymentMethod.addEventListener('change', function() {
        cardDetails.style.display = this.value === 'card' ? 'block' : 'none';
        mobileWalletDetails.style.display = this.value === 'mobile' ? 'block' : 'none';
    });
    
    // Form submission
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processPayment();
    });
    
    // Initialize payment method display
    paymentMethod.dispatchEvent(new Event('change'));
}

function processPayment() {
    const paymentType = document.getElementById('paymentMethod').value;
    const amount = document.querySelector('.price').textContent;
    
    console.log(`Processing ${paymentType} payment for ${amount}`);
    
    // Show loading state
    const submitBtn = document.querySelector('#paymentForm button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Simulate payment processing
    setTimeout(() => {
        // Update user subscription
        const user = JSON.parse(localStorage.getItem('acadepassCurrentUser'));
        if (user) {
            user.subscription = 'premium';
            user.subscriptionExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); // 1 year
            localStorage.setItem('acadepassCurrentUser', JSON.stringify(user));
        }
        
        // Show success message
        alert('Payment successful! Your subscription is now active.');
        window.location.href = 'dashboard.html';
    }, 2000);
}

// ===== UI Helper Functions =====
function toggleMobileMenu() {
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    mobileMenuBtn.innerHTML = mobileMenu.style.display === 'block' ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
}

// ===== Analytics Functions =====
function trackSocialClick(platform) {
    console.log(`Social media click: ${platform}`);
    // In a real implementation, this would send data to analytics
}

function checkForOffers() {
    // Check if user has seen the offer before
    if (!localStorage.getItem('seenOffer')) {
        // Show special offer after 5 seconds
        setTimeout(() => {
            const offerModal = document.getElementById('offerModal');
            if (offerModal) {
                offerModal.style.display = 'block';
            }
        }, 5000);
    }
}

// Close offer modal
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('offer-close') || 
        e.target.classList.contains('offer-modal')) {
        document.getElementById('offerModal').style.display = 'none';
        localStorage.setItem('seenOffer', 'true');
    }
});

// ===== Utility Functions =====
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR'
    }).format(amount);
}

// Initialize any third-party libraries
if (typeof Stripe !== 'undefined') {
    // Initialize Stripe.js for card payments
    const stripe = Stripe('pk_test_your_stripe_public_key');
    const elements = stripe.elements();
    
    // Create card element if exists
    const cardElement = document.getElementById('card-element');
    if (cardElement) {
        const card = elements.create('card');
        card.mount('#card-element');
    }
}