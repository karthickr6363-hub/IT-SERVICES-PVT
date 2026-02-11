// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link (but not dropdown toggle)
    const navLinks = document.querySelectorAll('.nav-menu a:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', () => {
    // Handle smooth scrolling for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Check if it's an internal anchor link
            if (href.startsWith('#') && href !== '#') {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Smooth scroll to the target element
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // Handle smooth scrolling for links with hashes in the URL
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
});

// Dropdown Menu Toggle for Mobile
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownLinks = dropdown.querySelectorAll('.dropdown-menu a');
        
        if (dropdownToggle) {
            // Handle click on mobile devices
            dropdownToggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }

        // Close mobile menu when clicking dropdown links on mobile
        if (dropdownLinks.length > 0) {
            dropdownLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        if (navMenu) navMenu.classList.remove('active');
                        if (hamburger) hamburger.classList.remove('active');
                        dropdown.classList.remove('active');
                    }
                });
            });
        }
    });
    
    // Close dropdowns when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });

    // Handle window resize to reset dropdowns
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }, 250);
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const formData = new FormData(contactForm);
        
        // Get form values
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            formMessage.textContent = 'Please fill in all required fields.';
            formMessage.className = 'form-message error';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.className = 'form-message error';
            return;
        }
        
        // Simulate form submission (in a real application, you would send this to a server)
        formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        formMessage.className = 'form-message success';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    });
}

// Smooth Scrolling for Anchor Links with luxury easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Luxury Scroll Animation for Elements
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for grid items
            setTimeout(() => {
                entry.target.classList.add('animate-in');
            }, index * 100); // Stagger animation by 100ms per item
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation with staggered effect
document.addEventListener('DOMContentLoaded', () => {
    // Feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((el, index) => {
        animationObserver.observe(el);
    });

    // Service cards
    const serviceCards = document.querySelectorAll('.service-card, .service-overview-card');
    serviceCards.forEach((el, index) => {
        animationObserver.observe(el);
    });

    // Course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((el, index) => {
        animationObserver.observe(el);
    });

    // Value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((el, index) => {
        animationObserver.observe(el);
    });

    // Team cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((el, index) => {
        animationObserver.observe(el);
    });

    // Testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((el, index) => {
        animationObserver.observe(el);
    });

    // Partner cards
    const partnerCards = document.querySelectorAll('.partner-card');
    partnerCards.forEach((el, index) => {
        animationObserver.observe(el);
    });

    // Stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((el, index) => {
        animationObserver.observe(el);
    });

    // Contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((el, index) => {
        animationObserver.observe(el);
    });
});

// Navbar Scroll Effect with smooth transitions
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(255, 215, 0, 0.2)';
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(255, 215, 0, 0.1)';
        navbar.style.backgroundColor = 'var(--primary-black)';
    }
    
    lastScroll = currentScroll;
}, { passive: true });

// Add active class to current page navigation
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);
    
    // Update toggle icon based on current theme
    if (currentTheme === 'light') {
        html.setAttribute('data-theme', 'light');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add smooth transition
            html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        });
    }
});


