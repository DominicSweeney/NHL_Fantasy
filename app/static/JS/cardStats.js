const proxyUrl = "/proxy/";
const playerStats = (id) => proxyUrl + `https://api-web.nhle.com/v1/player/${id}/landing`;

async function fetchStats(id){
    const response = await fetch(playerStats(id));
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

}

function randomPlayer(){
    const playerIds = JSON.parse(localStorage.getItem('playerIds')) || [];
    const usedPlayers = JSON.parse(localStorage.getItem('usedPlayers')) || [];

    if (usedPlayers.length >=70) {
        console.log("Not enough players, resetting lists.");
        localStorage.setItem("usedPlayers", null);
        randomPlayer(); // Call the function recursively
    } else {
        let randomPlayer = playerIds[Math.floor(Math.random() * playerIds.length)];
        if (usedPlayers.includes(randomPlayer)) {
            console.log("Player already used, picking another.");
            randomPlayer(); // Return the result of the recursive call
        } else {
            usedPlayers.push(randomPlayer);
            localStorage.setItem("usedPlayers", JSON.stringify(usedPlayers));
            console.log("Selected player ID:", randomPlayer);
            return randomPlayer;
        }
    }
}

document.getElementById("pickCard").addEventListener("click", async () => {
    console.log("clicked");
    const cardStats = await fetchStats(randomPlayer());
    const oppStats = await fetchStats(randomPlayer());
    fetch("/card", {
        headers: {
        "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ cardStats, oppStats })
    });
});






