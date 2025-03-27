

const proxyUrl = "/proxy/";
const playerStats = (id) => {
    if (!id) {
        console.error("Player ID is undefined or invalid."+id);
        return null;
    }
    return proxyUrl + `https://api-web.nhle.com/v1/player/${id}/landing`;
};

async function fetchStats(id) {
    try {
        const response = await fetch(playerStats(id));
        console.log(playerStats(id));
        console.log(response);
        if (!response.ok) {
            console.error(`Error fetching stats for player ${id}:`, response.statusText);
            return null;
        }
        const data = await response.json();
        const playerStat = {
            id: id,
            firstname: data.firstName.default || '',
            lastname: data.lastName.default || '',
            headshot: data.headshot || '',
            team: data.teamCommonName.default || '',
            teamlogo: data.teamLogo || '', 
            height: data.heightInInches || '',
            weight: data.weightInPounds || '',
            position: data.position || '',
            career: {
                assists: data.featuredStats.regularSeason.career.assists || 0,
                gamesPlayed: data.featuredStats.regularSeason.career.gamesPlayed || 0,
                goals: data.featuredStats.regularSeason.career.goals || 0,
                shootingPctg: data.featuredStats.regularSeason.career.shootingPctg || 0.00,
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
        return randomPlayer(); // Call the function recursively and return the result
    } else {
        let randomPlayerId = playerIds[Math.floor(Math.random() * playerIds.length)];
        if (usedPlayers.includes(randomPlayerId)) {
            console.log("Player already used, picking another.");
            return randomPlayer(); // Return the result of the recursive call
        } else {
            usedPlayers.push(randomPlayerId);
            localStorage.setItem("usedPlayers", JSON.stringify(usedPlayers));
            console.log("Selected player ID:", randomPlayerId);
            return randomPlayerId;
        }
    }
}

function populateCard(id, stats){
    document.getElementById(`${id}-name`).innerText = stats.firstname + " " + stats.lastname;
    document.getElementById(`${id}-position`).innerText = stats.position;
    const feet = Math.floor(stats.height / 12);
    const inches = stats.height % 12;
    document.getElementById(`${id}-height`).innerText = inches === 0 ? `${feet} ft` : `${feet} ft ${inches} in`;
    document.getElementById(`${id}-weight`).innerText = stats.weight;
    document.getElementById(`${id}-headshot`).src = stats.headshot;
    document.getElementById(`${id}-teamlogo`).src = stats.teamlogo;
    document.getElementById(`${id}-goals`).innerText = stats.career.goals;
    document.getElementById(`${id}-assists`).innerText = stats.career.assists;
    document.getElementById(`${id}-gamesPlayed`).innerText = stats.career.gamesPlayed;
    document.getElementById(`${id}-shootingPctg`).innerText = stats.career.shootingPctg.toFixed(2);

}

async function on_page_load(){
    
    console.log("clicked");
    const cardStats = await fetchStats(randomPlayer());
    
    if (!cardStats) {
        console.error("Failed to fetch player stats. Aborting request.");
        return;
    }
    console.log(cardStats);
    populateCard("player", cardStats);
    
        
};
async function on_computer_turn(){
    const oppStats = await fetchStats(randomPlayer());
    flipcard();
    populateCard("opp", oppStats);
}

function flipcard(){
    console.log("flipping card");
    document.getElementById("oppCard").innerHTML = `
    <img class="formatedCard" alt="Formatted Card" src="../../static/images/FormattedCard.png" height="800" width="800">
    <div class="cardContent">
        <div class="row">
            <div class="column">
                <img class="teamLogo" id="opp-teamlogo" alt="Team logo" height="50" width="50" />
            </div>
            <div class="column">
                <h2 class="position" id="opp-position">C</h2>
            </div>
        </div>
        <img class="playerPicture" id="opp-headshot" src="../../static/images/temp-player-headshot.png" alt="Player picture" height="300" width="350" />
        <h2 class="playerName" id="opp-name">Name</h2>
        <div class="stats">
            <div class="row">
                <div class="column">
                    <div class="tooltip">
                        <h3 class="higherOrLower height" id="opp-height" data-stat="Height">0</h3>
                        <span class="tooltiptext">
                            <img class="leftArrow" src="../../static/images/left-arrow-outlined.png" alt="left-arrow" height="70" width="70" />
                        </span>
                    </div>
                </div>
                <div class="column">
                    <div class="tooltip2">
                        <h3 class="higherOrLower goals" id="opp-goals" data-stat="Goals">0</h3>
                        <span class="tooltiptext2">
                            <img class="rightArrow" src="../../static/images/right-arrow-outlined.png" alt="right-arrow" height="70" width="70" />
                        </span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="tooltip">
                        <h3 class="higherOrLower weight" id="opp-weight" data-stat="Weight">0</h3>
                        <span class="tooltiptext">
                            <img class="leftArrow" src="../../static/images/left-arrow-outlined.png" alt="left-arrow" height="70" width="70" />
                        </span>
                    </div>
                </div>
                <div class="column">
                    <div class="tooltip2">
                        <h3 class="higherOrLower gamesPlayed" id="opp-gamesPlayed" data-stat="GamesPlayed">0</h3>
                        <span class="tooltiptext2">
                            <img class="rightArrow" src="../../static/images/right-arrow-outlined.png" alt="right-arrow" height="70" width="70" />
                        </span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="tooltip">
                        <h3 class="higherOrLower assist" id="opp-assists" data-stat="Assist">0</h3>
                        <span class="tooltiptext">
                            <img class="leftArrow" src="../../static/images/left-arrow-outlined.png" alt="left-arrow" height="70" width="70" />
                        </span>
                    </div>
                </div>
                <div class="column">
                    <div class="tooltip2">
                        <h3 class="higherOrLower shooting" id="opp-shootingPctg" data-stat="Shooting">0%</h3>
                        <span class="tooltiptext2">
                            <img class="rightArrow" src="../../static/images/right-arrow-outlined.png" alt="right-arrow" height="70" width="70" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

on_page_load();



document.getElementById('penguin').addEventListener('load', () => {
    setTimeout(() =>{
        console.log("penguin attack done");
        on_computer_turn();
    })
});


