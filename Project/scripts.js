import players from './players.js';  // Import players from the correct path
import matches from './matches.js';  // Import matches from the correct path

window.onload = function() {
    // Display Players
    const playerList = document.getElementById('players-list');
    players.forEach(player => {
        const playerItem = document.createElement('div');
        playerItem.classList.add('player-item');
        playerItem.innerHTML = `
            <h3>${player.name}</h3>
            <p>Position: ${player.position}</p>
            <p>Goals: ${player.goals}</p>
            <img src="${player.image}" alt="${player.name}">
        `;
        playerList.appendChild(playerItem);
    });

    // Display Matches
    const matchList = document.getElementById('matches-list');
    matches.forEach(match => {
        const matchItem = document.createElement('div');
        matchItem.classList.add('match-item');
        matchItem.innerHTML = `
            <h3>Opponent: ${match.opponent}</h3>
            <p>Date: ${match.date}</p>
            <p>Venue: ${match.venue}</p>
        `;
        matchList.appendChild(matchItem);
    });
};
