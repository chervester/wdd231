document.addEventListener("DOMContentLoaded", () => {
    initMembers();
    initWeather();
    loadSpotlights();
    updateLastModified();
});

// Initialize Members
async function initMembers() {
    const memberContainer = document.getElementById("memberContainer");
    const toggleViewButton = document.getElementById("toggleView");

    if (!memberContainer) return; // Prevent errors if the element is missing

    try {
        const response = await fetch("members.json");
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error fetching members:", error);
        memberContainer.innerHTML = "<p>Unable to load members.</p>";
    }

    function displayMembers(members) {
        memberContainer.innerHTML = ""; // Clear before adding new content
        members.forEach((member) => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name}" class="member-image">
                <h3>${member.name}</h3>
                <p>${member.address || "Address not available"}</p>
                <p>${member.phone || "Phone not available"}</p>
                <a href="${member.website || "#"}" target="_blank">${member.website ? "Visit Website" : "No Website Available"}</a>
                <p>Membership Level: ${member.membership_level}</p>
            `;

            memberContainer.appendChild(memberCard);
        });
    }

    // Toggle between grid and list views (only if the button exists)
    if (toggleViewButton) {
        toggleViewButton.addEventListener("click", () => {
            memberContainer.classList.toggle("grid-view");
            memberContainer.classList.toggle("list-view");
        });
    }
}

// Fetch and Display Weather
async function initWeather() {
    const apiKey = "5e4fbfba239dcafbaed7b4041fecc0ab";
    const city = "Lilongwe";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.current) {
            throw new Error("Invalid weather data format");
        }

        const currentTemp = data.current.temp_c;
        const weatherDesc = data.current.condition.text;
        const weatherIcon = data.current.condition.icon;

        document.getElementById("current-weather").textContent = `Temperature: ${currentTemp}°C - ${weatherDesc}`;
        document.getElementById("weather-icon").src = `https:${weatherIcon}`;
        document.getElementById("weather-icon").alt = weatherDesc;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("current-weather").textContent = "Weather data unavailable.";
    }
}

// Load Spotlight Members
async function loadSpotlights() {
    try {
        const response = await fetch("members.json");
        const members = await response.json();

        const goldSilverMembers = members.filter(
            (member) => member.membership_level === "gold" || member.membership_level === "silver"
        );

        if (goldSilverMembers.length === 0) {
            document.getElementById("spotlight-container").innerHTML = "<p>No spotlight members available.</p>";
            return;
        }

        const selectedMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
        const spotlightContainer = document.getElementById("spotlight-container");

        spotlightContainer.innerHTML = selectedMembers
            .map(
                (member) => `
                <div class="spotlight-card">
                    <img src="${member.logo || "images/default-logo.png"}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.phone || "Phone not available"}</p>
                    <p>${member.address || "Address not available"}</p>
                    <a href="${member.website || "#"}" target="_blank">${member.website ? "Visit Website" : "No Website Available"}</a>
                </div>
            `
            )
            .join("");

        document.getElementById("spotlight-loading").style.display = "none";
    } catch (error) {
        console.error("Error loading spotlights:", error);
        document.getElementById("spotlight-container").innerHTML = "<p>Spotlight members unavailable.</p>";
    }
}

// Update Last Modified Date
function updateLastModified() {
    document.getElementById("lastModified").textContent = document.lastModified;
}
document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.close');

    modalTriggers.forEach(trigger => {
        const targetModal = document.getElementById(trigger.getAttribute('data-target'));
        trigger.addEventListener('click', () => {
            targetModal.style.display = 'block';
        });
    });

    closeButtons.forEach(closeButton => {
        closeButton.addEventListener('click', () => {
            modals.forEach(modal => modal.style.display = 'none');
        });
    });

    // Close modal when clicking outside modal content
    window.addEventListener('click', event => {
        if (event.target.classList.contains('modal')) {
            modals.forEach(modal => modal.style.display = 'none');
        }
    });
});
// Sample directory member data
const members = [
    {
      "name": "Access Communication Ltd",
      "address": "Masauko Chipembere Hwy, Blantyre, Malawi",
      "phone": "+265 (0) 212 200 200",
      "website": "https://www.access.mw/",
      "membership_level": "Gold",
      "image": "images/access_communication_limited.jpg"
    },
    {
      "name": "Siku Transport Limited",
      "address": "456 Elm St, Townsville, Malawi",
      "phone": "+265 999 821 074",
      "website": "https://www.sikumw.com/",
      "membership_level": "Silver",
      "image": "images/siku_transport_limited.jpg"
    },
    {
      "name": "Blantyre Water Board",
      "address": "Blantyre Water Board, Blantyre 3, Malawi",
      "phone": "+265 (0) 1 895 000",
      "website": "https://www.bwb.mw/index.php",
      "membership_level": "Platinum",
      "image": "images/blantyre_water_board.jpg"
    },
    {
      "name": "The Times Group",
      "address": "Private Bag 39, Blantyre, Malawi",
      "phone": "+265 883 397 233",
      "website": "https://times.mw/",
      "membership_level": "Gold",
      "image": "images/the_times_group.jpg"
    },
    {
      "name": "ESCOM Limited",
      "address": "9 Haile Selassie Road, Blantyre, Malawi",
      "phone": "+265 111 822 000",
      "website": "https://www.escom.mw/",
      "membership_level": "Silver",
      "image": "images/escom_limited.jpg"
    },
    {
      "name": "Telekom Networks Malawi",
      "address": "Glyn Jones Road, P.O. Box 3039, Blantyre, Malawi",
      "phone": "+265 888 800 800",
      "website": "http://www.tnm.co.mw/",
      "membership_level": "Platinum",
      "image": "images/telekom_networks_malawi.jpg"
    },
    {
      "name": "Airtel Malawi",
      "address": "Airtel Complex, City Centre, Off Convention Drive, Lilongwe, Malawi",
      "phone": "+265 999 901 030",
      "website": "https://www.airtel.mw/",
      "membership_level": "Silver",
      "image": "images/airtel_malawi.jpg"
    }
  ];
  
  // Function to populate directory with member data
  function populateDirectory() {
    const container = document.getElementById('memberContainer');
    container.innerHTML = ''; // Clear existing content
  
    members.forEach(member => {
      const memberCard = document.createElement('div');
      memberCard.classList.add('member-card');
      
      memberCard.innerHTML = `
        <img src="${member.image}" alt="${member.name}" class="member-image">
        <h2>${member.name}</h2>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Membership Level:</strong> ${member.membership_level}</p>
      `;
  
      container.appendChild(memberCard);
    });
  }
  
  // Toggle View Function
  document.getElementById('toggleView').addEventListener('click', () => {
    const container = document.getElementById('memberContainer');
    container.classList.toggle('grid-view');
    container.classList.toggle('list-view');
  });
  
  // Populate the directory when the page loads
  window.onload = () => {
    populateDirectory();
  
    // Display the last modified date
    const lastModified = document.getElementById('lastModified');
    lastModified.textContent = document.lastModified;
  };
  