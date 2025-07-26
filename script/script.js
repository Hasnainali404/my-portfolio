/**
 * Cross-browser compatible scroll-driven animations using Intersection Observer API
 * This replaces the unsupported CSS animation-timeline and animation-range properties
 * 
 * Browser Support:
 * - Chrome 51+
 * - Firefox 55+
 * - Safari 12.1+
 * - Edge 15+
 * - iOS Safari 12.2+
 * - Android Browser 76+
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers - immediately show the content
        console.warn('Intersection Observer not supported. Applying animations immediately.');
        const aboutText = document.querySelector('.about-detail > p');
        if (aboutText) {
            aboutText.classList.add('animate-in');
        }
        return;
    }

    // Configuration for the intersection observer
    const observerOptions = {
        // Trigger when 40% of the element is visible (similar to the original animation-range)
        threshold: 0.4,
        // Add some margin to trigger slightly before the element is fully in view
        rootMargin: '0px 0px -10% 0px'
    };

    // Create the intersection observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            // Check if the element is intersecting (visible)
            if (entry.isIntersecting) {
                // Add the animation class to trigger the CSS transition
                entry.target.classList.add('animate-in');
                
                // Optional: Stop observing this element once animated
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove the class if element goes out of view
                // This allows the animation to replay when scrolling back up
                entry.target.classList.remove('animate-in');
            }
        });
    }, observerOptions);

    // Find and observe the about text element
    const aboutText = document.querySelector('.about-detail > p');
    if (aboutText) {
        observer.observe(aboutText);
    } else {
        console.warn('About text element not found for scroll animation');
    }

    // Optional: Observe other elements that might need scroll animations in the future
    // You can add more elements here as needed
    const elementsToAnimate = document.querySelectorAll('[data-scroll-animate]');
    elementsToAnimate.forEach(function(element) {
        observer.observe(element);
    });
});

/**
 * Fallback function for browsers that don't support Intersection Observer
 * This can be called manually if needed
 */
function fallbackAnimation() {
    const aboutText = document.querySelector('.about-detail > p');
    if (aboutText) {
        aboutText.classList.add('animate-in');
    }
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fallbackAnimation };
}