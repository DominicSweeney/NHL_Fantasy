const proxyUrl = "/proxy/";
const topPlayersApi = proxyUrl + "https://api-web.nhle.com/v1/skater-stats-leaders/20242025/2?categories=goals&limit=75";
const playerStats = (id) => proxyUrl + `https://api-web.nhle.com/v1/player/${id}/landing`;

async function fetchPlayer(){
    const response = await fetch(topPlayersApi);
    const data = await response.json();
    const lastUpdated = localStorage.getItem('lastUpdated');
    const now = new Date();

    if (!lastUpdated || (now - new Date(lastUpdated)) > 24 * 60 * 60 * 1000) {
        console.log(data);
        const playerIds = data.goals.map(player => player.id);
        console.log(playerIds);
        localStorage.setItem('playerIds', JSON.stringify(playerIds));
        localStorage.setItem('lastUpdated', now);
    } else {
        console.log('Data is up to date.');   
    }
}

fetchPlayer();





// async function fetchPlayerStats(){
//     const response = await fetch(topPlayersApi);
//     const data = await response.json();
//     const lastUpdated = localStorage.getItem('lastUpdated');
//     const now = new Date();

//     if (!lastUpdated || (now - new Date(lastUpdated)) > 24 * 60 * 60 * 1000) {
//         updateLocalStorage(data); // Pass the data to updateLocalStorage
//         localStorage.setItem('lastUpdated', now);
//     } else {
//         console.log('Data is up to date.');
//     }
// }

// function updateLocalStorage(data){
//     // Removed fetch call and use the passed data
//     data.data.forEach(player => {
//         localStorage.setItem(`player_${player.id}`, JSON.stringify(getPlayerStats(player.id)));
//     });
// }

// function getPlayerStats(id){
//     player = fetch(playerStats(id))
//         .then(response => response.json())
//         .then(data => {
//             return {
//                 id: data.id,
//                 firstname: data.firstname,
//                 lastname: data.lastname,
//                 headshot: data.headshot,
//                 career: {
//                     assists: data.career.assists,
//                     gamesPlayed: data.career.gamesPlayed,
//                     goals: data.career.goals,
//                     powerPlayGoals: data.career.powerPlayGoals,
//                     shootingPctg: data.career.shootingPctg
//                 }
//             };
//         })
//         .catch(error => console.error('Error fetching player stats:', error));
// }

// function displayPlayerStats(){
//     const players = [];

//     for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i);
//         if (key.startsWith('player_')) {
//             players.push(JSON.parse(localStorage.getItem(key)));
//         }
//     }

//     const container = document.getElementById('player-stats-container');
//     container.innerHTML = '';

//     players.forEach(player => {
//         const playerDiv = document.createElement('div');
//         playerDiv.classList.add('player-card');

//         playerDiv.innerHTML = `
//             <img src="${player.headshot}" alt="${player.firstname} ${player.lastname}">
//             <h2>${player.firstname} ${player.lastname}</h2>
//             <p>Games Played: ${player.career.gamesPlayed}</p>
//             <p>Goals: ${player.career.goals}</p>
//             <p>Assists: ${player.career.assists}</p>
//             <p>Power Play Goals: ${player.career.powerPlayGoals}</p>
//             <p>Shooting Percentage: ${player.career.shootingPctg}%</p>
//         `;

//         container.appendChild(playerDiv);
//     });
// }

// fetchPlayerStats();
// displayPlayerStats();

