// Optimized Script for All Zone Corporate Website
// CPU-friendly version with popup functionality

// ===== POPUP FUNCTIONALITY =====
let popupElement = null;
let popupTimer = null;
let popupInterval = null;

function initPopup() {
    popupElement = document.getElementById('contactPopup');
    if (!popupElement) return;

    // Close button
    const closeBtn = popupElement.querySelector('.close-popup');
    if (closeBtn) {
        closeBtn.onclick = hidePopup;
    }

    // Click outside to close
    popupElement.onclick = function(e) {
        if (e.target === popupElement) hidePopup();
    };

    // Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupElement.classList.contains('show')) {
            hidePopup();
        }
    });

    // Start popup timers
    startPopupTimers();
}

function startPopupTimers() {
    // First popup after 10 seconds
    popupTimer = setTimeout(() => {
        showPopup();
        
        // Then every 40 seconds
        popupInterval = setInterval(() => {
            showPopup();
        }, 40000);
    }, 10000);
}

function showPopup() {
    if (!popupElement || popupElement.classList.contains('show')) return;
    
    popupElement.classList.add('show');
    
    // Auto-hide after 15 seconds
    setTimeout(() => {
        if (popupElement && popupElement.classList.contains('show')) {
            hidePopup();
        }
    }, 15000);
}

function hidePopup() {
    if (popupElement) {
        popupElement.classList.remove('show');
    }
}

// Test function
function testPopup() {
    showPopup();
}
window.testPopup = testPopup;

// ===== MOBILE NAVIGATION =====
function initMobileNav() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('main-nav');
    
    if (mobileMenu && navMenu) {
        mobileMenu.onclick = function() {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        };
    }
}

// ===== DROPDOWN MENUS =====
function initDropdowns() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.onclick = function(e) {
            e.preventDefault();
            this.parentElement.classList.toggle('active');
        };
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.onclick = function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        };
    });
}

// ===== SLIDER FUNCTIONALITY =====
function slideAgencies(direction) {
    const slider = document.getElementById('agenciesSlider');
    if (!slider) return;

    const containerWidth = slider.parentElement.clientWidth;
    const itemWidth = 180 + 32; // item width + gap
    const itemsToShow = Math.floor(containerWidth / itemWidth);
    const scrollAmount = itemWidth * Math.max(itemsToShow - 1, 1);

    if (direction === 'left') {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (slider.scrollLeft >= maxScroll) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
}

// ===== FORM HANDLING =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.onsubmit = async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                this.reset();
                showNotification('Message sent successfully!', 'success');
            } else {
                showNotification('Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            showNotification('Network error. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    };
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    notification.querySelector('.notification-close').onclick = function() {
        notification.remove();
    };
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initPopup();
    initMobileNav();
    initDropdowns();
    initSmoothScroll();
    initContactForm();
});