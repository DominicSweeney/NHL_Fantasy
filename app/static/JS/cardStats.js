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
    document.getElementById(`${id}-firstname`).innerText = stats.firstname;
    document.getElementById(`${id}-lastname`).innerText = stats.lastname;
    document.getElementById(`${id}-team`).innerText = stats.team;
    document.getElementById(`${id}-position`).innerText = stats.position;
    document.getElementById(`${id}-height`).innerText = stats.height;
    document.getElementById(`${id}-weight`).innerText = stats.weight;
    document.getElementById(`${id}-headshot`).src = stats.headshot;
    document.getElementById(`${id}-teamlogo`).src = stats.teamlogo;
    document.getElementById(`${id}-goals`).innerText = stats.career.goals;
    document.getElementById(`${id}-assists`).innerText = stats.career.assists;
    document.getElementById(`${id}-gamesPlayed`).innerText = stats.career.gamesPlayed;
    document.getElementById(`${id}-shootingPctg`).innerText = stats.career.shootingPctg;

}

async function load(){
    
        console.log("clicked");
        const cardStats = await fetchStats(randomPlayer());
        const oppStats = await fetchStats(randomPlayer());
        if (!cardStats || !oppStats) {
            console.error("Failed to fetch player stats. Aborting request.");
            return;
        }
        console.log(cardStats);
        populateCard("cardStats", cardStats);
        populateCard("oppStats", oppStats);
        
};
console.log("file opened");
load();







