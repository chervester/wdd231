// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Toggle between grid and list views
    const toggleButton = document.getElementById('toggle-view');
    const memberContainer = document.getElementById('member-container');
    
    toggleButton.addEventListener('click', () => {
        // Toggle between grid and list view
        memberContainer.classList.toggle('grid');
        memberContainer.classList.toggle('list');
        
        // Toggle button text
        toggleButton.textContent = memberContainer.classList.contains('grid')
            ? 'Switch to List View'
            : 'Switch to Grid View';
    });

    // Display current year and last modified date in the footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    // Fetch member data from the JSON file and display it
    fetch('data/members.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(members => {
            // Loop through members and display each member as a card
            members.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.classList.add('member-card');
                
                // Use a template literal to populate member card content
                memberCard.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name}" class="member-image">
                    <h3>${member.name}</h3>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership_level)}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;
                
                // Add member card to the member container
                memberContainer.appendChild(memberCard);
            });
        })
        .catch(error => console.error('Error fetching member data:', error));
});

// Helper function to map membership levels
function getMembershipLevel(level) {
    const levels = {
        1: 'Gold',
        2: 'Silver',
        3: 'Platinum'
    };
    return levels[level] || 'Unknown';
}
