// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile navigation toggle button
    function createMobileNav() {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navContainer && navMenu) {
            // Create toggle button
            const toggleButton = document.createElement('button');
            toggleButton.className = 'nav-toggle';
            toggleButton.innerHTML = '☰';
            toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
            
            // Insert toggle button
            navContainer.appendChild(toggleButton);
            
            // Toggle functionality
            toggleButton.addEventListener('click', function() {
                navMenu.classList.toggle('nav-menu-active');
                
                // Update toggle button icon
                if (navMenu.classList.contains('nav-menu-active')) {
                    toggleButton.innerHTML = '✕';
                    toggleButton.setAttribute('aria-expanded', 'true');
                } else {
                    toggleButton.innerHTML = '☰';
                    toggleButton.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navContainer.contains(event.target)) {
                    navMenu.classList.remove('nav-menu-active');
                    toggleButton.innerHTML = '☰';
                    toggleButton.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Close menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('nav-menu-active');
                    toggleButton.innerHTML = '☰';
                    toggleButton.setAttribute('aria-expanded', 'false');
                });
            });
            
            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    navMenu.classList.remove('nav-menu-active');
                    toggleButton.innerHTML = '☰';
                    toggleButton.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
    
    // Initialize mobile navigation
    createMobileNav();
    
    // Add touch gestures for mobile
    if ('ontouchstart' in window) {
        // Add swipe to close menu
        let startX, startY;
        
        document.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', function(e) {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Swipe up to close menu
            if (Math.abs(diffY) > Math.abs(diffX) && diffY > 50) {
                const navMenu = document.querySelector('.nav-menu');
                const toggleButton = document.querySelector('.nav-toggle');
                if (navMenu && navMenu.classList.contains('nav-menu-active')) {
                    navMenu.classList.remove('nav-menu-active');
                    if (toggleButton) {
                        toggleButton.innerHTML = '☰';
                        toggleButton.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    }
});

// Smooth scrolling for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    // Enhance smooth scrolling for mobile
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Optimize animations for mobile performance
document.addEventListener('DOMContentLoaded', function() {
    // Reduce motion for mobile devices with limited power
    function optimizeForMobile() {
        const isMobile = window.innerWidth <= 768;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (isMobile || prefersReducedMotion) {
            // Add class to reduce heavy animations
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    }
    
    // Initial check
    optimizeForMobile();
    
    // Check on resize
    window.addEventListener('resize', optimizeForMobile);
});