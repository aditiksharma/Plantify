document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get all form values
    const name = document.getElementById('name').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const space = document.getElementById('space').value;
    const light = document.getElementById('light').value;
    const level = document.getElementById('level').value;
    const timeCommitment = document.getElementById('timeCommitment').value;
    const movingSoon = document.getElementById('movingSoon').value === 'true';
    const petSafe = document.getElementById('petSafe').value === 'true';
    const interestedInNative = document.getElementById('interestedInNative').value === 'true';

    // Validate ZIP code (Bay Area only - 94xxx)
    if (!/^94\d{3}$/.test(zip)) {
        alert('Sorry, Plantify is only available in the Bay Area (ZIPs starting with 94xxx) for now. Please enter a valid Bay Area ZIP code.');
        return;
    }

    // Validate all required fields
    if (!name || !space || !light || !level || !timeCommitment) {
        alert('Please fill in all required fields.');
        return;
    }

    // Create profile object
    const profile = {
        name,
        zip,
        space,
        light,
        level,
        timeCommitment,
        movingSoon,
        petSafe,
        interestedInNative,
        createdAt: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('plantifyProfile', JSON.stringify(profile));

    // Show success message
    showSuccessMessage();

    // Redirect to dashboard after a short delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
});

function showSuccessMessage() {
    const form = document.getElementById('profileForm');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <h2>🎉 Profile Created Successfully!</h2>
            <p>Welcome to Plantify! We're preparing your personalized plant recommendations...</p>
            <div class="loading-spinner"></div>
        </div>
    `;
    
    form.style.display = 'none';
    document.querySelector('.container').appendChild(successDiv);
}

// Real-time ZIP code validation
document.getElementById('zip').addEventListener('input', function(e) {
    const zip = e.target.value;
    const zipInput = e.target;
    
    if (zip.length === 5) {
        if (/^94\d{3}$/.test(zip)) {
            zipInput.classList.remove('error');
            zipInput.classList.add('valid');
        } else {
            zipInput.classList.remove('valid');
            zipInput.classList.add('error');
        }
    } else {
        zipInput.classList.remove('error', 'valid');
    }
});

// Add some helpful tooltips and guidance
document.addEventListener('DOMContentLoaded', function() {
    // Add helpful hints
    const hints = {
        'space': 'Choose the type of space you have available for plants',
        'light': 'Consider which direction your windows face and how much direct sunlight you get',
        'level': 'Be honest about your experience - we want to set you up for success!',
        'timeCommitment': 'Think about how much time you can realistically spend on plant care each week',
        'movingSoon': 'If you\'re planning to move, we\'ll recommend plants that travel well',
        'petSafe': 'Some plants can be toxic to pets if ingested',
        'interestedInNative': 'Native plants are adapted to our local climate and support wildlife'
    };

    // Add tooltips to form fields
    Object.keys(hints).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.title = hints[fieldId];
        }
    });
});

