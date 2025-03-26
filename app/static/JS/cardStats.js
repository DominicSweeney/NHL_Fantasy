const proxyUrl = "/proxy/";
const playerStats = (id) => proxyUrl + `https://api-web.nhle.com/v1/player/${id}/landing`;

async function fetchStats(id) {
    try {
        const response = await fetch(playerStats(id));
        if (!response.ok) {
            console.error(`Error fetching stats for player ${id}:`, response.statusText);
            return null;
        }
        const data = await response.json();
        const playerStat = {
            id: id,
            firstname: data.firstname || '',
            lastname: data.lastname || '',
            headshot: data.headshot || '',
            team: data.teamCommonName || '',
            teamlogo: data.teamLogo || '',
            height: data.heightInInches || '',
            weight: data.weightInPounds || '',
            position: data.position || '',
            career: {
                assists: data.featuredStats?.career?.assists || 0,
                gamesPlayed: data.featuredStats?.career?.gamesPlayed || 0,
                goals: data.featuredStats?.career?.goals || 0,
                shootingPctg: data.featuredStats?.career?.shootingPctg || 0
            },
        };
        return playerStat;
    } catch (error) {
        console.error(`Failed to fetch stats for player ${id}:`, error);
        return null;
    }
}

function randomPlayer(){
    const playerIds = JSON.parse(localStorage.getItem('playerIds')) || [];
    const usedPlayers = JSON.parse(localStorage.getItem('usedPlayers')) || [];

    if (usedPlayers.length >=70) {
        console.log("Not enough players, resetting lists.");
        localStorage.setItem("usedPlayers", null);
        randomPlayer(); // Call the function recursively
    } else {
        let randomPlayerId = playerIds[Math.floor(Math.random() * playerIds.length)];
        if (usedPlayers.includes(randomPlayerId)) {
            console.log("Player already used, picking another.");
            randomPlayer(); // Return the result of the recursive call
        } else {
            usedPlayers.push(randomPlayerId);
            localStorage.setItem("usedPlayers", JSON.stringify(usedPlayers));
            console.log("Selected player ID:", randomPlayerId);
            return randomPlayerId;
        }
    }
}

function populateCard(id, stats){
    const card = document.getElementById(id);
    card.querySelector(".player-name").textContent = `${stats.firstname} ${stats.lastname}`;
    card.querySelector(".player-team").textContent = stats.team;
    card.querySelector(".player-position").textContent = stats.position;
    card.querySelector(".player-height").textContent = stats.height;
    card.querySelector(".player-weight").textContent = stats.weight;
    card.querySelector(".player-goals").textContent = stats.career.goals;
    card.querySelector(".player-assists").textContent = stats.career.assists;
    card.querySelector(".player-games").textContent = stats.career.gamesPlayed;
    card.querySelector(".player-shooting").textContent = stats.career.shootingPctg;
    card.querySelector(".player-headshot").src = stats.headshot;
    card.querySelector(".team-logo").src = stats.teamlogo;

}

document.addEventListener("DOMContentLoaded", async() => {
    
        console.log("clicked");
        const cardStats = await fetchStats(randomPlayer());
        const oppStats = await fetchStats(randomPlayer());
        if (!cardStats || !oppStats) {
            console.error("Failed to fetch player stats. Aborting request.");
            return;
        }

        populateCard("cardStats", cardStats);
        populateCard("oppStats", oppStats);
        
});






