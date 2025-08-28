document.addEventListener('DOMContentLoaded', function() {
    // Duplicate content for seamless scrolling
    duplicateScrollerContent();
    
    // Initialize horizontal scrolling with drag functionality
    initHorizontalScrollers();
    
    // Form submission handling
    const form = document.getElementById('patron-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Start auto-scroll animations after a short delay
    setTimeout(() => {
        startAutoScroll();
    }, 100);
});

// Duplicate scroller content for seamless looping
function duplicateScrollerContent() {
    const benefitsTrack = document.querySelector('.benefits-scroller .scroller-track');
    const quotesTrack = document.querySelector('.quotes-scroller .scroller-track');
    
    if (benefitsTrack) {
        const benefitsContent = benefitsTrack.innerHTML;
        benefitsTrack.innerHTML = benefitsContent + benefitsContent;
    }
    
    if (quotesTrack) {
        const quotesContent = quotesTrack.innerHTML;
        quotesTrack.innerHTML = quotesContent + quotesContent;
    }
}

// Initialize horizontal scrollers with drag functionality
function initHorizontalScrollers() {
    const scrollers = document.querySelectorAll('.scroller-track');
    
    scrollers.forEach(track => {
        let isDown = false;
        let startX;
        let scrollLeft;
        let animation = null;
        
        // Store the original animation
        const originalAnimation = track.style.animation;
        
        // Mouse events for desktop
        track.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
            track.style.cursor = 'grabbing';
            
            // Pause the animation during drag
            track.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.style.cursor = 'grab';
            
            // Resume animation when not dragging
            if (!isDown) {
                track.style.animationPlayState = 'running';
            }
        });
        
        track.addEventListener('mouseup', () => {
            isDown = false;
            track.style.cursor = 'grab';
            
            // Resume animation when not dragging
            track.style.animationPlayState = 'running';
        });
        
        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        track.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
            
            // Pause the animation during drag
            track.style.animationPlayState = 'paused';
        }, { passive: true });
        
        track.addEventListener('touchend', () => {
            isDown = false;
            
            // Resume animation when not dragging
            track.style.animationPlayState = 'running';
        });
        
        track.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        }, { passive: true });
        
        // Pause animation on hover
        track.parentElement.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        track.parentElement.addEventListener('mouseleave', () => {
            if (!isDown) {
                track.style.animationPlayState = 'running';
            }
        });
        
        // Reset position when animation completes to create seamless loop
        track.addEventListener('animationiteration', () => {
            // Reset to start position when the duplicate content finishes
            if (track.scrollLeft >= track.scrollWidth / 2) {
                track.style.animation = 'none';
                requestAnimationFrame(() => {
                    track.scrollLeft = 0;
                    requestAnimationFrame(() => {
                        track.style.animation = originalAnimation;
                    });
                });
            }
        });
    });
}

// Start auto-scroll animations
function startAutoScroll() {
    const benefitsTrack = document.querySelector('.benefits-scroller .scroller-track');
    const quotesTrack = document.querySelector('.quotes-scroller .scroller-track');
    
    if (benefitsTrack) {
        benefitsTrack.style.animation = 'scroll-benefits 40s linear infinite';
    }
    
    if (quotesTrack) {
        quotesTrack.style.animation = 'scroll-quotes 45s linear infinite';
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Basic form validation
    const requiredFields = e.target.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
            
            // Remove error style when user starts typing
            field.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#e1e5eb';
                }
            });
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // PAN number validation (basic)
    const panField = document.getElementById('pan');
    const panValue = panField.value.trim();
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    
    if (!panPattern.test(panValue)) {
        panField.style.borderColor = 'red';
        alert('Please enter a valid PAN number (e.g., ABCDE1234F)');
        return;
    }
    
    // Pincode validation (basic - 6 digits)
    const pincodeField = document.getElementById('pincode');
    const pincodeValue = pincodeField.value.trim();
    const pincodePattern = /^\d{6}$/;
    
    if (!pincodePattern.test(pincodeValue)) {
        pincodeField.style.borderColor = 'red';
        alert('Please enter a valid 6-digit pincode');
        return;
    }
    
    // If all validations pass, show success message
    alert('Thank you for your patronage! Your form has been submitted successfully.');
    e.target.reset();
}

// Add some interactive effects to form elements
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-5px)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    element.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});