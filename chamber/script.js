document.addEventListener("DOMContentLoaded", () => {
    const memberContainer = document.getElementById("memberContainer");
    const toggleViewButton = document.getElementById("toggleView");
  
    // Fetch and display members
    async function fetchMembers() {
      try {
        const response = await fetch("members.json");
        const members = await response.json();
        displayMembers(members);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }
  
    function displayMembers(members) {
      memberContainer.innerHTML = ""; // Clear container before adding content
      members.forEach((member) => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-card");
  
        memberCard.innerHTML = `
          <img src="${member.image}" alt="${member.name}" class="member-image">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">${member.website}</a>
          <p>Membership Level: ${member.membership_level}</p>
        `;
  
        memberContainer.appendChild(memberCard);
      });
    }
  
    // Toggle between grid and list views
    toggleViewButton.addEventListener("click", () => {
      memberContainer.classList.toggle("grid-view");
      memberContainer.classList.toggle("list-view");
    });
  
    // Initialize members
    fetchMembers();
  });
  // Set Last Modified Date in Footer
function setLastModified() {
    const lastModified = document.getElementById("lastModified");
    lastModified.textContent = document.lastModified;
  }
  
  // Call setLastModified when the DOM is loaded
  document.addEventListener("DOMContentLoaded", setLastModified);
  
  