// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any existing code

    // Social rows visibility on scroll
    const socialRows = document.querySelectorAll('.social-row');
    
    function checkVisibility() {
        socialRows.forEach(row => {
            const rowTop = row.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (rowTop < windowHeight * 0.8) {
                row.classList.add('visible');
            }
        });
    }
    
    // Check visibility on page load and scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);

    // Heart Easter Egg
    const heart = document.querySelector('.footer .heart');
    const body = document.body;
    let lanternsContainer;
    
    // Debug: Check if heart element is found
    if (!heart) {
        console.error('Heart element not found!');
    } else {
        console.log('Heart element found!', heart);
    }

    // Create lanterns container if it doesn't exist
    function createLanternsContainer() {
        if (!document.querySelector('.lanterns-container')) {
            lanternsContainer = document.createElement('div');
            lanternsContainer.className = 'lanterns-container';
            document.body.appendChild(lanternsContainer);
            console.log('Lanterns container created');
        } else {
            lanternsContainer = document.querySelector('.lanterns-container');
        }
    }
    
    // Generate random number between min and max
    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    // Create a single lantern
    function createLantern() {
        const lantern = document.createElement('div');
        lantern.className = 'lantern';
        
        // Set random position and animation delay
        const leftPos = getRandomNumber(5, 95);
        const delay = getRandomNumber(0, 5);
        const xOffset = getRandomNumber(-1, 1);
        
        lantern.style.left = `${leftPos}%`;
        lantern.style.animationDelay = `${delay}s`;
        lantern.style.setProperty('--rand-x', xOffset);
        
        // Make sure lanterns start at the bottom
        lantern.style.bottom = "-70px";
        
        // Add variety to glow colors without changing image hue
        const glowColors = [
            'rgba(255, 0, 67, 0.6)',    // Red
            'rgba(0, 179, 255, 0.6)',   // Blue
            'rgba(0, 255, 0, 0.6)',     // Green
            'rgba(255, 149, 0, 0.6)',   // Orange
            'rgba(255, 0, 255, 0.6)'    // Pink
        ];
        
        // Select a random glow color
        const glowColor = glowColors[Math.floor(Math.random() * glowColors.length)];
        
        // Apply glow without changing image color
        lantern.style.filter = 'brightness(1.2)'; // Just brightness, no hue-rotate
        lantern.style.boxShadow = `0 0 20px 15px ${glowColor}`;
        
        // Remove lantern after animation completes
        setTimeout(() => {
            if (lantern.parentNode === lanternsContainer) {
                lanternsContainer.removeChild(lantern);
            }
        }, (15 + delay) * 1000);
        
        return lantern;
    }
    
    // Create multiple lanterns and add to container
    function createLanterns() {
        // Only create lanterns if in blackout mode
        if (!body.classList.contains('blackout')) {
            return;
        }
        
        // Create 3 lanterns at a time
        for (let i = 0; i < 3; i++) {
            const lantern = createLantern();
            lanternsContainer.appendChild(lantern);
        }
        
        // Schedule next batch of lanterns
        setTimeout(createLanterns, 2000);
    }
    
    // Toggle blackout mode
    function toggleBlackout() {
        console.log('Toggle blackout called');
        body.classList.toggle('blackout');
        
        if (body.classList.contains('blackout')) {
            console.log('Blackout mode activated');
            createLanternsContainer();
            createLanterns();
        } else {
            console.log('Blackout mode deactivated');
        }
    }
    
    // Add click event to heart
    if (heart) {
        heart.addEventListener('click', toggleBlackout);
        // Add touch event for mobile
        heart.addEventListener('touchend', function(e) {
            e.preventDefault(); // Prevent default touch behavior
            toggleBlackout();
        });
        console.log('Click event added to heart');
    }

    // Mobile responsiveness helper
    function checkMobile() {
        // Check if we're on a mobile device
        if (window.innerWidth <= 480) {
            // Pre-show social content on mobile
            document.querySelectorAll('.social-row').forEach(row => {
                row.classList.add('visible');
            });
            
            // Make banners touch-friendly
            document.querySelectorAll('.banner').forEach(banner => {
                banner.addEventListener('touchstart', function() {
                    // Add active class to show content
                    this.classList.add('active');
                });
            });
        }
    }

    // Run mobile check on load and resize
    window.addEventListener('load', checkMobile);
    window.addEventListener('resize', checkMobile);
}); 