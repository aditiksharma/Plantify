document.addEventListener("DOMContentLoaded", function() {
    const profileData = JSON.parse(localStorage.getItem("plantifyProfile"));
    const container = document.getElementById("profileInfo");

    if (!profileData) {
        container.innerHTML = `
            <div class="no-profile">
                <i class="fas fa-user-slash fa-3x"></i>
                <h2>No Profile Found</h2>
                <p>Please create your profile to get started with Plantify!</p>
                <button class="btn-primary" onclick="location.href='profile.html'">
                    <i class="fas fa-plus"></i> Create Profile
                </button>
            </div>
        `;
        return;
    }

    // Format the creation date
    const createdDate = new Date(profileData.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    container.innerHTML = `
        <div class="profile-grid">
            <div class="profile-section">
                <h2><i class="fas fa-user"></i> Basic Information</h2>
                <div class="profile-detail">
                    <span class="label">Name:</span>
                    <span class="value">${profileData.name}</span>
                </div>
                <div class="profile-detail">
                    <span class="label">Location:</span>
                    <span class="value">${profileData.location}</span>
                </div>
                <div class="profile-detail">
                    <span class="label">ZIP Code:</span>
                    <span class="value">${profileData.zip}</span>
                </div>
                <div class="profile-detail">
                    <span class="label">Member Since:</span>
                    <span class="value">${createdDate}</span>
                </div>
            </div>

            <div class="profile-section">
                <h2><i class="fas fa-home"></i> Your Space</h2>
                <div class="profile-detail">
                    <span class="label">Living Situation:</span>
                    <span class="value">${profileData.space}</span>
                </div>
                <div class="profile-detail">
                    <span class="label">Available Light:</span>
                    <span class="value">${profileData.light}</span>
                </div>
            </div>

            <div class="profile-section">
                <h2><i class="fas fa-seedling"></i> Experience & Lifestyle</h2>
                <div class="profile-detail">
                    <span class="label">Gardening Experience:</span>
                    <span class="value">${profileData.level}</span>
                </div>
                <div class="profile-detail">
                    <span class="label">Time Commitment:</span>
                    <span class="value">${profileData.timeCommitment}</span>
                </div>
            </div>

            <div class="profile-section">
                <h2><i class="fas fa-heart"></i> Preferences</h2>
                <div class="profile-detail">
                    <span class="label">Moving Plans:</span>
                    <span class="value">${profileData.movingSoon ? 'Moving soon (within 1 year)' : 'Staying put (1+ years)'}</span>
                </div>
                <div class="profile-detail">
                    <span class="label">Pet Safety:</span>
                    <span class="value">${profileData.petSafe ? 'Pet-safe plants only' : 'Any plants'}</span>
                </div>
                <div class="profile-detail">
                    <span class="label">Native Plants:</span>
                    <span class="value">${profileData.interestedInNative ? 'Include native Bay Area plants' : 'Standard houseplants only'}</span>
                </div>
            </div>
        </div>

        <div class="profile-summary">
            <h3><i class="fas fa-lightbulb"></i> Your Plant Recommendations</h3>
            <p>Based on your profile, we'll recommend plants that are:</p>
            <ul class="recommendation-list">
                <li><i class="fas fa-check"></i> Perfect for ${profileData.space.toLowerCase()}</li>
                <li><i class="fas fa-check"></i> Suitable for ${profileData.light.toLowerCase()} conditions</li>
                <li><i class="fas fa-check"></i> ${profileData.level} level maintenance</li>
                <li><i class="fas fa-check"></i> Fit your ${profileData.timeCommitment.toLowerCase()} time commitment</li>
                ${profileData.movingSoon ? '<li><i class="fas fa-check"></i> Travel-friendly for your upcoming move</li>' : ''}
                ${profileData.petSafe ? '<li><i class="fas fa-check"></i> Safe for your pets</li>' : ''}
                ${profileData.interestedInNative ? '<li><i class="fas fa-check"></i> Include native Bay Area plants</li>' : ''}
            </ul>
        </div>
    `;
});
