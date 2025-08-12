// Global JS logic can go here

// Home page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check for user profile and update welcome message
    updateWelcomeMessage();
    
    // User card click handler
    const userCard = document.getElementById('userCard');
    if (userCard) {
        userCard.addEventListener('click', function() {
            // Navigate to profile page
            window.location.href = 'profile.html';
        });
    }

    // Add hover effect to navigation links
    const navLinks = document.querySelectorAll('.navbar-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scroll for any anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Function to update welcome message based on user profile
function updateWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const userCard = document.getElementById('userCard');
    
    // Check if user profile exists in localStorage
    const userProfile = localStorage.getItem('userProfile');
    
    if (userProfile) {
        try {
            const profile = JSON.parse(userProfile);
            if (profile.name) {
                welcomeMessage.textContent = `Welcome, ${profile.name}!`;
                
                // Show user card if it exists
                if (userCard) {
                    userCard.style.display = 'block';
                    const userCardTitle = document.getElementById('userCardTitle');
                    const userZipCode = document.getElementById('userZipCode');
                    const userSpace = document.getElementById('userSpace');
                    const userExperience = document.getElementById('userExperience');
                    
                    if (userCardTitle) {
                        userCardTitle.textContent = `Welcome back, ${profile.name}!`;
                    }
                    if (userZipCode && profile.zipCode) {
                        userZipCode.textContent = profile.zipCode;
                    }
                    if (userSpace && profile.outdoorSpace) {
                        userSpace.textContent = profile.outdoorSpace;
                    }
                    if (userExperience && profile.experienceLevel) {
                        userExperience.textContent = profile.experienceLevel;
                    }
                }
            } else {
                welcomeMessage.textContent = 'Welcome!';
                if (userCard) {
                    userCard.style.display = 'none';
                }
            }
        } catch (error) {
            console.error('Error parsing user profile:', error);
            welcomeMessage.textContent = 'Welcome!';
            if (userCard) {
                userCard.style.display = 'none';
            }
        }
    } else {
        welcomeMessage.textContent = 'Welcome!';
        if (userCard) {
            userCard.style.display = 'none';
        }
    }
}
